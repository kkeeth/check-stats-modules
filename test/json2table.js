const rootDir = '../lib'
const json2table = require(`${rootDir}/json2table`)
const test = require('ava')

test('json to table format ok', async t => {
   const table = json2table({hoge: 'hoge'})
   t.true(table.table.length > 0)
})
