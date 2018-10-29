import optionValidator from '..';
import { baseOption, baseRule} from './data';

test('Shallow array', () => {
  const baseRuleCopy = {
    type: 'array'
  };

  const baseOptionCopy = [baseOption];

  const { errors } = new optionValidator(baseOptionCopy, baseRuleCopy);
  expect(errors.length).toBe(0);
});