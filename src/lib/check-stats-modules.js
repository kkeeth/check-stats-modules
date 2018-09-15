const npm    = require('npm-stat-api')
const moment = require('moment')
const yargs  = require('yargs')
const chalk  = require('chalk')
const args   = require('./args')
const json2table = require('./json2table.js')
const utils = require('./utils')

/**
 * show stats about modules
 * (this is the main function)
 *
 * @param  void
 * @return void
 */
module.exports = () => {
   // check specification of modules name
   if (args._.length === 0) {
      utils.show_help(chalk.yellow.bold('Please enter the module names at least one. \n'))
      return
   }

   // set from date
   const from = utils.get_from_date()
   const today = moment().format('YYYY-MM-DD')
   const stats = []
   
   for (let mod of args._) {
      npm.stat(mod, from, today, (err, res) => {
         if (err) {
            res.downloads = res.error
            res.start = from
            res.end = today
            res.package = mod
            delete res.error
         }
         stats.push(res)

         // Formatted and displayed in table format
         const ret = json2table(stats)
         ret.show()
      })
   }
}

