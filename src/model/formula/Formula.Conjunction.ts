import Structure, { Valuation } from "../Structure";
import Formula, { SignedFormula, SignedFormulaType } from "./Formula";

/**
 * Represent conjunction
 * @author Milan Cifra
 * @author Jozef Filip
 * @class
 * @extends Formula
 */
class Conjunction extends Formula {
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
   * @param {Map} e variables valuation
   * @return {boolean}
   */
  eval(structure: Structure, e: Valuation): boolean {
    const left = this.subLeft.eval(structure, e);
    const right = this.subRight.eval(structure, e);
    return left && right;
  }

  /**
   *
   * @returns {string}
   */
  toString(): string {
    return `(${this.subLeft.toString()} ∧ ${this.subRight.toString()})`;
  }

  getSubFormulas() {
    return [this.subLeft, this.subRight];
  }

  getSignedType(sign: boolean): SignedFormulaType {
    return sign ? SignedFormulaType.BETA : SignedFormulaType.ALPHA;
  }
  getSignedSubFormulas(sign: boolean): SignedFormula[] {
    return [
      { sign: sign, formula: this.subLeft },
      { sign: sign, formula: this.subRight },
    ];
  }

  // createCopy() {
  //   return new Conjunction(
  //     this.subLeft.createCopy(),
  //     this.subRight.createCopy()
  //   );
  // }

  // substitute(from, to, bound) {
  //   return new Conjunction(
  //     this.subLeft.substitute(from, to, bound),
  //     this.subRight.substitute(from, to, bound)
  //   );
  // }
}

export default Conjunction;
