import optionValidator from '..';
import { baseOption, baseRule} from './data';

test('Shallow with child object', () => {
  const baseRuleCopy = Object.assign({}, baseRule);
  const baseOptionCopy = Object.assign({}, baseOption);
  
  baseRuleCopy.typeObject = {
    type: 'object',
    child: {
      ...baseRule
    }
  };

  baseOptionCopy.typeObject = {
    ...baseOption
  }

  const { errors } = new optionValidator(baseOptionCopy, baseRuleCopy);
  expect(errors.length).toBe(0);
});