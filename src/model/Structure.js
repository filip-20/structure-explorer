import {EMPTY_CONSTANT_VALUE} from "../constants/messages";

/**
 * Represent components_parts
 * @author Milan Cifra
 * @class
 */
class Structure {

  /**
   *
   * @param {Language} language
   */

  constructor(language, parsedDomain, constants,
              predicates, functions) {
    this.language = language;
    this.domain = new Set();
    this.iConstant = new Map();
    this.iPredicate = new Map();
    this.iFunction = new Map();
    parsedDomain.forEach(i => {
      this.domain.add(i);
    });
    this.language.constants.forEach(c => {
      this.iConstant.set(c, constants[c].value);
    });

    this.language.functions.forEach((arity, name) => {
      let functionName = name + "/" + arity;
      this.iFunction.set(functionName, {});
      if(functions[functionName] === undefined){
        return;
      }
      functions[functionName].parsed.forEach(tuple => {
        let params = tuple.slice(0, tuple.length - 1);
        let value = tuple[tuple.length - 1];
        this.iFunction.get(functionName)[JSON.stringify(params)] = value;
      });
    });

    this.language.predicates.forEach((arity, name) => {
      let predicateName = name + "/" + arity;
      this.iPredicate.set(predicateName, []);
      if(predicates[predicateName] === undefined){
        return;
      }
      predicates[predicateName].parsed.forEach(tuple => {
        this.iPredicate.get(predicateName).push(tuple);
      });
    });
  }
}

export default Structure;