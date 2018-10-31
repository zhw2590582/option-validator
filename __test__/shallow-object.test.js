import optionValidator from '..';
import { option, scheme} from './testData';

test('Shallow object', () => {
  optionValidator(option, scheme);
});
