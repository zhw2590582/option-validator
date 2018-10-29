import optionValidator from '..';
import { baseOption, baseRule} from './data';

test('Shallow object', () => {
  const { errors } = new optionValidator(baseOption, baseRule);
  expect(errors.length).toBe(0);
});