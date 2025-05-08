import Structure, { type Valuation } from "../Structure";
import Formula, { SignedFormulaType } from "./Formula";
import QuantifiedFormula from "./QuantifiedFormula";

/**
 * Represent existential quantificator
 * @author Milan Cifra
 * @author Jozef Filip
 * @class
 * @extends Formula
 */
class ExistentialQuant extends QuantifiedFormula {
  /**
   *
   * @param {string} variableName
   * @param {Formula} subFormula
   */
  constructor(public variableName: string, public subFormula: Formula) {
    super(variableName, subFormula, "∃");
  }

  /**
   *
   * @param {Structure} structure
   * @param {Map} e
   * @return {boolean}
   */
  eval(structure: Structure, e: Valuation): boolean {
    let eCopy = new Map(e);

    for (let item of structure.domain) {
      eCopy.set(this.variableName, item);
      try {
        if (this.subFormula.eval(structure, eCopy)) {
          return true;
        }
      } catch (error) {
        throw error;
      }
    }
    return false;
  }

  getSignedType(sign: boolean): SignedFormulaType {
    return sign ? SignedFormulaType.DELTA : SignedFormulaType.GAMMA;
  }

  // createCopy() {
  //   return new ExistentialQuant(
  //     this.variableName,
  //     this.subFormula.createCopy()
  //   );
  // }

  // substitute(from, to, bound) {
  //   if (this.variableName !== from) {
  //     return new ExistentialQuant(
  //       this.variableName,
  //       this.subFormula.substitute(
  //         from,
  //         to,
  //         new Set([this.variableName, ...(bound ?? [])])
  //       )
  //     );
  //   }
  //   return this.createCopy();
  // }
}

export default ExistentialQuant;
