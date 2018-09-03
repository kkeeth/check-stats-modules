'use strict';

var npm = require('npm-stat-api');
var moment = require('moment');
var yargs = require('yargs');
var chalk = require('chalk');
var pkg = require('../package.json');
var args = require('./args');

/**
 * run function
 *
 * @param  void
 * @return void
 */
module.exports = function () {
   // 'help' is top priority option
   if (args.h) {
      show_help();
   } else if (args.v) {
      console.log(pkg.version);
   } else if (args._.length === 0) {
      show_help(chalk.yellow.bold('Please enter the module names at least one. \n'));
   } else {
      var rank = show_stats();
   }
};

/**
 * show help
 *
 * @param  {String} help message if specifying a message
 * @return {String} full help message
 */
var show_help = function show_help(text) {
   if (text) console.log(text);
   yargs.showHelp();
};

/**
 * show stats about modules
 *
 * @param  void
 * @return void
 */
var show_stats = function show_stats() {
   var from = '';

   // check the correctness of from's date
   if (args.f) {
      var from_check = moment(args.f, 'YYYY-MM-DD', true).isValid() ? args.f : false;
      if (from_check === false) {
         show_help(chalk.yellow.bold('Please enter the date correctly. \n'));
         return;
      }
   }

   // set from date
   if (args.m) {
      from = moment().subtract(1, 'months').format('YYYY-MM-DD');
   } else if (args.y) {
      from = moment().subtract(1, 'years').format('YYYY-MM-DD');
   } else if (args.t) {
      from = moment().year() + '-01-01';
   } else if (args.w) {
      from = moment().subtract(1, 'weeks').format('YYYY-MM-DD');
   } else {
      from = args.f || moment().add(-1, 'days').format('YYYY-MM-DD');
   }
   var today = moment().format('YYYY-MM-DD');

   var _iteratorNormalCompletion = true;
   var _didIteratorError = false;
   var _iteratorError = undefined;

   try {
      for (var _iterator = args._[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
         var mod = _step.value;

         npm.stat(mod, from, today, function (err, res) {
            console.log(JSON.stringify(res) + "\n");
         });
      }
   } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
   } finally {
      try {
         if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
         }
      } finally {
         if (_didIteratorError) {
            throw _iteratorError;
         }
      }
   }
};