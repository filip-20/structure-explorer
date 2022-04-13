/**
 * Represent expression in logic
 * @author Milan Cifra
 * @class
 * @abstract
 */
class Expression {

  /*constructor() {

  }*/

  toString() {

  }

  eval(_structure, _e) {
    return null;
  }

  substitute(_from, _to, _bound) {
    //nothing
  }

  getVariables(){
    return [];
  }
}

export default Expression;