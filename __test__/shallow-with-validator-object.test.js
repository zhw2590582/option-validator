import optionValidator from '..';
import { baseOption, baseRule} from './data';

test('Shallow with child object', () => {
  const baseRuleCopy = Object.assign({}, baseRule);
  const baseOptionCopy = Object.assign({}, baseOption);

  baseRuleCopy.typeString = {
    type: 'string',
    validator: (paths, optionValue, optionType) => {
      return optionValue.length === 3;
    }
  };

  const { errors } = new optionValidator(baseOptionCopy, baseRuleCopy);
  expect(errors.length).toBe(0);

  expect(() => {
    baseOptionCopy.typeString = 'string';
    new optionValidator(baseOptionCopy, baseRuleCopy);
  }).toThrow(/validator/);
});