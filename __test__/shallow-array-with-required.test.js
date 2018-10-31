import optionValidator from '..';

test('Shallow array with scheme required', () => {
  expect(() => {
    optionValidator([{
      // typeNumber: 42
    }], {
      type: 'array',
      child: {
        typeNumber: {
          required: true
        }
      }
    });
  }).toThrowError(/required/);
});

test('Shallow object with scheme required and option required', () => {
  expect(() => {
    optionValidator([{
      // required: 42,
      // __required__: 'str'
    }], {
      type: 'array',
      child: {
        required: {
          required: true
        },
        __required__: {
          required: true
        }
      }
    });
  }).toThrowError(/required/);
});
