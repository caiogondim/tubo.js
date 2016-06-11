'use strict'

const pipe = (result, ...funcs) => {
  return funcs.reduce((value, func) => {
    return func(value)
  }, result)
}

module.exports = pipe
