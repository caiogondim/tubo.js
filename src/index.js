'use strict'

const isThenable = (obj) => {
  return typeof obj === 'object' && typeof obj.then === 'function'
}

const pipe = (...procs) => {
  var output

  procs.forEach((proc, i) => {
    if (isThenable(output)) {
      output = output.then(proc)
    } else if (typeof proc === 'function') {
      if (i === 0) {
        output = proc()
      } else {
        output = proc(output)
      }
    } else {
      output = proc
    }
  })

  return output
}

module.exports = pipe
