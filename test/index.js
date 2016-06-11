'use strict'

const tap = require('tap')
const pipe = require('../src/')

const doubleSay = str => str + ', ' + str
const capitalize = str => str[0].toUpperCase() + str.substring(1)
const exclaim = str => str + '!'

tap.test('all functions on the pipeline must be executed', (assert) => {
  const result = pipe(
    'hello',
    doubleSay,
    capitalize,
    exclaim
  )

  assert.ok(result === 'Hello, hello!')
  assert.end()
})
