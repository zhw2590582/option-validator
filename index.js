import kindOf from 'kind-of';

export default function optionValidator(option, rule, paths = ['option']) {
  const rootType = kindOf(option);
  if (rootType === 'object') {
    verifyObject(option, rule, paths);
  } else if (rootType === 'array') {
    verifyArray(option, rule, paths);
  }
}

function verifyObject(option, rule, paths) {
  Object.keys(option).forEach(key => {
    const optionValue = option[key];
    const optionType = kindOf(optionValue);
    const ruleValue = rule[key];
    const ruleType = kindOf(ruleValue) === 'string' ? ruleValue : ruleValue.type;
    optionValidator(optionValue, ruleValue, paths.concat(key));
    errorHandle(optionType === ruleType, `'${paths.join('.')}.${key}' require '${ruleType}' type, but got '${optionType}'`);
  });
}

function verifyArray(option, rule, paths) {
  option.forEach((item, index) => {
    const optionValue = option[key];
    const optionType = kindOf(optionValue);
    const ruleValue = rule[key];
    const ruleType = kindOf(ruleValue) === 'string' ? ruleValue : ruleValue.type;
    optionValidator(optionValue, ruleValue, paths.concat(`${key}[${index}]`));
  });
}

function errorHandle(condition, msg) {
  if (!condition) {
    throw new TypeError(msg);
  }
}
