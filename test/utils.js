const rootDir = '../lib'
const test = require('ava')
const proxyquire = require('proxyquire')

const errorMessages = {
   dateFormatError: 'Please enter the date correctly. \n',
   moduleNameNull: 'Please enter the module names at least one. \n'
}

// As these options are only processing of external libraries, check only one
// 'week', 'month', 'year'
test('check from date when -m option', async t => {
   const argsStub = {
      f: false,
      m: true,
      y: false,
      t: false,
      w: false
   }
   const {get_from_date} = proxyquire(`${rootDir}/utils`, {
      './args': argsStub
   })
   const actual = await get_from_date()

   t.true(typeof actual === 'string')
   t.true(actual.length === 10)
})

test('check from date when t option', async t => {
   const argsStub = {
      f: false,
      m: false,
      y: false,
      t: true,
      w: false
   }
   const {get_from_date} = proxyquire(`${rootDir}/utils`, {
      './args': argsStub
   })
   const actual = await get_from_date()

   t.true(typeof actual === 'string')
   t.true(actual.length === 10)
   t.is(actual.substr(-6), '-01-01')
})

test('check from date when f option and set correct date', async t => {
   const argsStub = {
      f: '2018-05-03',
      m: false,
      y: false,
      t: false, 
      w: false
   }
   const {get_from_date} = proxyquire(`${rootDir}/utils`, {
      './args': argsStub
   })
   const actual = await get_from_date()

   t.true(typeof actual === 'string')
   t.true(actual.length === 10)
   t.is(actual, argsStub.f)
})

test('check from date when f option and specify empty string', async t => {
   const argsStub = {
      f: '',
      m: false,
      y: false,
      t: false, 
      w: false
   }
   const {get_from_date} = proxyquire(`${rootDir}/utils`, {
      './args': argsStub
   })
   const actual = await get_from_date()

   t.true(typeof actual === 'string')
   t.true(actual.length === 10)
})

test('check from date when f option and specify incorrect date', async t => {
   const argsStub = {
      f: '2018-',
      m: false,
      y: false,
      t: false, 
      w: false
   }
   const {get_from_date} = proxyquire(`${rootDir}/utils`, {
      './args': argsStub
   })
   const error = await get_from_date()

   t.is(error, errorMessages.dateFormatError)
})

test('check from date when f option and specify not exist date', async t => {
   const argsStub = {
      f: '2018-15-89',
      m: false,
      y: false,
      t: false, 
      w: false
   }

   const {get_from_date} = proxyquire(`${rootDir}/utils`, {
      './args': argsStub
   })

   const error = await get_from_date()

   t.is(error, errorMessages.dateFormatError)
})

test('check from date when f option and specify symbols', async t => {
   const argsStub = {
      f: '!"#$%&()',
      m: false,
      y: false,
      t: false, 
      w: false
   }

   const {get_from_date} = proxyquire(`${rootDir}/utils`, {
      './args': argsStub
   })

   const error = await get_from_date()

   t.is(error, errorMessages.dateFormatError)
})

test('check when module name is not specified', async t => {
   const argsStub = {
      _: [],
      f: "2019-08-30",
      m: false,
      y: false,
      t: false,
      w: false
   }

   const {get_from_date} = proxyquire(`${rootDir}/utils`, {
      './args': argsStub
   })

   const error = await get_from_date()

   t.is(error, errorMessages.moduleNameNull)
})

