/**
 * show help
 *
 * @param  {String} help message if specifying a message
 * @return {String} full help message
 */
exports.show_help = (text) => {
   if (text)
      console.log(require('chalk').yellow.bold(text))
   require('yargs').showHelp()
}

/**
 * get start date by option
 *
 * @param  {String} option
 * @return {String} start_date
 */
exports.get_start_date = () => {
   const args   = require('./args')
   const moment = require('moment')

   // check module names
   if (args._.length === 0) {
      return 'Please enter the module names at least one. \n'
   }
   // check start date options
   if (args.s && !moment(args.s, 'YYYY-MM-DD', true).isValid()) {
      return 'Please enter the date correctly. \n'
   }
   if (args.m) {
      return moment().subtract(1, 'months').format('YYYY-MM-DD')
   }
   if (args.y) {
      return moment().subtract(1, 'years').format('YYYY-MM-DD')
   }
   if (args.t) {
      return moment().year() + '-01-01'
   }
   if (args.w) {
      return moment().subtract(1, 'weeks').format('YYYY-MM-DD')
   }
   return (args.s || moment().add(-1, 'days').format('YYYY-MM-DD'))
}

/**
 * get end date by option
 *
 * @param  {String} option
 * @return {String} end_date
 */
exports.get_end_date = () => {
   const args   = require('./args')
   const moment = require('moment')

   // check module names
   if (args._.length === 0) {
      return 'Please enter the module names at least one. \n'
   }
   if (!args.s) {
      return 'Please enter the start date. \nBecause when using -s option, then start date is required. \n'
   }
   // check end date options
   if (args.e && !moment(args.e, 'YYYY-MM-DD', true).isValid()) {
      return 'Please enter the date correctly. \n'
   }
   return (args.e || moment().format('YYYY-MM-DD'))
}
