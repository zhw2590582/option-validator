import optionValidator from '..';
import { baseOption, baseRule} from './data';

test('Deep array', () => {
  const baseRuleCopy = Object.assign({}, baseRule, {
    type: 'object'
  })

  const deepOption = {
    level1: [
      [
        baseOption
      ]
    ]
  };

  const deepRule = {
    level1: {
      type: 'array',
      child: {
        type: 'array',
        child: baseRule
      }
    }
  }

  const { errors } = new optionValidator(deepOption, deepRule);
  expect(errors.length).toBe(0);
});
