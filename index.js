import kindOf from 'kind-of';

export default class OptionValidator {
  constructor(option, rule, paths = ['option']) {
    this.errors = [];
    this.verifyRoot(option, rule, paths);
    this.errors.forEach(msg => {
      this.errorHandle(false, msg);
    });
  }

  verifyRoot(option, rule, paths) {
    const rootType = kindOf(option);
    if (rootType === 'object') {
      this.verifyObject(option, rule, paths);
    } else if (rootType === 'array') {
      // this.verifyArray(option, rule, paths);
    }
  }

  verifyObject(option, rule, paths) {
    Object.keys(rule).forEach(key => {
      const optionValue = option[key];
      const optionType = kindOf(optionValue);
      const ruleValue = rule[key];

      if (!ruleValue) {
        return;
      }

      let ruleType;
      if (kindOf(ruleValue) === 'string') {
        ruleType = ruleValue;
      } else if (ruleValue.__type__) {
        ruleType = ruleValue.__type__;
      } else if (ruleValue.type) {
        ruleType = ruleValue.type;
      } else {
        this.errorHandle(false, `The rule for '${paths.join('.')}.${key}' seems to be missing the 'type' or '__type__' option`);
      }

      this.verifyRoot(optionValue, ruleValue, paths.concat(key));

      if (ruleValue.__required__ === true || ruleValue.required === true) {
        this.pushError(Object.prototype.hasOwnProperty.call(option, key), `'${paths.join('.')}.${key}' is required`);
      }

      this.pushError(optionType === ruleType, `'${paths.join('.')}.${key}' require '${ruleType}' type, but got '${optionType}'`);
    });
  }

  verifyArray(option, rule, paths) {
    option.forEach((item, index) => {
      //
    });
  }

  pushError(condition, msg) {
    if (!condition) {
      this.errors.push(msg);
    }
  }

  errorHandle(condition, msg) {
    if (!condition) {
      throw new TypeError(msg);
    }
  }
}