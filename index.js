var visit = require('unist-util-visit')
var otextr = require('textr')

module.exports = textr

function textr(options) {
  var settings = options || {}
  var tf = otextr(settings.options || {})

  tf.use.apply(tf, (settings.plugins || []).map(load))

  return transform

  function transform(tree) {
    visit(tree, 'text', visitor)
  }

  function visitor(node) {
    node.value = tf(node.value)
  }
}

function load(fn) {
  return typeof fn === 'string' ? require(fn) : fn
}
