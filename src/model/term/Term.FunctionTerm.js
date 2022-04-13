import Term from "./Term";

/**
 * Represent function term
 * @author Milan Cifra
 * @class
 * @extends Term
 */
class FunctionTerm extends Term {

  /**
   *
   * @param {string} name name of the function
   * @param {Term[]} terms parameters of function
   */
  constructor(name, terms) {
    super();
    this.name = name;
    this.terms = terms;
  }

  /**
   * Return intepretation of function.
   * @param {Structure} structure
   * @param {Map} e variables valuation
   * @returns {string} domain item
   */
  eval(structure, e) {
    let interpretedParams = [];
    this.terms.forEach(term => {
      interpretedParams.push(term.eval(structure, e));
    });
    if (!structure.iFunction.get(this.name + '/' + structure.language.functions.get(this.name))[JSON.stringify(interpretedParams)]) {
      throw `Interpretácia funkčného symbolu ${this.name} pre ${interpretedParams.length > 1 ? `(${interpretedParams})` : interpretedParams} nie je definovaná`;
    }
    return structure.iFunction.get(this.name + '/' + structure.language.functions.get(this.name))[JSON.stringify(interpretedParams)];
  }

  /**
   * Return string representation of function term
   * @returns {string}
   */
  toString() {
    let res = this.name + '(';
    for (let i = 0; i < this.terms.length; i++) {
      if (i > 0) {
        res += ', ';
      }
      res += this.terms[i].toString();
    }
    res += ')';
    return res;
  }

  createCopy(){
    return new FunctionTerm(this.name, this.terms.map( (term) => term.createCopy() ));
  }

  substitute(from, to, bound){
    return new FunctionTerm(this.name, this.terms.map( (term) => term.substitute(from, to, bound) ));
  }

  getVariables(){
    return this.terms.flatMap(term => term.getVariables());
  }
}

export default FunctionTerm;