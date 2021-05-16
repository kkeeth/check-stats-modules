"use strict";

var args = require('./args');

var _require = require('date-fns'),
    format = _require.format,
    parseISO = _require.parseISO,
    isValid = _require.isValid,
    addDays = _require.addDays,
    addWeeks = _require.addWeeks,
    addMonths = _require.addMonths,
    addYears = _require.addYears,
    getYear = _require.getYear;
/**
 * show help
 *
 * @param  {String} help message if specifying a message
 * @return {String} full help message
 */


exports.show_help = function (text) {
  if (text) console.log(require('chalk').yellow.bold(text));

  require('yargs').showHelp();
};
/**
 * get start date by option
 *
 * @param  {String} option
 * @return {String} start_date
 */


exports.get_start_date = function () {
  // check module names
  if (args._.length === 0) {
    return 'Please enter the module names at least one. \n';
  } // check start date options


  if (args.s) {
    if (!/\d{4}-\d{2}-\d{2}/.test(args.s)) {
      return 'Please enter the date correctly. \n';
    }

    if (!isValid(parseISO(args.s))) {
      return 'Please enter the date correctly. \n';
    }
  }

  if (args.m) {
    return format(addMonths(new Date(), -1), 'yyyy-MM-dd');
  }

  if (args.y) {
    return format(addYears(new Date(), -1), 'yyyy-MM-dd');
  }

  if (args.t) {
    return "".concat(getYear(new Date()), "-01-01");
  }

  if (args.w) {
    return format(addWeeks(new Date(), -1), 'yyyy-MM-dd');
  }

  return args.s || format(addDays(new Date(), -1), 'yyyy-MM-dd');
};
/**
 * get end date by option
 *
 * @param  {String} option
 * @return {String} end_date
 */


exports.get_end_date = function () {
  // check module names
  if (args._.length === 0) {
    return 'Please enter the module names at least one. \n';
  }

  if (!args.s && args.e) {
    return 'Please enter the start date. \nBecause when using -s option, then start date is required. \n';
  }

  if (!args.e || Object.keys(args).length === 2) {
    return format(new Date(), 'yyyy-MM-dd');
  } // check end date options


  if (args.e) {
    if (!/\d{4}-\d{2}-\d{2}/.test(args.e)) {
      return 'Please enter the date correctly. \n';
    }

    if (!isValid(parseISO(args.e))) {
      return 'Please enter the date correctly. \n';
    }
  }

  return args.e || format(new Date(), 'yyyy-MM-dd');
};
/**
 * A method for comparing two values for sorting
 *
 * @param  {Object} first stats object in processing sort function
 * @param  {Object} second stats object in processing sort function
 * @return {Number} 0: equal, 1: a < b, -1: a > b
 */


exports.compare = function (a, b) {
  if (a.downloads < b.downloads) {
    return 1;
  }

  if (a.downloads > b.downloads) {
    return -1;
  }

  return 0;
};