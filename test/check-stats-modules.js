const rootDir = 'src/lib'
const test = require('ava')
const proxyquire = require('proxyquire')
const moment = require('moment')
const sinon = require('sinon')

test('main method check', async t => {
   const argsStub = {
      _: ['check-stats-modules'],
      h: '',
      v: ''
   }
   const nsaStub = sinon.stub().returns({
      downloads: 123,
      start: '2018-09-03',
      end: moment().format('YYYY-MM-DD'),
      package: 'check-stats-modules'
   })

   const csm = proxyquire(`${rootDir}/check-stats-modules`, {
      './args': argsStub,
      'npm-stats-api': nsaStub
   })

   t.true(csm() === true)
})
