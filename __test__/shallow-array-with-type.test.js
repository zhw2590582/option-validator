import optionValidator from '..';

test('Shallow array with scheme type', () => {
  optionValidator([{
    typeNumber: 42,
    typeString: 'str',
    typeObject: {},
    typeArray: [1, 2, 3]
  }], {
    type: 'array',
    child: {
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
    }
  });
});

test('Shallow array with scheme type and option type', () => {
  optionValidator([{
    type: 42,
    __type__: 'str'
  }], {
    type: 'array',
    child: {
      type: {
        type: 'number'
      },
      __type__: {
        type: 'string'
      }
    }
  });
});

test('Shallow array with scheme type and option without type', () => {
  optionValidator([{
    typeNumber: 42,
    typeString: 'str',
    typeObject: {},
    typeArray: [1, 2, 3]
  }], {
    type: 'array'
  });
});
