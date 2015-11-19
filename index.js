import visit from 'unist-util-visit';
import textr from 'textr';

import TRANSFORMERS from './transformers';

export default function attacher(
  processor, {
    locale = 'en-us',
    before = [],
    ...options,
    after = []
  } = {}
) {
  const tfs = Object.keys(TRANSFORMERS)
    .filter(item => options[item] !== false && true)
    .map(item => require(TRANSFORMERS[item]));

  return function transformer(ast) {
    visit(ast, 'text', node => {
      node.value = (
        textr({ locale })
          .use(...before)
          .use(...tfs)
          .use(...after)
      )(node.value);
    });
  };
}
