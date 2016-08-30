const tap = require('tap')
const pipe = require('../src/')

tap.test('async', test => {

  const getInitialValue = () => {
    return new Promise((resolve, reject) => {
      resolve(2)
    })
  }

  const doubleAsync = function(n) {
    return new Promise((resolve, reject) => {
      resolve(n * 2)
    })
  }

  test.test('first argument is a Promise and rest functions that returns Promise', test => {
    pipe(
      getInitialValue(),
      doubleAsync,
      doubleAsync,
      doubleAsync
    )
      .then(val => {
        test.ok(val === 16)
        test.end()
      })
      .catch(error => {
        console.log(error)
        test.end()
      })
  })

  test.test('all promises', test => {
    pipe(
      getInitialValue,
      doubleAsync,
      doubleAsync,
      doubleAsync
    )
      .then(val => {
        test.ok(val === 16)
        test.end()
      })
      .catch(error => {
        console.log(error)
        test.end()
      })
  })

  test.end()
})

// tap.test('async/await', test => {
//
// })
