var visit = require('unist-util-visit')
var otextr = require('textr')

module.exports = textr

function textr(config) {
  var conf = config || {}
  var tf = otextr(conf.options || {})

  tf.use.apply(tf, (conf.plugins || []).map(load))

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
