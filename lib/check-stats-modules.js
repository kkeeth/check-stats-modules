"use strict";

var npm = require('npm-stats-api');

var moment = require('moment');

var chalk = require('chalk');

var args = require('./args');

var json2table = require('./json2table.js');

var utils = require('./utils');
/**
 * show stats about modules
 * (this is the main function)
 *
 * @param  void
 * @return void
 */


module.exports = function () {
  // set start date
  var start = utils.get_start_date();
  var end = utils.get_end_date();
  var stats = [];

  if ("".concat(new Date(start)) === 'Invalid Date') {
    utils.show_help(start);
    return;
  }

  if ("".concat(new Date(end)) === 'Invalid Date') {
    utils.show_help(end);
    return;
  } // start date > end date


  if (new Date(start).getTime() > new Date(end).getTime()) {
    utils.show_help('The start date is specified to be later than the end date. \n\n');
    return;
  }

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    var _loop = function _loop() {
      var mod = _step.value;
      npm.stat(mod, start, end, function (err, res) {
        if (err) {
          res.downloads = res.error;
          res.start = start;
          res.end = end;
          res["package"] = mod;
          delete res.error;
        }

        stats.push(res);

        if (args._.length === stats.length) {
          // sort by downloads number
          stats.sort(utils.compare); // Formatted and displayed in table format

          var ret = json2table(stats);
          ret.show();
        }
      });
    };

    for (var _iterator = args._[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      _loop();
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator["return"] != null) {
        _iterator["return"]();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }
};