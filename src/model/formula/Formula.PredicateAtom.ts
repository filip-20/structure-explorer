import Formula, { SignedFormula, SignedFormulaType } from "./Formula";
import Term from "../term/Term";
import Structure, { Valuation } from "../Structure";

/**
 * Represent predicate symbol
 * @author Milan Cifra
 * @author Jozef Filip
 * @class
 * @extends Formula
 */
class PredicateAtom extends Formula {
  /**
   *
   * @param {string} name
   * @param {Term[]} terms
   */
  constructor(public name: string, public terms: Term[] = []) {
    super([], ", ");
  }

  /**
   *
   * @param {Structure} structure
   * @param {Map} e
   * @return {boolean}
   */
  eval(structure: Structure, e: Valuation): boolean {
    let translatedTerms: string[] = [];
    this.terms.forEach((term) => {
      translatedTerms.push(term.eval(structure, e));
    });

    const interpretation = structure.iP.get(this.name);

    if (interpretation === undefined) {
      throw new Error(
        `The interpretation of the predicate symbol ${this.name} is not defined`
      );
    }

    return interpretation.has(translatedTerms);
  }

  /**
   *
   * @returns {string}
   */
  toString(): string {
    return `${this.name}(${this.terms.join(", ")})`;
  }

  getSubFormulas(): Formula[] {
    return [];
  }

  getSignedType(_: boolean): SignedFormulaType {
    return SignedFormulaType.ALPHA;
  }
  getSignedSubFormulas(_: boolean): SignedFormula[] {
    return [];
  }

  // createCopy(): PredicateAtom {
  //   return new PredicateAtom(
  //     this.name,
  //     this.terms.map((term) => term.createCopy())
  //   );
  // }

  // substitute(from, to, bound) {
  //   return new PredicateAtom(
  //     this.name,
  //     this.terms.map((term) => term.substitute(from, to, bound))
  //   );
  // }
}

export default PredicateAtom;
