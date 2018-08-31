'use strict';

var chalk = require('chalk');
module.exports = require('yargs').usage('Usage:\n' + ('' + chalk.green.bold('  $0 <module names> [-f <YYYY-MM-DD>]\n'))).example('' + chalk.green.bold('$0 cmd-ranking -f 2018-01-01')).options({
   'f': {
      alias: 'from',
      describe: 'Specify the from of the period to be counted'
   },
   'v': {
      alias: 'version',
      describe: 'Show version'
   },
   'y': {
      alias: 'year',
      describe: 'Set "from" 1 year',
      type: 'boolean'
   },
   't': {
      alias: 'this-year',
      describe: 'Set "from" January 1 of this year',
      type: 'boolean'
   },
   'm': {
      alias: 'month',
      describe: 'Set "from" 1 month',
      type: 'boolean'
   },
   'h': {
      alias: 'help',
      describe: 'Show help'
   }
}).locale('en').argv;