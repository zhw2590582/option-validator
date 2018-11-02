import kindOf from 'kind-of';

function optionValidator(option, scheme, paths = ['option']) {
  checkType(option, scheme, paths);
  checkValidator(option, scheme, paths);
  checkChild(option, scheme, paths);

  for (const key in scheme) {
    if (scheme.hasOwnProperty(key)) {
      const optionValue = option[key];
      const schemeValue = scheme[key];
      const currentPath = paths.concat(key);
      if (checkRequired(option, key, schemeValue, currentPath)) continue;
      checkType(optionValue, schemeValue, currentPath);
      checkValidator(optionValue, schemeValue, currentPath);
      checkChild(optionValue, schemeValue, currentPath);
    }
  }
}

function checkRequired(option, key, schemeValue, paths) {
  if (!Object.prototype.hasOwnProperty.call(option, key)) {
    if (schemeValue.__required__ === true || schemeValue.required === true) {
      throw new TypeError(`'${paths.join('.')}' is required`);
    } else {
      return true;
    }
  }
}

function checkType(optionValue, schemeValue, paths) {
  let schemeType;
  if (kindOf(schemeValue) === 'string') {
    schemeType = schemeValue;
  } else if (schemeValue.__type__) {
    schemeType = schemeValue.__type__;
  } else if (schemeValue.type) {
    schemeType = schemeValue.type;
  }

  if (schemeType && kindOf(schemeType) === 'string') {
    schemeType = schemeType.trim().toLowerCase();
    const optionType = kindOf(optionValue);
    let resule = optionType === schemeType;
    if (schemeType.indexOf('|') > -1) {
      const schemeTypes = schemeType.split('|');
      resule = schemeTypes.some(item => optionType === item);
    }

    if (!resule) {
      throw new TypeError(`'${paths.join('.')}' require '${schemeType}' type, but got '${optionType}'`);
    }
  }
}

function checkValidator(optionValue, schemeValue, paths) {
  let schemeValidator;
  if (schemeValue.___validator__) {
    schemeValidator = schemeValue.___validator__;
  } else if (schemeValue.validator) {
    schemeValidator = schemeValue.validator;
  }

  if (kindOf(schemeValidator) === 'function') {
    const optionType = kindOf(optionValue);
    const resule = schemeValidator(paths, optionValue, optionType);
    if (resule !== true) {
      throw new TypeError(`The scheme for '${paths.join('.')}' validator function require return true, but got '${resule}'`);
    }
  }
}

function checkChild(optionValue, schemeValue, paths) {
  let schemeChild;
  if (schemeValue.___child__) {
    schemeChild = schemeValue.___child__;
  } else if (schemeValue.child) {
    schemeChild = schemeValue.child;
  }

  if (kindOf(schemeChild) === 'object') {
    const optionType = kindOf(optionValue);
    if (optionType === 'object') {
      optionValidator(optionValue, schemeChild, paths);
    } else if (optionType === 'array') {
      optionValue.forEach((item, index) => {
        optionValidator(item, schemeChild, paths.concat(index));
      });
    }
  }
}

optionValidator.kindOf = kindOf;
window.optionValidator = optionValidator;
export default optionValidator;
