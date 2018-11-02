import optionValidator from '../index';
import { option, scheme } from './testData';

test('Shallow object', () => {
  optionValidator(option, scheme);
});
