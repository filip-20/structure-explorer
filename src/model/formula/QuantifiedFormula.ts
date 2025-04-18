import Structure, { DomainElement, Valuation } from "../Structure";
import Formula, { SignedFormula, SignedFormulaType } from "./Formula";
import { Symbol } from "../Language";

abstract class QuantifiedFormula extends Formula {
  constructor(
    public variableName: string,
    public subFormula: Formula,
    public connective: string
  ) {
    super([subFormula], connective);
  }

  abstract eval(structure: Structure, e: Valuation): boolean;

  abstract getSignedType(sign: boolean): SignedFormulaType;

  getSignedSubFormulas(sign: boolean): SignedFormula[] {
    return [{ sign: sign, formula: this.subFormula }];
  }

  toString(): string {
    return `${this.connective}${
      this.variableName
    } ${this.subFormula.toString()}`;
  }

  getVariableName(): string {
    return this.variableName;
  }

  winningElements(
    sign: boolean,
    structure: Structure,
    e: Valuation
  ): DomainElement[] {
    const signedFormula = this.getSignedSubFormulas(sign)[0];

    let cpy = new Map(e);

    let winning: DomainElement[] = [];

    for (const element of structure.domain) {
      cpy.set(this.variableName, element);
      if (signedFormula.formula.eval(structure, cpy) !== signedFormula.sign) {
        winning.push(element);
      }
    }

    return winning;
  }

  getVariables(): Set<Symbol> {
    let variables = this.subFormula.getVariables();
    variables.add(this.variableName);
    return variables;
  }

  getSubFormulas(): Formula[] {
    return [this.subFormula];
  }
}

export default QuantifiedFormula;
