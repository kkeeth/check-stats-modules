const JSONTable = require('json-table')

module.exports = (stats) => {
   return new JSONTable(stats, {
      chars: {
         'top': '═',
         'top-mid': '╤',
         'top-left': '╔',
         'top-right': '╗',
         'bottom': '═',
         'bottom-mid': '╧',
         'bottom-left': '╚',
         'bottom-right': '╝',
         'left': '║',
         'left-mid': '╟',
         'mid': '─',
         'mid-mid': '┼',
         'right': '║',
         'right-mid': '╢',
         'middle': '│'
      }
   },
   (table) => table)
}
