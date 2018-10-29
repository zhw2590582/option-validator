import kindOf from 'kind-of';

export default class OptionValidator {
  constructor(option, rule, paths = ['option']) {
    this.errors = [];
    this.verifyRule(option, rule, paths);
  }

  verifyRule(option, rule, paths) {
    Object.keys(rule).forEach(key => {
      const optionValue = option[key];
      const optionType = kindOf(optionValue);
      const ruleValue = rule[key];

      if (!Object.prototype.hasOwnProperty.call(option, key)) {
        if (ruleValue.__required__ === true || ruleValue.required === true) {
          this.errors.push(`'${paths.join('.')}.${key}' is required`);
        }
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
        throw new TypeError(`The rule for '${paths.join('.')}.${key}' seems to be missing the 'type' or '__type__' option`);
      }

      if (optionType !== ruleType) {
        this.errors.push(`'${paths.join('.')}.${key}' require '${ruleType}' type, but got '${optionType}'`);
      }

      let ruleValidator;
      if (ruleValue.___validator__) {
        ruleValidator = ruleValue.___validator__;
      } else if (ruleValue.validator) {
        ruleValidator = ruleValue.validator;
      }

      if (kindOf(ruleValidator) === 'function') {
        const resule = ruleValidator(paths.concat(key), optionValue, optionType);
        if (resule !== true) {
          this.errors.push(`The rule for '${paths.join('.')}.${key}' validator function require return true, but got '${resule}'`);
        }
      }

      let ruleChild;
      if (ruleValue.___child__) {
        ruleChild = ruleValue.___child__;
      } else if (ruleValue.child) {
        ruleChild = ruleValue.child;
      }

      if (kindOf(ruleChild) === 'object') {
        if (ruleType === 'object') {
          this.verifyRule(optionValue, ruleChild, paths.concat(key));
        } else if (ruleType === 'array') {
          optionValue.forEach((item, index) => {
            this.verifyRule(item, ruleChild, paths.concat(`${key}[${index}]`));
          });
        }
      }
    });
  }
}