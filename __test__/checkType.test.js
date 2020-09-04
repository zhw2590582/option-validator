import optionValidator from '../index';
import { option, scheme } from './testData';

test('Check Type Shallow', () => {
  Object.keys(option).forEach((key) => {
    const optionValue = option[key];
    const schemeValue = scheme[key];
    optionValidator(optionValue, schemeValue);
  });
});

test('Check Type Child', () => {
  optionValidator(
    {
      a: 1,
    },
    {
      a: 'number',
    },
  );

  expect(() => {
    optionValidator(
      {
        // a: 1
      },
      {
        a: 'number',
      },
    );
  }).toThrowError(/Type Error/);
});

test('Check Type Child Multiple', () => {
  optionValidator(
    {
      a: 1,
    },
    {
      a: 'number|string',
    },
  );

  expect(() => {
    optionValidator(
      {
        a: () => null,
      },
      {
        a: 'number|string',
      },
    );
  }).toThrowError(/Type Error/);
});

test('Check Type Child Deep', () => {
  optionValidator(
    {
      a: {
        b: {
          c: 123,
          d: 'test',
          e: {
            f: () => null,
          },
        },
      },
    },
    {
      a: {
        b: {
          c: 'number',
          d: 'string',
          e: {
            f: 'function',
          },
        },
      },
    },
  );

  expect(() => {
    optionValidator(
      {
        a: {
          b: {
            c: 123,
            d: 'test',
            e: {
              // f: () => null
            },
          },
        },
      },
      {
        a: {
          b: {
            c: 'number',
            d: 'string',
            e: {
              f: 'function',
            },
          },
        },
      },
    );
  }).toThrowError(/Type Error/);
});

test('Check Type Child Deep Array', () => {
  optionValidator(
    {
      a: {
        b: {
          c: 123,
          d: 'test',
          e: {
            f: [1, '2', () => null],
          },
        },
      },
    },
    {
      a: {
        b: {
          c: 'number',
          d: 'string',
          e: {
            f: ['number', 'string', 'function'],
          },
        },
      },
    },
  );

  expect(() => {
    optionValidator(
      {
        a: {
          b: {
            c: 123,
            d: 'test',
            e: {
              f: [1, 2, () => null],
            },
          },
        },
      },
      {
        a: {
          b: {
            c: 'number',
            d: 'string',
            e: {
              f: ['number', 'string', 'function'],
            },
          },
        },
      },
    );
  }).toThrowError(/Type Error/);
});

test('Check Type Miss', () => {
  expect(() => {
    optionValidator(
      {
        a: {},
      },
      {
        a: [],
      },
    );
  }).toThrowError(/Type Error/);

  expect(() => {
    optionValidator(
      {
        a: [],
      },
      {
        a: {},
      },
    );
  }).toThrowError(/Type Error/);
});

test('Check Shallow Optional Type', () => {
  optionValidator(
    {
      // a: 'test',
      b: 123,
    },
    {
      a: '?string',
      b: 'number',
    },
  );
});

test('Check Deep Optional Type', () => {
  optionValidator(
    {
      a: {
        // b: 'test',
      },
    },
    {
      a: {
        b: '?number',
      },
    },
  );
});
