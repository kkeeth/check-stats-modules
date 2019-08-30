const npm    = require('npm-stats-api')
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
   // set from date
   const from = utils.get_from_date()
   const today = moment().format('YYYY-MM-DD')
   const stats = []

   if (`${new Date(from)}` === 'Invalid Date') {
      utils.show_help(from)
      return
   }

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

         if (args._.length === stats.length) {
            // Formatted and displayed in table format
            const ret = json2table(stats)
            ret.show()
         }
      })
   }
}

