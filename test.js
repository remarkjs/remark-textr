import { equal } from 'assert';
import remark from 'remark';
import remarkTextr from './index';

// textr plugin — just function to replace triple dots to ellipses
const ellipses = input => input.replace(/\.{3}/gim, '…');

const text = `
## spread operator...

    function(...args) { return args; }
`;

it('should remarkTextr in node', () =>
  equal(
    remark().use(remarkTextr, { plugins: [ ellipses ] }).process(text),
`## spread operator…

    function(...args) { return args; }
`));

it('should remarkTextr in CLI (with options)', () =>
  equal(remark().use(remarkTextr, {
    plugins: [ 'typographic-ellipses', 'typographic-quotes' ],
    options: { locale: 'ru' }
  }).process('yo "there" ...\n'), 'yo «there» …\n')
);
