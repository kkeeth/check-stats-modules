const rootDir = '../lib'
const test = require('ava')
const proxyquire = require('proxyquire')

const errorMessages = {
   dateFormatError: 'Please enter the date correctly. \n',
   moduleNameNull: 'Please enter the module names at least one. \n'
}

// As these options are only processing of external libraries, check only one
// 'week', 'month', 'year'
test('check start date when -m option', async t => {
   const argsStub = {
      s: false,
      e: false,
      m: true,
      y: false,
      t: false,
      w: false
   }
   const {get_start_date} = proxyquire(`${rootDir}/utils`, {
      './args': argsStub
   })
   const actual = await get_start_date()

   t.true(typeof actual === 'string')
   t.true(actual.length === 10)
})

test('check start date when t option', async t => {
   const argsStub = {
      s: false,
      e: false,
      m: false,
      y: false,
      t: true,
      w: false
   }
   const {get_start_date} = proxyquire(`${rootDir}/utils`, {
      './args': argsStub
   })
   const actual = await get_start_date()

   t.true(typeof actual === 'string')
   t.true(actual.length === 10)
   t.is(actual.substr(-6), '-01-01')
})

test('check start date when s option and set correct date', async t => {
   const argsStub = {
      s: '2018-05-03',
      e: false,
      m: false,
      y: false,
      t: false, 
      w: false
   }
   const {get_start_date} = proxyquire(`${rootDir}/utils`, {
      './args': argsStub
   })
   const actual = await get_start_date()

   t.true(typeof actual === 'string')
   t.true(actual.length === 10)
   t.is(actual, argsStub.s)
})

test('check start date when s option and specify empty string', async t => {
   const argsStub = {
      s: '',
      e: false,
      m: false,
      y: false,
      t: false, 
      w: false
   }
   const {get_start_date} = proxyquire(`${rootDir}/utils`, {
      './args': argsStub
   })
   const actual = await get_start_date()

   t.true(typeof actual === 'string')
   t.true(actual.length === 10)
})

test('check start date when s option and specify incorrect date', async t => {
   const argsStub = {
      s: '2018-',
      e: false,
      m: false,
      y: false,
      t: false, 
      w: false
   }
   const {get_start_date} = proxyquire(`${rootDir}/utils`, {
      './args': argsStub
   })
   const error = await get_start_date()

   t.is(error, errorMessages.dateFormatError)
})

test('check start date when s option and specify not exist date', async t => {
   const argsStub = {
      s: '2018-15-89',
      e: false,
      m: false,
      y: false,
      t: false, 
      w: false
   }

   const {get_start_date} = proxyquire(`${rootDir}/utils`, {
      './args': argsStub
   })

   const error = await get_start_date()

   t.is(error, errorMessages.dateFormatError)
})

test('check start date when s option and specify symbols', async t => {
   const argsStub = {
      s: '!"#$%&()',
      e: false,
      m: false,
      y: false,
      t: false, 
      w: false
   }

   const {get_start_date} = proxyquire(`${rootDir}/utils`, {
      './args': argsStub
   })

   const error = await get_start_date()

   t.is(error, errorMessages.dateFormatError)
})

test('check when module name is not specified', async t => {
   const argsStub = {
      _: [],
      s: "2019-08-30",
      e: false,
      m: false,
      y: false,
      t: false,
      w: false
   }

   const {get_start_date} = proxyquire(`${rootDir}/utils`, {
      './args': argsStub
   })

   const error = await get_start_date()

   t.is(error, errorMessages.moduleNameNull)
})

