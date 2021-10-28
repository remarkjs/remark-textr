/**
 * @typedef {import('mdast').Root} Root
 *
 * @callback TextrPlugin
 *   A textr plugin.
 * @param {string} value
 *   Value to transform.
 * @param {object} [options]
 *   Global configuration passed to textr.
 * @returns {string|void}
 *   Changed text (optional).
 *
 * @typedef Options
 *   Configuration.
 * @property {Array.<string|TextrPlugin>} [plugins]
 *   Textr plugins.
 * @property {object} [options]
 *   Configuration passed to `textr`.
 */

import {visit} from 'unist-util-visit'
import textr from 'textr'

/**
 * Plugin to improve typography with Textr.
 *
 * @type {import('unified').Plugin<[Options?]|void[], Root>}
 */
export default function remarkTextr(options = {}) {
  const plugins = options.plugins || []
  const promise = Promise.all(
    plugins.map(
      /**
       * @returns {Promise<TextrPlugin>}
       */
      // Default is an `any`.
      // type-coverage:ignore-next-line
      async (fn) => (typeof fn === 'string' ? (await import(fn)).default : fn)
    )
  ).then((list) => textr(options.options || {}).use(...list))

  return async (tree) => {
    const typography = await promise
    visit(tree, 'text', (node) => {
      node.value = typography.exec(node.value)
    })
  }
}
