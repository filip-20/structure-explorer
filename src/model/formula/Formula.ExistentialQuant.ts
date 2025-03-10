import { Symbol } from "../Language";
import Structure, { Valuation } from "../Structure";
import Formula, { SignedFormula, SignedFormulaType } from "./Formula";

/**
 * Represent existential quantificator
 * @author Milan Cifra
 * @author Jozef Filip
 * @class
 * @extends Formula
 */
class ExistentialQuant extends Formula {
  /**
   *
   * @param {string} variableName
   * @param {Formula} subFormula
   */
  constructor(public variableName: string, public subFormula: Formula) {
    super([subFormula], ", ");
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
      if (this.subFormula.eval(structure, eCopy)) {
        return true;
      }
    }
    return false;
  }

  /**
   *
   * @returns {string}
   */
  toString(): string {
    return `∃${this.variableName} ${this.subFormula.toString()}`;
  }

  getSubFormulas(): Formula[] {
    return [this.subFormula];
  }

  getVariables(): Set<Symbol> {
    let variables = this.subFormula.getVariables();
    variables.add(this.variableName);
    return variables;
  }

  getSignedType(sign: boolean): SignedFormulaType {
    return sign ? SignedFormulaType.GAMMA : SignedFormulaType.DELTA;
  }
  getSignedSubFormulas(sign: boolean): SignedFormula[] {
    return [{ sign: sign, formula: this.subFormula }];
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
