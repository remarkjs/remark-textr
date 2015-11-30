import visit from 'unist-util-visit';
import textr from 'textr';

export default function attacher(
  processor, { plugins = [], options = {} } = {}
) {
  return function transformer(ast) {
    visit(ast, 'text', node => {
      node.value = (textr(options).use(
        ...plugins.map(p => typeof p === 'string' ? require(p) : p)
      ))(node.value);
    });
  };
}
