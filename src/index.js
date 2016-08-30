'use strict'

// FIXME(caiogondim): A hell of an unrealiable hack!
// const someIsPromise = (funcs) => {
//   var flag = false
//
//   funcs.forEach(func => {
//     if (func.toString().indexOf('new Promise') !== -1) {
//       flag = true
//     }
//   })
//
//   return flag
// }

const isThenable = (obj) => {
  return typeof obj === 'object' && typeof obj.then === 'function'
}

const pipeSync = (result, ...funcs) => {
  return funcs.reduce((value, func) => {
    return func(value)
  }, result)
}

const pipeAsync = (...funcs) => {
  var promise

  funcs.forEach((func, i) => {
    if (i === 0) {
      promise = func.then()
    } else {
      promise = promise.then(func)
    }
  })

  return promise
}

const pipe = (result, ...funcs) => {
  if (typeof result === 'function') {
    return pipe(result(), ...funcs)
  } else if (isThenable(result)) {
    return pipeAsync(result, ...funcs)
  } else {
    return pipeSync(result, ...funcs)
  }
}

module.exports = pipe
