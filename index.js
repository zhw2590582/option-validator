import kindOf from 'kind-of';

let path = ['option'];
export default function optionValidator(option, rule) {
  const rootType = kindOf(option);
  if (rootType === 'object') {
    verifyObject(option, rule);
  } else if (rootType === 'array') {
    verifyArray(option, rule);
  }
  return true;
}

function verifyObject(option, rule) {
  Object.keys(option).forEach(key => {
    const optionValue = option[key];
    const optionType = kindOf(optionValue);
    const ruleValue = rule[key];
    const ruleType = kindOf(ruleValue) === 'string' ? ruleValue : ruleValue.type;
    if (optionType !== ruleType) {
        throw new VerifyError('参数错误啦！！');
    }
  });
}

function verifyArray(option, rule) {
    //
}

class VerifyError extends Error {
  constructor(message, context) {
    super(message);
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, context || this.constructor);
    }
    this.name = 'verifyError';
  }
}
