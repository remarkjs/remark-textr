import visit from 'unist-util-visit';
import textr from 'textr';

import DEFAULT_TRANSFORMERS from './transformers';

export default function attacher(processor, options = {}) {
  const tfs = Object.keys(DEFAULT_TRANSFORMERS)
    .filter(item => options[item] === undefined && true)
    .map(item => require(DEFAULT_TRANSFORMERS[item]));

  return function transformer(ast) {
    visit(ast, 'text', node => {
      node.value = (textr().use(...tfs))(node.value);
    });
  };
}
