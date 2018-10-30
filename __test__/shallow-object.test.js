import optionValidator from '..';
import { baseOption, baseRule} from './data';

test('Shallow object', () => {
  new optionValidator(baseOption, baseRule);
});