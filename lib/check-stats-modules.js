"use strict";

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
var npm = require('npm-stats-api');
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
  }

  // start date > end date
  if (new Date(start).getTime() > new Date(end).getTime()) {
    utils.show_help('The start date is specified to be later than the end date. \n\n');
    return;
  }
  var _iterator = _createForOfIteratorHelper(args._),
    _step;
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
          stats.sort(utils.compare);
          // Formatted and displayed in table format
          var ret = json2table(stats);
          ret.show();
        }
      });
    };
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      _loop();
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
};