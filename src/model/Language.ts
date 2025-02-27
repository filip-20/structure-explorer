/**
 * Represent language of logic
 * @author Milan Cifra
 * @class
 */
class Language {
  constants: Set<never>;
  functions: Map<never, number>;
  predicates: Map<never, number>;
  constructor(
    parsedConstants = [],
    parsedFunctions = [],
    parsedPredicates = []
  ) {
    this.constants = new Set(parsedConstants);
    this.functions = new Map(
      parsedFunctions.map(({ name, arity }) => [name, parseInt(arity)])
    );
    this.predicates = new Map(
      parsedPredicates.map(({ name, arity }) => [name, parseInt(arity)])
    );
  }

  /**
   *
   * These functions are temporarly here until the grammar changes
   *
   *
   */

  getLanguage() {
    let nonLogicalSymbols = new Set([
      ...this.constants,
      ...this.functions.keys(),
      ...this.predicates.keys(),
    ]);
    return {
      isConstant: (symbol: any) => this.constants.has(symbol),
      isFunction: (symbol: any) => this.functions.has(symbol),
      isPredicate: (symbol: any) => this.predicates.has(symbol),
      isVariable: (symbol: any) => !nonLogicalSymbols.has(symbol),
    };
  }

  checkFunctionArity(
    symbol: any,
    args: string | any[],
    ee: { expected: (arg0: string) => void }
  ) {
    const a = this.functions.get(symbol);
    if (args.length !== a) {
      ee.expected(`${a} argument${a == 1 ? "" : "s"} to ${symbol}`);
    }
  }

  checkPredicateArity(
    symbol: any,
    args: string | any[],
    ee: { expected: (arg0: string) => void }
  ) {
    const a = this.predicates.get(symbol);
    if (args.length !== a) {
      ee.expected(`${a} argument${a == 1 ? "" : "s"} to ${symbol}`);
    }
  }

  hasConstant(constantName: any) {
    return this.constants.has(constantName);
  }

  hasPredicate(predicateName: any) {
    return this.hasInSet(predicateName, this.predicates);
  }

  hasFunction(functionName: any) {
    return this.hasInSet(functionName, this.functions);
  }

  hasInSet(elementName: string, givenSet: Map<never, number>) {
    let splited = elementName.split("/");
    if (splited.length !== 2) {
      return givenSet.has(splited[0]);
    }
    if (isNaN(parseInt(splited[1]))) {
      return false;
    }
    return (
      givenSet.has(splited[0]) &&
      givenSet.get(splited[0]).toString() === splited[1].toString()
    );
  }

  /**
   * Return arity of the predicate
   * @param {string} predicateName
   * @return {int} arity of the predicate
   */
  getPredicate(predicateName: any) {
    return parseInt(this.predicates.get(predicateName));
  }
}

export default Language;
