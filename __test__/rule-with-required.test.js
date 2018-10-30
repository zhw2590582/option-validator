import optionValidator from '..';
import { baseOption, baseRule } from './data';

test('Rule with required', () => {
  const baseRuleCopy = Object.assign({}, baseRule);
  const baseOptionCopy = Object.assign({}, baseOption);
  baseRuleCopy.typeBoolean = {
    type: 'boolean',
    required: true
  };

  delete baseOptionCopy.typeBoolean;
  expect(() => {
    new optionValidator(baseOptionCopy, baseRuleCopy);
  }).toThrow(/required/);
});
