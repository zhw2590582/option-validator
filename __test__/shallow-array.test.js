import optionValidator from '..';
import { option, scheme} from './testData';

test('Shallow array', () => {
  optionValidator([option], {
    type: 'array'
  });
});

test('Shallow array and child', () => {
  optionValidator([option], {
    type: 'array',
    child: scheme
  });
});
