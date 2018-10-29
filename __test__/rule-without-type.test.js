import optionValidator from '..';
import { baseOption, baseRule } from './data';

test('Rule without type', () => {
  const baseRuleCopy = Object.assign({}, baseRule);
  baseRuleCopy.typeUndefined = {};
  expect(() => {
    const { errors } = new optionValidator(baseOption, baseRuleCopy);
  }).toThrow(/type/);
});
