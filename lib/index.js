/**
 * @typedef {import('mdast').Root} Root
 */

/**
 * @typedef Options
 *   Configuration.
 * @property {ReadonlyArray<TextrPlugin | string> | null | undefined} [plugins]
 *   Textr plugins.
 * @property {object | null | undefined} [options]
 *   Configuration passed to `textr`.
 *
 * @callback TextrPlugin
 *   Textr plugin.
 * @param {string} value
 *   Value to transform.
 * @param {object} options
 *   Global configuration passed to textr.
 * @returns {string | undefined | void}
 *   Changed text (optional).
 */

import textr from 'textr'
import {visit} from 'unist-util-visit'

/** @type {Readonly<Options>} */
const emptyOptions = {}

/**
 * Improve typography with Textr.
 *
 * @param {Readonly<Options> | null | undefined} [options]
 *   Configuration (optional).
 * @returns
 *   Transform.
 */
export default function remarkTextr(options) {
  const settings = options || emptyOptions
  const plugins = settings.plugins || []
  const textrOptions = settings.options || {}
  const promise = Promise.all(
    plugins.map(async function (fn) {
      if (typeof fn === 'string') {
        // Assume plugin at default.
        /** @type {{default: TextrPlugin}} */
        const mod = await import(fn)
        return mod.default
      }

      return fn
    })
  ).then(function (list) {
    return textr(textrOptions).use(...list)
  })

  /**
   * Transform.
   *
   * @param {Root} tree
   *   Tree.
   * @returns {Promise<undefined>}
   *   Nothing.
   */
  return async function (tree) {
    const typography = await promise
    visit(tree, 'text', function (node) {
      node.value = typography.exec(node.value)
    })
  }
}
