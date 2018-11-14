import optionValidator from '../index';

test('Function as type', () => {
  optionValidator(
    {
      numberOrString: 42,
      stringOrArray: ['1', '2', '3']
    },
    {
      numberOrString: (paths, value, type) => {
        return value === 42;
      },
      stringOrArray: (paths, value, type) => {
        return value.length === 3;
      }
    }
  );
});
