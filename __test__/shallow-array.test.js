import optionValidator from '../index';
import { option, scheme } from './testData';

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

test('Shallow array and child with number', () => {
  optionValidator([1, 2, 3], {
    type: 'array',
    child: {
      type: 'number'
    }
  });
});
