import Term from "./Term";

/**
 * Variable
 * @author Milan Cifra
 * @class
 * @extends Term
 */
class Variable extends Term {

  /**
   *
   * @param {string} name
   */
  constructor(name) {
    super();
    this.name = name;
  }

  /**
   * Return intepretation of variable.
   * @param {Structure} structure
   * @param {Map} e variables valuation
   * @return {string} domain item
   */
  eval(structure, e) {
    if (!e.has(this.name)) {
      throw `The variable ${this.name} is free,
        but it is not assigned any value by the variable assignment 𝑒.`;
    }
    return e.get(this.name);
  }

  /**
   * Return string representation of variable
   * @returns {string}
   */
  toString() {
    return this.name;
  }

  createCopy(){
    return new Variable(this.name);
  }

  substitute(from, to, bound){
    if (this.name === from) {
      if (bound && bound.has(to)) {
        throw `The variable ${to} cannot be substituted
          for the variable ${this.name} occuring
          in the scope of a quantifier that binds ${to}.`;
      }
      return new Variable(to);
    }
    return this.createCopy();
  }

  getVariables(){
    return [this.name];
  }
}

export default Variable;