import optionValidator from '../index';

test('Function as type', () => {
  optionValidator(
    {
      numberOrString: 42,
      stringOrArray: ['1', '2', '3']
    },
    {
      numberOrString: (value, type, paths) => {
        return value === 42;
      },
      stringOrArray: (value, type, paths) => {
        return value.length === 3;
      }
    }
  );
});
