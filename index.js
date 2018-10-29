import kindOf from 'kind-of';

export default class OptionValidator {
  constructor(option, rule, paths = ['option']) {
    this.errorState = [];
    this.verifyRoot(option, rule, paths);
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
    Object.keys(option).forEach(key => {
      const optionValue = option[key];
      const optionType = kindOf(optionValue);
      const ruleValue = rule[key];
      
      let ruleType;
      try {
        ruleType = kindOf(ruleValue) === 'string' ? ruleValue : ruleValue.type
      } catch (error) {
        
      }

      this.verifyRoot(optionValue, ruleValue, paths.concat(key));
      this.errorHandle(optionType === ruleType, `'${paths.join('.')}.${key}' require '${ruleType}' type, but got '${optionType}'`);
    });
  }

  verifyArray(option, rule, paths) {
    option.forEach((item, index) => {
      //
    });
  }

  errorHandle(condition, msg) {
    if (!condition) {
      this.errorState.push(new TypeError(msg));
    }
  }
}