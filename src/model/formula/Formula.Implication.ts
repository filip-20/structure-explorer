import Structure, { Valuation } from "../Structure";
import Formula, { SignedFormula, SignedFormulaType } from "./Formula";

/**
 * Represent implication
 * @author Milan Cifra
 * @author Jozef Filip
 * @class
 * @extends Formula
 */
class Implication extends Formula {
  /**
   *
   * @param {Formula} subLeft
   * @param {Formula} subRight
   */

  constructor(public subLeft: Formula, public subRight: Formula) {
    super([subLeft, subRight], ", ");
    this.subLeft = subLeft;
    this.subRight = subRight;
  }

  /**
   *
   * @param {Structure} structure
   * @param {Map} e
   * @return {boolean}
   */
  eval(structure: Structure, e: Valuation): boolean {
    const left = this.subLeft.eval(structure, e);
    const right = this.subRight.eval(structure, e);
    return !left || right;
  }

  /**
   *
   * @returns {string}
   */
  toString(): string {
    return `(${this.subLeft.toString()} → ${this.subRight.toString()})`;
  }

  getSubFormulas(): Formula[] {
    return [this.subLeft, this.subRight];
  }

  getSignedType(sign: boolean): SignedFormulaType {
    throw new Error("Method not implemented.");
  }
  getSignedSubFormulas(sign: boolean): SignedFormula[] {
    throw new Error("Method not implemented.");
  }

  // createCopy() {
  //   let subLeft = this.subLeft.createCopy();
  //   let subRight = this.subRight.createCopy();
  //   return new Implication(subLeft, subRight);
  // }

  // substitute(from, to, bound) {
  //   return new Implication(
  //     this.subLeft.substitute(from, to, bound),
  //     this.subRight.substitute(from, to, bound)
  //   );
  // }
}

export default Implication;
