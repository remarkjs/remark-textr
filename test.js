import { equal } from 'assert';
import mdast from 'mdast';
import typographer from '.';

const t = (text, options) =>
  mdast().use(typographer, options).process(text).trim();

describe('mdast-typographer', () => {

  it('should transform', () => {
    equal(t(`rock'n'rol`), `rock’n’rol`, 'apostrophes');
    equal(t(`sisters' friends'`), `sisters’ friends’`, 'plurals');
    equal(t(`-> <-`), `→ ←`, 'arrows');
    equal(t(`(c)`), `©`, 'copyright');
    equal(t(`1USD = 23,7UAH`), `1$ = 23,7₴`, 'currency');
    equal(t(`... ... ...`), `… … …`, 'currency');
    equal(t(`foo -- bar`), `foo — bar`, 'em-dashes');
    equal(t(`(1967-1994)`), `(1967–1994)`, 'en-dashes');
    equal(t(`10 -+ 1`), `10 ∓ 1`, 'math');
    equal(t(`"quotes"`), `“quotes”`, 'quotes');
    equal(t(`(R)`), `®`, 'registered');
    equal(t(`foo    bar`), `foo bar`, 'spaces');
    equal(t(`(TM)`), `™`, 'trademark');
  });

  it('should remove disabled transformers', () =>
    equal(
      t(`Ellipses... and "quotes"`, {
        ellipses: false
      }),
      `Ellipses... and “quotes”`
    )
  );

  it('should load locale', () =>
    equal(t(`"quotes"`, { locale: 'uk' }), `«quotes»`)
  );

  it('should use after transformers', () =>
    equal(
      t(`Hello, "world".`, {
        after: [(t) => t.replace('world', 'guys')]
      }),
      `Hello, “guys”.`
    )
  );

  it('should use before transformers', () =>
    equal(
      t(`Hello, "world"!`, {
        before: [(t) => t.replace(/"/g, '')]
      }),
      `Hello, world!`
    )
  );

  it('should use after and before transformers', () =>
    equal(
      t(`Hello, "world"!`, {
        before: [(t) => t.replace(/"/g, '')],
        after: [(t) => t.replace('world', 'guys')]
      }),
      `Hello, guys!`
    )
  );

});
