"use strict";

var npm = require('npm-stats-api');

var moment = require('moment');

var yargs = require('yargs');

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
  // check specification of modules name
  if (args._.length === 0) {
    utils.show_help(chalk.yellow.bold('Please enter the module names at least one. \n'));
    return;
  } // set from date


  var from = utils.get_from_date();
  var today = moment().format('YYYY-MM-DD');
  var stats = [];
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    var _loop = function _loop() {
      var mod = _step.value;
      npm.stat(mod, from, today, function (err, res) {
        if (err) {
          res.downloads = res.error;
          res.start = from;
          res.end = today;
          res["package"] = mod;
          delete res.error;
        }

        stats.push(res);

        if (args._.length === stats.length) {
          // Formatted and displayed in table format
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