'use strict';

var json_tb = require('json-table');

module.exports = function (stats) {
   return new json_tb(stats, {
      chars: { 'top': '═', 'top-mid': '╤', 'top-left': '╔', 'top-right': '╗',
         'bottom': '═', 'bottom-mid': '╧', 'bottom-left': '╚', 'bottom-right': '╝',
         'left': '║', 'left-mid': '╟', 'mid': '─', 'mid-mid': '┼',
         'right': '║', 'right-mid': '╢', 'middle': '│'
      },
      style: {
         head: ['lightgreen']
      }
   }, function (table) {
      table.show();
   });
};