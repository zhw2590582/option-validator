import optionValidator from '../index';

test('Shallow array with scheme validator', () => {
  optionValidator([{
    typeNumber: 42,
    typeString: 'str',
    typeObject: {},
    typeArray: [1, 2, 3]
  }], {
    type: 'array',
    child: {
      typeNumber: {
        type: 'number',
        validator: (paths, value, type) => {
          return value === 42;
        }
      },
      typeString: {
        type: 'string',
        validator: (paths, value, type) => {
          return value.length === 3;
        }
      },
      typeObject: {
        type: 'object',
        validator: (paths, value, type) => {
          return Object.keys(value).length === 0;
        }
      },
      typeArray: {
        type: 'array',
        validator: (paths, value, type) => {
          return value.length === 3;
        }
      }
    }
  });
});

test('Shallow array with scheme validator and option validator', () => {
  optionValidator([{
    validator: 42,
    __validator__: 'str'
  }], {
    type: 'array',
    child: {
      validator: {
        validator: (paths, value, type) => {
          return value === 42;
        }
      },
      __validator__: {
        validator: (paths, value, type) => {
          return value.length === 3;
        }
      }
    }
  });
});

test('Shallow array with scheme validator and option without validator', () => {
  optionValidator([{
    typeNumber: 42,
    typeString: 'str',
    typeObject: {},
    typeArray: [1, 2, 3]
  }], {
    type: 'array',
    child: {
      validator: (paths, value, type) => {
        return Object.keys(value).length === 4;
      }
    }
  });
});

test('Shallow array with scheme validator and option without validator 2', () => {
  optionValidator([1, 2, 3], {
    type: 'array',
    child: {
      validator: (paths, value, type) => {
        return paths[paths.length - 1] + 1 === value;
      }
    }
  });
});
