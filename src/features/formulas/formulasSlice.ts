import { createSelector, createSlice } from "@reduxjs/toolkit";
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
import UniversalQuant from "../../model/formula/Formula.UniversalQuant";
import { selectValuation } from "../variables/variablesSlice";

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

export const selectFormulas = (state: RootState) => state.formulas.allFormulas;
export const selectFormula = (state: RootState, id: number) =>
  state.formulas.allFormulas[id];

export const { add, remove, updateText, updateGuess } = formulasSlice.actions;

export const selectEvaluatedFormula = createSelector(
  [selectLanguage, selectStructure, selectFormula, selectValuation],
  (language, structure, form, valuation) => {
    const factories = {
      variable: (symbol: string, _ee: ErrorExpected) => new Variable(symbol),
      constant: (symbol: string, _ee: ErrorExpected) => new Constant(symbol),
      functionApplication: (
        symbol: string,
        args: Array<Term>,
        _ee: ErrorExpected
      ) => new FunctionTerm(symbol, args),
      predicateAtom: (symbol: string, args: Array<Term>, _ee: ErrorExpected) =>
        new PredicateAtom(symbol, args),
      equalityAtom: (lhs: Term, rhs: Term, _ee: ErrorExpected) =>
        new EqualityAtom(lhs, rhs),
      negation: (subf: Formula, _ee: ErrorExpected) => new Negation(subf),
      conjunction: (lhs: Formula, rhs: Formula, _ee: ErrorExpected) =>
        new Conjunction(lhs, rhs),
      disjunction: (lhs: Formula, rhs: Formula, _ee: ErrorExpected) =>
        new Disjunction(lhs, rhs),
      implication: (lhs: Formula, rhs: Formula, _ee: ErrorExpected) =>
        new Implication(lhs, rhs),
      equivalence: (lhs: Formula, rhs: Formula, _ee: ErrorExpected) =>
        new Equivalence(lhs, rhs),
      existentialQuant: (variable: string, subf: Formula, _ee: ErrorExpected) =>
        new ExistentialQuant(variable, subf),
      universalQuant: (variable: string, subf: Formula, _ee: ErrorExpected) =>
        new UniversalQuant(variable, subf),
    };

    console.log(language);
    console.log(structure);

    //let error = "";
    try {
      const formula = parseFormulaWithPrecedence(
        form.text,
        language.getParserLanguage(),
        factories
      );
      //error = formula.toString();

      const value = formula.eval(structure, valuation);
      return { evaluated: value };
    } catch (error) {
      if (error instanceof SyntaxError || error instanceof Error) {
        return { error: error };
      }
    }

    return {};
  }
);
export default formulasSlice.reducer;
