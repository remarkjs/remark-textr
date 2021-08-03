/**
 * @typedef {import('mdast').Root} Root
 *
 * @callback TextrPlugin
 * @param {string} value
 * @param {object} [options]
 *
 * @typedef Config
 * @property {Array.<string|TextrPlugin>} [plugins]
 * @property {object} [options]
 */

import {visit} from 'unist-util-visit'
import textr from 'textr'

/**
 * Plugin to make your typography better with Textr.
 *
 * @type {import('unified').Plugin<[Config?]|void[], Root>}
 */
export default function remarkTextr(options) {
  const settings = options || {}
  const promise = Promise.all(
    (settings.plugins || []).map(
      /**
       * @returns {Promise<TextrPlugin>}
       */
      // Default is an `any`.
      // type-coverage:ignore-next-line
      async (fn) => (typeof fn === 'string' ? (await import(fn)).default : fn)
    )
  ).then((list) => textr(settings.options || {}).use(...list))

  return async (tree) => {
    const typography = await promise
    visit(tree, 'text', (node) => {
      node.value = typography.exec(node.value)
    })
  }
}
