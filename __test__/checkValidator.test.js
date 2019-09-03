import optionValidator from '../index';
import { option, scheme } from './testData';

test('Check Validator Shallow', () => {
  const schemeValidators = Object.keys(scheme).reduce((result, key) => {
    result[key] = (option, optionType, paths) => {
        return true;
    }
    return result;
  }, {});

  Object.keys(option).forEach(key => {
    const optionValue = option[key];
    const schemeValue = schemeValidators[key];
    optionValidator(optionValue, schemeValue);
  });
});

test('Check Validator Child', () => {
  optionValidator({
    a: 1
  }, {
    a: (option, optionType, paths) => {
      return optionType === 'number';
    }
  })

  expect(() => {
    optionValidator({
      // a: 1
    }, {
      a: (option, optionType, paths) => {
        return optionType === 'number';
      }
    })
  }).toThrowError(/Validator Error/);
});

test('Check Validator Child Deep', () => {
  optionValidator({
    a: {
      b: {
        c: 123,
        d: 'test',
        e: {
          f: () => null
        }
      }
    }
  }, {
    a: {
      b: {
        c: (option, optionType, paths) => {
          return optionType === 'number';
        },
        d: (option, optionType, paths) => {
          return optionType === 'string';
        },
        e: {
          f: (option, optionType, paths) => {
            return optionType === 'function';
          }
        }
      }
    }
  })
});

test('Check Validator Child Deep Array', () => {
  optionValidator({
    a: {
      b: {
        c: 123,
        d: 'test',
        e: {
          f: [1, '2', () => null]
        }
      }
    }
  }, {
    a: {
      b: {
        c: 'number',
        d: 'string',
        e: {
          f: [(option, optionType, paths) => {
            return optionType === 'number';
          }, (option, optionType, paths) => {
            return optionType === 'string';
          }, (option, optionType, paths) => {
            return optionType === 'function';
          }]
        }
      }
    }
  })
});