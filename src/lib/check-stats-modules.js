const npm    = require('npm-stat-api')
const moment = require('moment')
const yargs  = require('yargs')
const chalk  = require('chalk')
const pkg    = require('../package.json')
const args   = require('./args')

/**
 * run function
 *
 * @param  void
 * @return void
 */
module.exports = () => {
   // 'help' is top priority option
   if (args.h) {
      show_help()
   } else if (args.v) {
      console.log(pkg.version)
   } else if (args._.length === 0) {
      show_help(chalk.yellow.bold('Please enter the module names at least one. \n'))
   } else {
      const rank = show_stats()
   }
}

/**
 * show help
 *
 * @param  {String} help message if specifying a message
 * @return {String} full help message
 */
const show_help = (text) => {
   if (text) console.log(text);
   yargs.showHelp();
}

/**
 * show stats about modules
 *
 * @param  void
 * @return void
 */
const show_stats = () => {
   let from = ''

   // check the correctness of from's date
   if (args.f) {
      const from_check = moment(args.f, 'YYYY-MM-DD', true).isValid()
                            ? args.f
                            : false
      if (from_check === false) {
         show_help(chalk.yellow.bold('Please enter the date correctly. \n'))
         return
      }
   }

   // set from date
   if (args.m) {
      from = moment().subtract(1, 'months').format('YYYY-MM-DD')
   }
   else if (args.y) {
      from = moment().subtract(1, 'years').format('YYYY-MM-DD')
   }
   else if (args.t) {
      from = `${moment().year()}-01-01`
   }
   else {
      from = args.f || moment().add(-1, 'days').format('YYYY-MM-DD')
   }
   const today = moment().format('YYYY-MM-DD')
   
   for (let mod of args._) {
      npm.stat(mod, from, today, (err, res) => {
         console.log(JSON.stringify(res) + "\n")
      })
   }
}

