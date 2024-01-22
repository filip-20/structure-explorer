import React from "react";
import { SymbolWithArity } from '@fmfi-uk-1-ain-412/js-fol-parser';

export interface Formula {
  name: string,
  formula: string,
}

export interface LogicContext {
  constants: Array<string>,
  predicates: Array<SymbolWithArity>,
  functions: Array<SymbolWithArity>,

  formulas: Array<Formula>,
  axioms: Array<Formula>,
  theorems: Array<Formula>,

  getFormula: (name: string) => { type: 'axiom' | 'theorem' | 'formula', formula: Formula } | undefined
}

export interface CellContext extends LogicContext {
  isConstant: (symbol: string) => boolean,
  isPredicate: (symbol: string) => boolean,
  isFunction: (symbol: string) => boolean,
  isVariable: (symbol: string) => boolean,
  symbolExits: (symbol: string) => boolean,
  symbolArity: (symbol: string) => number,
}

export const LogicContext = React.createContext<CellContext | undefined>(undefined)