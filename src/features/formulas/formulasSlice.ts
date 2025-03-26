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
import Formula, {
  SignedFormula,
  SignedFormulaType,
} from "../../model/formula/Formula";
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
  gameChoices: {
    choice: number;
    type: string;
  }[];
}

export interface FormulasState {
  allFormulas: FormulaState[];
}

const initialState: FormulasState = {
  allFormulas: [],
};

function newFormulaState() {
  return { text: "", guess: null, gameChoices: [] };
}

export const formulasSlice = createSlice({
  name: "formulas",
  initialState,
  reducers: {
    add: (state) => {
      state.allFormulas.push(newFormulaState());
    },

    addChoice: (
      state,
      action: PayloadAction<{ id: number; choice: number; type: string }>
    ) => {
      state.allFormulas[action.payload.id].gameChoices.push({
        choice: action.payload.choice,
        type: action.payload.type,
      });
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

export const selectFormulaChoices = (state: RootState, id: number) =>
  selectFormula(state, id).gameChoices;

export const selectFormulas = (state: RootState) => state.formulas.allFormulas;
export const selectFormula = (state: RootState, id: number) =>
  state.formulas.allFormulas[id];

export const { add, addChoice, remove, updateText, updateGuess } =
  formulasSlice.actions;

export const selectEvaluatedFormula = createSelector(
  [selectLanguage, selectStructure, selectFormula, selectValuation],
  (language, structure, form, valuation) => {
    const factories = {
      variable: (symbol: string, _ee: ErrorExpected) => new Variable(symbol),
      constant: (symbol: string, _ee: ErrorExpected) => new Constant(symbol),
      functionApplication: (
        symbol: string,
        args: Array<Term>,
        ee: ErrorExpected
      ) => {
        language.checkFunctionArity(symbol, args, ee);
        return new FunctionTerm(symbol, args);
      },
      predicateAtom: (symbol: string, args: Array<Term>, ee: ErrorExpected) => {
        language.checkPredicateArity(symbol, args, ee);
        return new PredicateAtom(symbol, args);
      },
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
      return { evaluated: value, formula: formula };
    } catch (error) {
      if (error instanceof Error) {
        return { error: error };
      }

      if (error instanceof SyntaxError) {
        return { error: error };
      }
    }

    return {};
  }
);

export const selectNextGameText = createSelector(
  [selectFormulaChoices, selectEvaluatedFormula],
  (choices, { formula }) => {
    if (choices.length === 0) {
      return `What is your initial assumption about the truth/satisfaction of the formula ${formula!.toString()} by the valuation 𝑒 in the structure ℳ?`;
    }
  }
);

export const selectCurrentGameFormula = createSelector(
  [selectFormulaChoices, selectEvaluatedFormula],
  (choices, { formula }) => {
    if (choices.length === 0) {
      return { sign: true, formula: formula! };
    }

    let newFormula: SignedFormula = { sign: true, formula: formula! };
    for (const { choice, type } of choices) {
      if (type === "init") {
        newFormula = { sign: choice === 0 ? true : false, formula: formula! };
        continue;
      }

      if (choice < 2) {
        const s = choice === 0 ? true : false;
        newFormula = newFormula.formula.getSignedSubFormulas(s)[choice];
      }
    }
    return newFormula;
  }
);

export const selectGameButtons = createSelector(
  [selectFormulaChoices, selectCurrentGameFormula],
  (choices, { sign, formula }) => {
    console.log(choices);
    if (choices.length === 0) {
      return { choices: ["true", "false"], type: "init" };
    }

    if (choices[0].type === "init") {
      return {
        choices: formula
          .getSignedSubFormulas(sign)
          .map((s) => s.formula.toString()),
        type: "mc",
      };
    }
  }
);

export const selectHistory = createSelector(
  [selectFormulaChoices, selectEvaluatedFormula],
  (choices, { formula }) => {
    if (choices.length === 0) {
      return [
        {
          text: `What is your initial assumption about the truth/satisfaction of the formula ${formula!.toString()} by the valuation 𝑒 in the structure ℳ?`,
          sender: "game",
        },
      ];
    }

    let bubbles: {
      text: string;
      sender: "game" | "player";
    }[] = [];

    let newFormula: SignedFormula = { sign: true, formula: formula! };
    let bubble: {
      text: string;
      sender: "game" | "player";
    };

    for (const { choice, type } of choices) {
      if (type === "init") {
        newFormula = { sign: choice === 0 ? true : false, formula: formula! };
        bubble = {
          text: `What is your initial assumption about the truth/satisfaction of the formula ${formula!.toString()} by the valuation 𝑒 in the structure ℳ?`,
          sender: "game",
        };
        bubbles.push(bubble);

        bubble = { text: choice === 0 ? "True" : "False", sender: "player" };
        bubbles.push(bubble);

        bubble = {
          text: `You assume that the formula ${formula!.toString()} is ${
            choice === 0 ? "True" : "False"
          }`,
          sender: "game",
        };
        bubbles.push(bubble);

        bubble = {
          text: `Which of the following is the case?:
          `,
          sender: "game",
        };
        bubbles.push(bubble);

        bubble = {
          text: `${newFormula.formula
            .getSignedSubFormulas(newFormula.sign)[0]
            .formula.toString()}
          is ${
            newFormula.formula.getSignedSubFormulas(newFormula.sign)[0].sign ===
            true
              ? "True"
              : "False"
          }`,
          sender: "game",
        };
        bubbles.push(bubble);
        bubble = {
          text: `${newFormula.formula
            .getSignedSubFormulas(newFormula.sign)[1]
            .formula.toString()}
          is ${
            newFormula.formula.getSignedSubFormulas(newFormula.sign)[1].sign ===
            true
              ? "True"
              : "False"
          }`,
          sender: "game",
        };
        bubbles.push(bubble);
        //TODO: pridat/upravit aby fungovalo vsobecne

        continue;
      }

      console.log(newFormula);

      if (choice < 2) {
        const s = choice === 0 ? true : false;
        bubble = {
          text: `Formula ${newFormula.formula
            .getSignedSubFormulas(newFormula.sign)
            [choice].formula.toString()}
          is ${
            newFormula.formula.getSignedSubFormulas(newFormula.sign)[choice]
              .sign === true
              ? "True"
              : "False"
          }`,
          sender: "player",
        };
        bubbles.push(bubble);

        bubble = {
          text: `You assume, that the formula ${newFormula.formula
            .getSignedSubFormulas(newFormula.sign)
            [choice].formula.toString()}
          is ${
            newFormula.formula.getSignedSubFormulas(newFormula.sign)[choice]
              .sign === true
              ? "True"
              : "False"
          }`,
          sender: "game",
        };
        bubbles.push(bubble);

        newFormula = newFormula.formula.getSignedSubFormulas(s)[choice];

        bubble = {
          text: `Which of the following is the case?:
          `,
          sender: "game",
        };
        bubbles.push(bubble);

        if (
          newFormula.formula
            .getSignedSubFormulas(newFormula.sign)
            .every(
              (signed) =>
                signed.formula.getSignedType(signed.sign) ===
                SignedFormulaType.ALPHA
            )
        ) {
          bubble = { text: "game choices unimplemented", sender: "game" };
          bubbles.push(bubble);
          break;
        }
        bubble = {
          text: `${newFormula.formula
            .getSignedSubFormulas(newFormula.sign)[0]
            .formula.toString()}
          is ${
            newFormula.formula.getSignedSubFormulas(newFormula.sign)[0].sign ===
            true
              ? "True"
              : "False"
          }`,
          sender: "game",
        };
        bubbles.push(bubble);
        bubble = {
          text: `${newFormula.formula
            .getSignedSubFormulas(newFormula.sign)[1]
            .formula.toString()}
          is ${
            newFormula.formula.getSignedSubFormulas(newFormula.sign)[1].sign ===
            true
              ? "True"
              : "False"
          }`,
          sender: "game",
        };
        bubbles.push(bubble);
      }
    }
    return bubbles;
  }
);

export default formulasSlice.reducer;
