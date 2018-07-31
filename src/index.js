function isThenable(obj) {
  return typeof obj === 'object' && typeof obj.then === 'function'
}

function pipe() {
  var procs = Array.prototype.slice.call(arguments)
  var output

  procs.forEach(function(proc, i) {
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
