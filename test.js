import { equal } from 'assert';
import mdast from 'mdast';
import mdastTextr from './index';
import base from 'typographic-base';

const t = (text, mdastOptions) =>
  mdast()
    .use(mdastTextr, mdastOptions)
    .process(text)
    .trim();

describe('mdast-textr', () => {

  it('should return original text', () =>
    equal(t(`Hello, "world"...`), `Hello, "world"...`)
  );

  it('should return transformed text', () =>
    equal(
      t(`Hello, "world"...`, {
        plugins: [ base ]
      }),
      `Hello, “world”…`
    )
  );

  it('should require strings', () =>
    equal(
      t(`Hello, "world"...`, {
        plugins: [ 'typographic-ellipses' ]
      }),
      `Hello, "world"…`
    )
  );

  it('should load options', () =>
    equal(
      t(`"quotes"`, {
        plugins: [ base ],
        options: { locale: 'uk' }
      }),
      `«quotes»`
    )
  );

});
