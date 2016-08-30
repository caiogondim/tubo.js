const tap = require('tap')
const pipe = require('../src/')

tap.test('async', test => {

  // Should work when all arguments are promises
  test.test('all promises', test => {
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

  test.end()
})

// tap.test('async/await', test => {
//
// })
