import optionValidator from '..';

test('Shallow object with scheme type', () => {
  optionValidator({
    typeNumber: 42,
    typeString: 'str',
    typeObject: {},
    typeArray: [1, 2, 3]
  }, {
    typeNumber: {
      type: 'number'
    },
    typeString: {
      type: 'string'
    },
    typeObject: {
      type: 'object'
    },
    typeArray: {
      type: 'array'
    }
  });
});

test('Shallow object with scheme type and option type', () => {
  optionValidator({
    type: 42,
    __type__: 'str'
  }, {
    type: {
      type: 'number'
    },
    __type__: {
      type: 'string'
    }
  });
});

test('Shallow object with scheme type and option without type', () => {
  optionValidator({
    typeNumber: 42,
    typeString: 'str',
    typeObject: {},
    typeArray: [1, 2, 3]
  }, {
    type: 'object'
  });
});
