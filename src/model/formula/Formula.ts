import Expression from "../Expression";
import { Symbol } from "../Language";
import { Structure, Valuation } from "../Structure";

export enum SignedFormulaType {
  ALPHA = "alpha",
  BETA = "beta",
  GAMMA = "gamma",
  DELTA = "delta",
}

export type SignedFormula = {
  sign: boolean;
  formula: Formula;
};

/**
 * Represent simple formula
 * @author Milan Cifra
 * @author Jozef Filip
 * @class
 * @abstract
 * @extends Expression
 */
abstract class Formula extends Expression {
  constructor(protected subFormulas: Formula[], protected connective: string) {
    super();
  }

  getSubFormulas(): Formula[] {
    return this.subFormulas;
  }

  toString(): string {
    return `(${this.getSubFormulas().join(this.connective)})`;
  }

  abstract eval(structure: Structure, e: Valuation): boolean;

  getVariables(): Set<Symbol> {
    const vars: Set<Symbol> = new Set();
    this.subFormulas.forEach((formula) =>
      formula.getVariables().forEach((variable) => vars.add(variable))
    );
    return vars;
  }

  abstract getSignedType(sign: boolean): SignedFormulaType;

  abstract getSignedSubFormulas(sign: boolean): SignedFormula[];
}

export default Formula;
