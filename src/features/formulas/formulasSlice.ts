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
import {
  selectDomain,
  selectParsedDomain,
  selectStructure,
} from "../structure/structureSlice";
import UniversalQuant from "../../model/formula/Formula.UniversalQuant";
import { selectValuation } from "../variables/variablesSlice";
import { text } from "@fortawesome/fontawesome-svg-core";
import { useSelector } from "react-redux";
import QuantifiedFormula from "../../model/formula/QuantifiedFormula";
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

export const { add, addChoice, remove, updateText, updateGuess } =
  formulasSlice.actions;

export const selectFormulaGuess = (state: RootState, id: number) =>
  selectFormula(state, id).guess;

export const selectFormulaChoices = (state: RootState, id: number) =>
  selectFormula(state, id).gameChoices;

export const selectFormulas = (state: RootState) => state.formulas.allFormulas;
export const selectFormula = (state: RootState, id: number) =>
  state.formulas.allFormulas[id];

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

    //console.log(language);
    //console.log(structure);

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

export const selectCurrentGameFormula = createSelector(
  [selectFormulaChoices, selectEvaluatedFormula, selectFormulaGuess],
  (choices, { formula }, userGuess): SignedFormula => {
    let newFormula: SignedFormula = { sign: userGuess!, formula: formula! };

    for (const { choice, type } of choices) {
      if (type === "continue" || type == "unimplemented") {
        continue;
      }

      if (
        newFormula.formula.getSignedSubFormulas(newFormula.sign).length === 0
      ) {
        return newFormula;
      }

      if (type === "alpha" || type === "beta") {
        newFormula = newFormula.formula.getSignedSubFormulas(newFormula.sign)[
          choice
        ];
      }

      if (type === "delta" || type === "gamma") {
        newFormula = newFormula.formula.getSignedSubFormulas(
          newFormula.sign
        )[0];
      }
    }

    return newFormula;
  }
);

export const selectGameButtons = createSelector(
  [selectFormulaChoices, selectCurrentGameFormula, selectParsedDomain],
  (choices, { sign, formula }, { parsed: domain }) => {
    console.log(`${sign === true ? "T" : "F"} ${formula.toString()}`);

    if (formula.getSignedSubFormulas(sign).length === 0) {
      return;
    }

    if (choices.at(-1) === undefined) {
      if (formula.getSignedType(sign) === SignedFormulaType.DELTA) {
        return {
          values: domain ?? [],
          type: "delta",
        };
      }

      if (formula.getSignedType(sign) === SignedFormulaType.BETA) {
        return {
          values: formula
            .getSignedSubFormulas(sign)
            .map(
              ({ formula: f, sign: s }) =>
                `${f.toString()} is ${s === true ? "true" : "false"}`
            ),
          type: "beta",
        };
      }

      if (formula.getSignedType(sign) === SignedFormulaType.ALPHA) {
        return {
          values: ["Continue"],
          type: "alpha",
        };
      }
    }

    if (formula.getSignedType(sign) === SignedFormulaType.BETA) {
      return {
        values: formula
          .getSignedSubFormulas(sign)
          .map(
            ({ formula: f, sign: s }) =>
              `${f.toString()} is ${s === true ? "true" : "false"}`
          ),
        type: "beta",
      };
    }

    if (formula.getSignedType(sign) === SignedFormulaType.ALPHA) {
      return {
        values: ["Continue"],
        type: "alpha",
      };
    }

    return { values: ["unimplemented"], type: "unimplemented" };
  }
);

export const selectNextStep = createSelector(
  [
    selectFormulaChoices,
    selectCurrentGameFormula,
    selectStructure,
    selectValuation,
  ],
  (choices, { formula, sign }, structure, e) => {
    if (
      formula
        .getSignedSubFormulas(sign)
        .every(
          ({ formula: f, sign: s }) =>
            f.getSignedType(s) === SignedFormulaType.BETA
        )
    ) {
      return { left: -1, right: -1 };
    }

    const left = formula.getSignedSubFormulas(sign)[0];
    const right = formula.getSignedSubFormulas(sign)[1];

    if (left.formula.getSignedType(left.sign) === SignedFormulaType.ALPHA)
      return { left: 0, right: -1 };
    if (right.formula.getSignedType(right.sign) === SignedFormulaType.ALPHA)
      return { left: -1, right: 0 };

    return { left: 0, right: 0 };
  }
);

export const selectCurrentAssignment = createSelector(
  [
    selectFormulaChoices,
    selectEvaluatedFormula,
    selectValuation,
    selectFormulaGuess,
    selectParsedDomain,
  ],
  (choices, { formula }, e, userGuess, { parsed: domain }) => {
    let newFormula: SignedFormula = { sign: userGuess!, formula: formula! };

    let current = new Map(e);

    if (domain === undefined) {
      return current;
    }

    for (const { choice, type } of choices) {
      if (type === "continue" || type == "unimplemented") {
        continue;
      }

      if (
        newFormula.formula.getSignedSubFormulas(newFormula.sign).length === 0
      ) {
        continue;
      }

      if (type === "alpha" || type === "beta") {
        newFormula = newFormula.formula.getSignedSubFormulas(newFormula.sign)[
          choice
        ];
      }

      if (type === "delta" || type === "gamma") {
        let f = newFormula.formula;
        if (f instanceof QuantifiedFormula) {
          current.set(f.getVariableName(), domain[choice]);
          newFormula = newFormula.formula.getSignedSubFormulas(
            newFormula.sign
          )[0];
        }
      }
    }
    return current;
  }
);

