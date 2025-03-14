import Structure, { Valuation } from "../Structure";
import Formula, { SignedFormula, SignedFormulaType } from "./Formula";
import Implication from "./Formula.Implication";

/**
 * Represent equality symbol
 * @author Richard Toth
 * @author Jozef Filip
 * @class
 * @extends Formula
 */
class Equivalence extends Formula {
  /**
   *
   * @param {Formula} subLeft
   * @param {Formula} subRight
   */
  constructor(public subLeft: Formula, public subRight: Formula) {
    super([subLeft, subRight], ", ");
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
    return left === right;
  }

  /**
   *
   * @returns {string}
   */
  toString(): string {
    return `(${this.subLeft.toString()} ↔ ${this.subRight.toString()})`;
  }

  getSubFormulas(): Formula[] {
    const toRightImpl = new Implication(this.subLeft, this.subRight);
    const toLeftImpl = new Implication(this.subRight, this.subLeft);
    return [toRightImpl, toLeftImpl];
  }

  getSignedType(sign: boolean): SignedFormulaType {
    return sign ? SignedFormulaType.ALPHA : SignedFormulaType.BETA;
  }
  getSignedSubFormulas(sign: boolean): SignedFormula[] {
    const toRightImpl = new Implication(this.subLeft, this.subRight);
    const toLeftImpl = new Implication(this.subRight, this.subLeft);

    return [
      { sign: sign, formula: toLeftImpl },
      { sign: sign, formula: toRightImpl },
    ];
  }

  //   createCopy() {
  //     return new Equivalence(
  //       this.subLeft.createCopy(),
  //       this.subRight.createCopy()
  //     );
  //   }

  //   substitute(from, to, bound) {
  //     return new Equivalence(
  //       this.subLeft.substitute(from, to, bound),
  //       this.subRight.substitute(from, to, bound)
  //     );
  //   }
}

export default Equivalence;
