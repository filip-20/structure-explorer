import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import Constant from "../../model/term/Term.Constant";
import Variable from "../../model/term/Term.Variable";
import {
  ErrorExpected,
  parseFormulaWithPrecedence,
  SyntaxError,
} from "@fmfi-uk-1-ain-412/js-fol-parser";
import Formula from "../../model/formula/Formula";
import Term from "../../model/term/Term";
import FunctionTerm from "../../model/term/Term.FunctionTerm";
import PredicateAtom from "../../model/formula/Formula.PredicateAtom";
import EqualityAtom from "../../model/formula/Formula.EqualityAtom";
import Negation from "../../model/formula/Formula.Negation";
import Conjunction from "../../model/formula/Formula.Conjunction";
import Disjunction from "../../model/formula/Formula.Disjunction";
import Implication from "../../model/formula/Formula.Implication";
import Equivalence from "../../model/formula/Formula.Equivalence";
import ExistentialQuant from "../../model/formula/Formula.ExistentialQuant";
import { selectLanguage } from "../language/languageSlice";
import { selectStructure } from "../structure/structureSlice";

export interface FormulaState {
  text: string;
  guess: boolean | null;
}

export interface FormulasState {
  allFormulas: FormulaState[];
}

const initialState: FormulasState = {
  allFormulas: [],
};

function newFormulaState() {
  return { text: "", guess: null };
}

export const formulasSlice = createSlice({
  name: "formulas",
  initialState,
  reducers: {
    add: (state) => {
      state.allFormulas.push(newFormulaState());
    },
    remove: (state, action: PayloadAction<number>) => {
      state.allFormulas.splice(action.payload, 1);
    },

    updateText: (
      state,
      action: PayloadAction<{ id: number; text: string }>
    ) => {
      state.allFormulas[action.payload.id].text = action.payload.text;
    },

    updateGuess: (
      state,
      action: PayloadAction<{ id: number; guess: boolean | null }>
    ) => {
      state.allFormulas[action.payload.id].guess = action.payload.guess;
    },
  },
});

export const { add, remove, updateText, updateGuess } = formulasSlice.actions;

export const selectFormulaError = (state: RootState, id: number) => {
  //TODO FIX
  const language = selectLanguage(state);
  const structure = selectStructure(state);

  const factories = {
    variable: (symbol: string, ee: ErrorExpected) => new Variable(symbol),
    constant: (symbol: string, ee: ErrorExpected) => new Constant(symbol),
    functionApplication: (
      symbol: string,
      args: Array<Term>,
      ee: ErrorExpected
    ) => new FunctionTerm(symbol, args),
    predicateAtom: (symbol: string, args: Array<Term>, ee: ErrorExpected) =>
      new PredicateAtom(symbol, args),
    equalityAtom: (lhs: Term, rhs: Term, ee: ErrorExpected) =>
      new EqualityAtom(lhs, rhs),
    negation: (subf: Formula, ee: ErrorExpected) => new Negation(subf),
    conjunction: (lhs: Formula, rhs: Formula, ee: ErrorExpected) =>
      new Conjunction(lhs, rhs),
    disjunction: (lhs: Formula, rhs: Formula, ee: ErrorExpected) =>
      new Disjunction(lhs, rhs),
    implication: (lhs: Formula, rhs: Formula, ee: ErrorExpected) =>
      new Implication(lhs, rhs),
    equivalence: (lhs: Formula, rhs: Formula, ee: ErrorExpected) =>
      new Equivalence(lhs, rhs),
    existentialQuant: (variable: string, subf: Formula, ee: ErrorExpected) =>
      new ExistentialQuant(variable, subf),
    universalQuant: (variable: string, subf: Formula, ee: ErrorExpected) =>
      new ExistentialQuant(variable, subf),
  };

  console.log(language);
  console.log(structure);

  let error = "";
  try {
    const formula = parseFormulaWithPrecedence(
      state.formulas.allFormulas[id].text,
      language.getParserLanguage(),
      factories
    );
    error = formula.toString();

    const value = formula.eval(structure, new Map());
    return { string: error, f: value };
  } catch (error) {
    if (error instanceof SyntaxError || error instanceof Error) {
      return { string: error.message, f: false };
    }
  }

  return { string: error, f: false };
};

export default formulasSlice.reducer;
export const selectFormulas = (state: RootState) => state.formulas.allFormulas;
