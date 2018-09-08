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
   let from = ''

   // check from date options
   if (args.f && !moment(args.f, 'YYYY-MM-DD', true).isValid()) {
      require('./utils').show_help('Please enter the date correctly. \n')
      return
   }
   else if (args.m) {
      from = moment().subtract(1, 'months').format('YYYY-MM-DD');
   }
   else if (args.y) {
      from = moment().subtract(1, 'years').format('YYYY-MM-DD');
   }
   else if (args.t) {
      from = moment().year() + '-01-01';
   }
   else if (args.w) {
      from = moment().subtract(1, 'weeks').format('YYYY-MM-DD');
   }
   else {
      from = args.f || moment().add(-1, 'days').format('YYYY-MM-DD');
   }

   return from
}
