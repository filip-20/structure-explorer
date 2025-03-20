import Structure, { Valuation } from "../Structure";
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

  abstract getSignedSubFormulas(sign: boolean): SignedFormula[];

  toString(): string {
    return `${this.connective}${
      this.variableName
    } ${this.subFormula.toString()}`;
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
