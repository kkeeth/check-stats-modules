const npm    = require('npm-stats-api')
const moment = require('moment')
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
   // set start date
   const start = utils.get_start_date()
   const end   = utils.get_end_date()
   const stats = []

   if (`${new Date(start)}` === 'Invalid Date') {
      utils.show_help(start)
      return
   }
   if (`${new Date(end)}` === 'Invalid Date') {
      utils.show_help(end)
      return
   }

   for (let mod of args._) {
      npm.stat(mod, start, end, (err, res) => {
         if (err) {
            res.downloads = res.error
            res.start = start
            res.end = end
            res.package = mod
            delete res.error
         }
         stats.push(res)

         if (args._.length === stats.length) {
            // sort by downloads number
            stats.sort(utils.compare)
            // Formatted and displayed in table format
            const ret = json2table(stats)
            ret.show()
         }
      })
   }
}
