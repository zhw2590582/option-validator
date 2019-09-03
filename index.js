import kindOf from 'kind-of';

const TYPE = Symbol('TYPE');
const VALIDATOR = Symbol('VALIDATOR');

function optionValidator(option, scheme, paths = ['option']) {
  scheme = formatScheme(scheme);
  checkType(option, scheme, paths);
  checkValidator(option, scheme, paths);
  checkChild(option, scheme, paths);
  return option;
}

export function checkChild(option, scheme, paths) {
  const schemeType = kindOf(scheme);
  const optionType = kindOf(option);

  if (schemeType === 'object' && optionType === 'object') {
    Object.keys(scheme).forEach(key => {
      const childOption = option[key];
      const childScheme = scheme[key];
      const childPath = paths.slice();
      childPath.push(key);
      checkType(childOption, childScheme, childPath);
      checkValidator(childOption, childScheme, childPath);
      optionValidator(childOption, childScheme, childPath);
    });
  }

  if (schemeType === 'array' && optionType === 'array') {
    option.forEach((_, key) => {
      const childOption = option[key];
      const childScheme = scheme[key] || scheme[0];
      const childPath = paths.slice();
      childPath.push(key);
      checkType(childOption, childScheme, childPath);
      checkValidator(childOption, childScheme, childPath);
      optionValidator(childOption, childScheme, childPath);
    });
  }
}

export function formatScheme(scheme) {
  const schemeType = kindOf(scheme);
  if (schemeType === 'string') {
    return {
      [TYPE]: scheme.trim().toLowerCase(),
    };
  } else if (schemeType === 'function') {
    return {
      [VALIDATOR]: scheme,
    };
  } else {
    return scheme;
  }
}

export function checkType(option, scheme, paths) {
  if (kindOf(scheme[TYPE]) !== 'string') return;
  const optionType = kindOf(option);
  let result = false;
  if (scheme[TYPE].indexOf('|') > -1) {
    result = scheme[TYPE].split('|')
      .filter(Boolean)
      .some(item => optionType === item.trim());
  } else {
    result = scheme[TYPE] === optionType;
  }
  if (!result) {
    throw new Error(`[Type Error]: '${paths.join('.')}' require '${scheme[TYPE]}' type, but got '${optionType}'`);
  }
}

export function checkValidator(option, scheme, paths) {
  if (kindOf(scheme[VALIDATOR]) !== 'function') return;
  const optionType = kindOf(option);
  const result = scheme[VALIDATOR](option, optionType, paths);
  if (result === true) return;
  const resultType = kindOf(result);
  if (resultType === 'string') {
    throw new Error(result);
  } else if (resultType === 'error') {
    throw result;
  } else {
    throw new Error(`[Validator Error]: The scheme for '${paths.join('.')}' validator require return true, but got '${result}'`);
  }
}

optionValidator.kindOf = kindOf;
export default optionValidator;
