'use strict'

// Test cases from:
// - https://github.com/mindeavor/es-pipeline-operator

const tap = require('tap')
const pipe = require('../src/')

tap.test('functions with single arguments', assert => {
  const doubleSay = str => str + ', ' + str
  const capitalize = str => str[0].toUpperCase() + str.substring(1)
  const exclaim = str => str + '!'

  const result = pipe(
    'hello',
    doubleSay,
    capitalize,
    exclaim
  )

  assert.ok(result === 'Hello, hello!')
  assert.end()
})

tap.test('functions with multiple arguments', assert => {
  const double = x => x + x
  const add = (x, y) => x + y
  const boundScore = (min, max, score) => {
    return Math.max(min, Math.min(max, score))
  }

  const person = {score: 25}
  const newScore = pipe(
    person.score,
    double,
    _ => add(7, _),
    _ => boundScore(0, 100, _)
  )
  console.log(newScore)
  assert.ok(newScore === 57)
  assert.end()
})

// tap.test('promises', assert => {
//
// })
//
// tap.test('async/await', assert => {
//
// })

//
// Motivating examples
//

tap.test('objet decorators', assert => {
  // Setup

  const greets = person => {
    person.greet = () => `${person.name} says hi!`
    return person
  }
  const ages = age => {
    return function (person) {
      person.age = age
      person.birthday = function () { person.age += 1 }
      return person
    }
  }
  const programs = favLang => {
    return function (person) {
      person.favLang = favLang
      person.program = () => `${person.name} starts to write ${person.favLang}!`
      return person
    }
  }

  function Person (name, age) {
    return pipe(
      { name: name },
      greets,
      ages(age)
    )
  }

  function Programmer (name, age) {
    return pipe(
      { name: name },
      greets,
      ages(age),
      programs('JavaScript')
    )
  }

  const person = new Person('John', 31)
  const programmer = new Programmer('Kevin', 27)

  // Tests

  assert.ok(person.greet() === 'John says hi!')
  person.birthday()
  assert.ok(person.age === 32)

  assert.ok(programmer.greet() === 'Kevin says hi!')
  programmer.birthday()
  assert.ok(programmer.age === 28)
  assert.ok(programmer.program() === 'Kevin starts to write JavaScript!')

  assert.end()
})

tap.test('validation', assert => {
  // Setup

  const bounded = (prop, min, max) => {
    return obj => {
      if (obj[prop] < min || obj[prop] > max) throw Error('out of bounds')
      return obj
    }
  }

  const format = (prop, regex) => {
    return (obj) => {
      if (!regex.test(obj[prop])) throw Error('invalid format')
      return obj
    }
  }

  const validatePerson = person => {
    pipe(
      person,
      bounded('age', 1, 100),
      format('name', /^[a-z]$/i)
    )
  }

  // Tests

  assert.throws(() => {
    validatePerson({age: 101, name: 'Kyle'})
  })
  assert.end()
})
