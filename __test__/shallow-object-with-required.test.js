import optionValidator from '../index';

test('Shallow object with scheme required', () => {
  expect(() => {
    optionValidator({
      // typeNumber: 42
    }, {
      typeNumber: {
        required: true
      }
    });
  }).toThrowError(/required/);
});

test('Shallow object with scheme required and option required', () => {
  expect(() => {
    optionValidator({
      // required: 42,
      // __required__: 'str'
    }, {
      required: {
        required: true
      },
      __required__: {
        required: true
      }
    });
  }).toThrowError(/required/);
});
