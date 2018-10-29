import optionValidator from '..';

const option = {
  a: 11,
  b: 11,
  c: false,
  d: null
};

test('11', () => {
  const state = optionValidator(option, {
    a: 'string',
    b: 'number',
    c: 'boolean',
    d: 'null'
  });
  expect(state).toBe(true);
});
