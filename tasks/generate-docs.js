const marked = require('marked')
const fs = require('fs')
const pipe = require('../src/')

const markdown = pipe(
  fs.readFileSync('README.md', {encoding: 'utf8'}),
  marked
)

const tmpl = fs.readFileSync('./docs/index-tmpl.html', {encoding: 'utf8'})
const html = tmpl.replace('{{content}}', markdown)
fs.writeFileSync('docs/index.html', html, {encoding: 'utf8'})