export type BubbleFormat = { text: string; sender: "game" | "player" };

function addBetaText({ sign, formula }: SignedFormula): BubbleFormat[] {
  return formula.getSignedSubFormulas(sign).map(({ formula: f, sign: s }) => {
    return {
      text: `${f.toString()} is ${s === true ? "True" : "False"}`,
      sender: "game",
    };
  });
}

function addAlphaText(
  choice: number,
  { sign, formula }: SignedFormula
): BubbleFormat {
  return {
    text: `Then ${formula
      .getSignedSubFormulas(sign)
      [choice].formula.toString()} is ${
      formula.getSignedSubFormulas(sign)[choice].sign === true
        ? "true"
        : "false"
    }`,
    sender: "game",
  };
}

export const selectHistory = createSelector(
  [
    selectFormulaChoices,
    selectEvaluatedFormula,
    selectFormulaGuess,
    selectStructure,
    selectValuation,
    selectParsedDomain,
    selectCurrentAssignment,
  ],
  (
    choices,
    { formula },
    initialGuess,
    structure,
    e,
    { parsed: domain },
    e2
  ) => {
    let bubbles: BubbleFormat[] = [];

    let newFormula: SignedFormula = { sign: initialGuess!, formula: formula! };
    let bubble: BubbleFormat;
    let { formula: f, sign: s } = newFormula;

    bubbles.push({
      text: `You assume that formula ${f.toString()} is  ${
        initialGuess === true ? "True" : "False"
      }`,
      sender: "game",
    });

    if (f.getSignedSubFormulas(s).length === 0) {
      if (f.eval(structure, e2 ?? e) === s) {
        bubbles.push({ text: "You win", sender: "game" });
      } else {
        bubbles.push({ text: "You lose", sender: "game" });
      }
      return bubbles;
    }

    if (f.getSignedType(s) === SignedFormulaType.BETA) {
      bubbles.push(...addBetaText(newFormula));
    }

    if (f.getSignedType(s) === SignedFormulaType.ALPHA) {
      bubbles.push(addAlphaText(0, newFormula));
    }

    for (const { choice, type } of choices) {
      if (type === "continue" || type === "unimplemented") {
        continue;
      }
      if (type === "alpha") {
        bubbles.push({ text: "Continue", sender: "player" });
      }

      if (type === "beta") {
        bubble = {
          text: `${f.getSignedSubFormulas(s)[choice].formula.toString()} is ${
            f.getSignedSubFormulas(s)[choice].sign === true ? "True" : "False"
          }`,
          sender: "player",
        };
        bubbles.push(bubble);
      }

      if (type === "delta") {
        if (f instanceof QuantifiedFormula) {
          const qf: QuantifiedFormula = f;
          bubble = {
            text: `Assign ${domain![choice]} to ${qf.getVariableName()}`,
            sender: "player",
          };
          bubbles.push(bubble);
        }
      }

      if (type === "alpha" || type === "beta") {
        bubble = {
          text: `You assume that the formula ${f
            .getSignedSubFormulas(s)
            [choice].formula.toString()} is ${
            f.getSignedSubFormulas(s)[choice].sign === true ? "True" : "False"
          }`,
          sender: "game",
        };
        bubbles.push(bubble);

        newFormula = f.getSignedSubFormulas(s)[choice];
        f = newFormula.formula;
        s = newFormula.sign;
      }

      if (type === "delta" || type === "gamma") {
        bubble = {
          text: `You assume that the formula ${f
            .getSignedSubFormulas(s)[0]
            .formula.toString()} is ${
            f.getSignedSubFormulas(s)[0].sign === true ? "True" : "False"
          }`,
          sender: "game",
        };
        bubbles.push(bubble);

        newFormula = f.getSignedSubFormulas(s)[0];
        f = newFormula.formula;
        s = newFormula.sign;
      }

      if (f.getSignedType(s) === SignedFormulaType.BETA) {
        bubble = {
          text: "Which option is true?",
          sender: "game",
        };
        bubbles.push(bubble);
        bubbles.push(...addBetaText(newFormula));
      }

      if (
        f.getSignedType(s) === SignedFormulaType.ALPHA &&
        f.getSignedSubFormulas(s).length > 0
      ) {
        bubbles.push(addAlphaText(choice, newFormula));
      }
    }

    if (f.getSignedSubFormulas(s).length === 0) {
      if (f.eval(structure, e2 ?? e) === s) {
        bubbles.push({ text: "You win", sender: "game" });
      } else {
        bubbles.push({ text: "You lose", sender: "game" });
      }
    }

    return bubbles;
  }
);

export default formulasSlice.reducer;
