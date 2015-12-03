import { equal } from 'assert';
import mdast from 'mdast';
import mdastTextr from './index';

// textr plugin — just function to replace triple dots to ellipses
const ellipses = input => input.replace(/\.{3}/gim, '…');

const text = `
## spread operator...

    function(...args) { return args; }
`;

it('should mdastTextr in node', () =>
  equal(
    mdast.use(mdastTextr, { plugins: [ ellipses ] }).process(text),
`## spread operator…

    function(...args) { return args; }
`));

it('should mdastTextr in CLI (with options)', () =>
  equal(mdast.use(mdastTextr, {
    plugins: [ 'typographic-ellipses', 'typographic-quotes' ],
    options: { locale: 'ru' }
  }).process('yo "there" ...\n'), 'yo «there» …\n')
);
