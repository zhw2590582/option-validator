import optionValidator from '..';
import { baseOption, baseRule} from './data';

test('Shallow array', () => {
  const baseRuleCopy = {
    type: 'array'
  };

  const baseOptionCopy = [baseOption];

  new optionValidator(baseOptionCopy, baseRuleCopy);
});