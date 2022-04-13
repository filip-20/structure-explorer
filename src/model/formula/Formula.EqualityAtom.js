import Formula from "./Formula";
import {ATOM} from "../../constants/gameConstants";

/**
 * Represent equality symbol
 * @author Milan Cifra
 * @class
 * @extends Formula
 */
class EqualityAtom extends Formula {

  /**
   *
   * @param {Term} subLeft
   * @param {Term} subRight
   */
  constructor(subLeft, subRight) {
    super();
    this.subLeft = subLeft;
    this.subRight = subRight;
  }

  /**
   *
   * @param {Structure} structure
   * @param {Map} e
   * @return {boolean}
   */
  eval(structure, e) {
    return this.subLeft.eval(structure, e) == this.subRight.eval(structure, e);
  }

  /**
   *
   * @returns {string}
   */
  toString() {
    return `(${this.subLeft.toString()} = ${this.subRight.toString()})`;
  }

  createCopy(){
    return new EqualityAtom(this.subLeft.createCopy(), this.subRight.createCopy());
  }

  getType(commitment){
    return ATOM;
  }

  getSubFormulas(){
    return [];
  }

  substitute(from, to, bound){
    return new EqualityAtom(this.subLeft.substitute(from, to, bound), this.subRight.substitute(from, to, bound));
  }

  getSubFormulasCommitment(commitment){
    return [];
  }

  getVariables(){
    return this.subLeft.getVariables().concat(this.subRight.getVariables());;
  }
}

export default EqualityAtom;