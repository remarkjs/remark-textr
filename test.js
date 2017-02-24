import { equal } from 'assert';
import remark from 'remark';
import remarkTextr from '.';

// textr plugin — just function to replace triple dots to ellipses
const ellipses = input => input.replace(/\.{3}/gim, '…');

it('should remarkTextr in node', () => {
  const fixture = `
## spread operator...

    function(...args) { return args; }
`;

  const expected = `
## spread operator…

    function(...args) { return args; }
`;

  const actual = remark()
    .use(remarkTextr, { plugins: [ ellipses ] })
    .processSync(fixture)
    .toString();

  equal(actual.trim(), expected.trim());
});

it('should remarkTextr in CLI (with options)', () => {
  const fixture = 'yo "there" ...\n';
  const expected = 'yo «there» …\n';

  const actual = remark()
    .use(remarkTextr, {
      plugins: [ 'typographic-ellipses', 'typographic-quotes' ],
      options: { locale: 'ru' }
    })
    .processSync(fixture)
    .toString();

  equal(actual.trim(), expected.trim());
});
