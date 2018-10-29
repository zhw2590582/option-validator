import optionValidator from '..';
import { baseOption, baseRule} from './data';

test('Deep object', () => {
  const baseRuleCopy = Object.assign({}, baseRule, {
    type: 'object'
  })

  const deepOption = {
    level1: {
      ...baseOption,
      level2: {
        ...baseOption
      }
    }
  };

  const deepRule = {
    level1: {
      ...baseRuleCopy,
      level2: {
        ...baseRuleCopy
      }
    }
  }

  const { errors } = new optionValidator(deepOption, deepRule);
  expect(errors.length).toBe(0);
});