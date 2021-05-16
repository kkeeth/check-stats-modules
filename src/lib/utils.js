const args = require('./args')
const {
   format,
   isValid,
   addDays,
   addWeeks,
   addMonths,
   addYears,
   getYear
} = require('date-fns')

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

   // check module names
   if (args._.length === 0) {
      return 'Please enter the module names at least one. \n'
   }
   // check start date options
   if (args.s && !isValid(format(args.s, 'yyyy-MM-dd'))) {
      return 'Please enter the date correctly. \n'
   }
   if (args.m) {
      return format(addMonths(new Date(), -1), 'yyyy-MM-dd')
   }
   if (args.y) {
      return format(addYears(new Date(), -1), 'yyyy-MM-dd')
   }
   if (args.t) {
      return `${getYear(new Date())}-01-01`
   }
   if (args.w) {
      return format(addWeeks(new Date(), -1), 'yyyy-MM-dd')
   }
   return (args.s || format(addDays(new Date(), -1), 'yyyy-MM-dd'))
}

/**
 * get end date by option
 *
 * @param  {String} option
 * @return {String} end_date
 */
exports.get_end_date = () => {

   // check module names
   if (args._.length === 0) {
      return 'Please enter the module names at least one. \n'
   }
   if (!args.s && args.e) {
      return 'Please enter the start date. \nBecause when using -s option, then start date is required. \n'
   }
   if (!args.e || Object.keys(args).length === 2) {
      return format(new Date(), 'yyyy-MM-dd')
   }
   // check end date options
   if (args.e && !isValid(format(args.e, 'yyyy-MM-dd'))) {
      return 'Please enter the date correctly. \n'
   }
   return (args.e || format(new Date(), 'yyyy-MM-dd'))
}

/**
 * A method for comparing two values for sorting
 *
 * @param  {Object} first stats object in processing sort function
 * @param  {Object} second stats object in processing sort function
 * @return {Number} 0: equal, 1: a < b, -1: a > b
 */
exports.compare = (a, b) => {
  if (a.downloads < b.downloads) {
    return 1
  }
  if (a.downloads > b.downloads) {
    return -1
  }

  return 0
}
