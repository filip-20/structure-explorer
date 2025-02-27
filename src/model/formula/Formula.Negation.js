import Formula from "./Formula";
import {GAME_OPERATOR} from "../../constants/gameConstants";

/**
 * Represent negation
 * @author Milan Cifra
 * @class
 * @extends Formula
 */
class Negation extends Formula {

  /**
   *
   * @param {Formula} subFormula
   */
  constructor(subFormula) {
    super();
    this.subFormula = subFormula;
  }

  /**
   *
   * @param {Structure} structure
   * @param {Map} e
   * @return {boolean}
   */
  eval(structure, e) {
    return !this.subFormula.eval(structure, e);
  }

  /**
   *
   * @returns {string}
   */
  toString() {
    return `¬${this.subFormula.toString()}`;
  }

  createCopy(){
    return new Negation(this.subFormula.createCopy());
  }

  getType(commitment){
    return GAME_OPERATOR;
  }

  getSubFormulas(){
    return [this.subFormula];
  }

  substitute(from, to, bound){
    return new Negation(this.subFormula.substitute(from, to, bound));
  }

  getSubFormulasCommitment(commitment){
    return [!commitment];
  }

  getVariables(){
    return this.subFormula.getVariables();
  }
}

export default Negation;