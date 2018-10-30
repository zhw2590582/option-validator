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

  new optionValidator(baseOptionCopy, baseRuleCopy);
});