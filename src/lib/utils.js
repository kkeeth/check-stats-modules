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
 * get from date by option
 *
 * @param  {String} option
 * @return {String} from_date
 */
exports.get_from_date = () => {
   const args = require('./args')
   const moment = require('moment')

   // check from date options
   if (args.f && !moment(args.f, 'YYYY-MM-DD', true).isValid()) {
      require('./utils').show_help('Please enter the date correctly. \n')
      process.exit(0)
   }
   if (args.m) {
      return moment().subtract(1, 'months').format('YYYY-MM-DD');
   }
   if (args.y) {
      return moment().subtract(1, 'years').format('YYYY-MM-DD');
   }
   if (args.t) {
      return moment().year() + '-01-01';
   }
   if (args.w) {
      return moment().subtract(1, 'weeks').format('YYYY-MM-DD');
   }
   return args.f || moment().add(-1, 'days').format('YYYY-MM-DD');
}
