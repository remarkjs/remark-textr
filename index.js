import visit from 'unist-util-visit'
import otextr from 'textr'

export default function remarkTextr(options) {
  var settings = options || {}
  const promise = Promise.all(
    (settings.plugins || []).map(async (fn) =>
      typeof fn === 'string' ? (await import(fn)).default : fn
    )
  ).then((list) => otextr(settings.options || {}).use(...list))

  return transform

  async function transform(tree) {
    const tf = await promise
    visit(tree, 'text', (node) => {
      node.value = tf(node.value)
    })
  }
}
