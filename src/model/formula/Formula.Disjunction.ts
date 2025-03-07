import Formula, { SignedFormula, SignedFormulaType } from "./Formula";
import Structure, { Valuation } from "../Structure";

/**
 * Represent disjunction
 * @author Milan Cifra
 * @author Jozef Filip
 * @class
 * @extends Formula
 */
class Disjunction extends Formula {
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
    return left || right;
  }

  /**
   *
   * @returns {string}
   */
  toString(): string {
    return `(${this.subLeft.toString()} ∨ ${this.subRight.toString()})`;
  }

  getSubFormulas() {
    return [this.subLeft, this.subRight];
  }

  getSignedType(sign: boolean): SignedFormulaType {
    throw new Error("Method not implemented.");
  }
  getSignedSubFormulas(sign: boolean): SignedFormula[] {
    throw new Error("Method not implemented.");
  }

  // createCopy() {
  //   return new Disjunction(
  //     this.subLeft.createCopy(),
  //     this.subRight.createCopy()
  //   );
  // }

  // substitute(from, to, bound) {
  //   return new Disjunction(
  //     this.subLeft.substitute(from, to, bound),
  //     this.subRight.substitute(from, to, bound)
  //   );
  // }
}

export default Disjunction;
