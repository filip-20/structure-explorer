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
import { selectLanguage, updatePredicates } from "../language/languageSlice";
import {
  selectParsedDomain,
  selectStructure,
} from "../structure/structureSlice";
import UniversalQuant from "../../model/formula/Formula.UniversalQuant";
import { selectValuation } from "../variables/variablesSlice";
import QuantifiedFormula from "../../model/formula/QuantifiedFormula";

export interface FormulaState {
  text: string;
  guess: boolean | null;
  gameChoices: {
    formula?: 0 | 1;
    element?: string;
    type: "alpha" | "beta" | "gamma" | "delta";
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

    clearChoices: (state, action: PayloadAction<number>) => {
      state.allFormulas[action.payload].gameChoices = [];
    },

    gameGoBack: (
      state,
      action: PayloadAction<{ id: number; index: number }>
    ) => {
      const { id, index } = action.payload;

      state.allFormulas[id].gameChoices.splice(index);
    },

    addAlpha: (
      state,
      action: PayloadAction<{
        id: number;
        formula: 0 | 1 | undefined;
      }>
    ) => {
      const { id, formula } = action.payload;

      state.allFormulas[id].gameChoices.push({
        formula: formula,
        type: "alpha",
      });
    },

    addBeta: (
      state,
      action: PayloadAction<{
        id: number;
        formula: 0 | 1 | undefined;
      }>
    ) => {
      const { id, formula } = action.payload;

      state.allFormulas[id].gameChoices.push({
        formula: formula,
        type: "beta",
      });
    },

    addGamma: (
      state,
      action: PayloadAction<{
        id: number;
        element: string;
      }>
    ) => {
      const { id, element } = action.payload;

      state.allFormulas[id].gameChoices.push({
        element: element,
        type: "gamma",
      });
    },

    addDelta: (
      state,
      action: PayloadAction<{
        id: number;
        element: string;
      }>
    ) => {
      const { id, element } = action.payload;

      state.allFormulas[id].gameChoices.push({
        element: element,
        type: "delta",
      });
    },

    remove: (state, action: PayloadAction<number>) => {
      state.allFormulas.splice(action.payload, 1);
    },

    updateText: (
      state,
      action: PayloadAction<{ id: number; text: string }>
    ) => {
      const { id, text } = action.payload;
      state.allFormulas[id].text = text;
      state.allFormulas[id].gameChoices = [];
    },

    updateGuess: (
      state,
      action: PayloadAction<{ id: number; guess: boolean | null }>
    ) => {
      const { id, guess } = action.payload;
      state.allFormulas[id].guess = guess;
      state.allFormulas[id].gameChoices = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(updatePredicates, (state, action) => {
      state.allFormulas.forEach((formula) => {
        formula.gameChoices = [];
      });
    });
  },
});

export const {
  add,
  clearChoices,
  addAlpha,
  addBeta,
  addGamma,
  addDelta,
  remove,
  updateText,
  updateGuess,
  gameGoBack,
} = formulasSlice.actions;

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

    for (const { formula, element, type } of choices) {
      if (
        newFormula.formula.getSignedSubFormulas(newFormula.sign).length === 0
      ) {
        return newFormula;
      }

      if (type === "alpha" || type === "beta") {
        newFormula = newFormula.formula.getSignedSubFormulas(newFormula.sign)[
          formula!
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

    for (const { formula, element, type } of choices) {
      if (
        newFormula.formula.getSignedSubFormulas(newFormula.sign).length === 0
      ) {
        continue;
      }

      if (type === "alpha" || type === "beta") {
        newFormula = newFormula.formula.getSignedSubFormulas(newFormula.sign)[
          formula!
        ];
      }

      if (type === "delta" || type === "gamma") {
        let f = newFormula.formula;
        if (f instanceof QuantifiedFormula) {
          current.set(f.getVariableName(), element!);
          newFormula = newFormula.formula.getSignedSubFormulas(
            newFormula.sign
          )[0];
        }
      }
    }
    return current;
  }
);

export const selectGameButtons = createSelector(
  [
    selectCurrentGameFormula,
    selectParsedDomain,
    selectStructure,
    selectCurrentAssignment,
  ],
  ({ sign, formula }, { parsed: domain }, structure, e) => {
    console.log(`${sign === true ? "T" : "F"} ${formula.toString()}`);

    if (formula.getSignedSubFormulas(sign).length === 0) {
      return;
    }

    console.log(formula.getSignedType(sign));

    if (formula.getSignedType(sign) === SignedFormulaType.DELTA) {
      return {
        values: domain ?? [],
        elements: domain ?? [],
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
        subformulas: formula.getSignedSubFormulas(sign),
        type: "beta",
      };
    }

    if (formula.getSignedType(sign) === SignedFormulaType.ALPHA) {
      let winners = formula.winningSubformulas(sign, structure, e);

      if (winners.length === 0) {
        winners = formula.getSignedSubFormulas(sign);
      }

      return {
        values: ["Continue"],
        subformulas: winners,
        type: "alpha",
      };
    }

    if (
      formula.getSignedType(sign) === SignedFormulaType.GAMMA &&
      formula instanceof QuantifiedFormula
    ) {
      let qf = formula;

      let winners = qf.winningElements(sign, structure, e);

      if (winners.length === 0) {
        winners = domain ?? ["domain error"];
      }

      return {
        values: ["Continue"],
        elements: winners,
        type: "gamma",
      };
    }
  }
);

export type BubbleFormat = {
  text: string;
  sender: "game" | "player";
  goBack?: number;
};

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
    selectCurrentAssignment,
    selectParsedDomain,
  ],
  (choices, { formula }, initialGuess, structure, e, e2, domain) => {
    let bubbles: BubbleFormat[] = [];

    let newFormula: SignedFormula = { sign: initialGuess!, formula: formula! };
    let bubble: BubbleFormat;
    let { formula: f, sign: s } = newFormula;
    const { parsed } = domain;
    const dom = parsed ?? ["domain error"];

    bubbles.push({
      text: `You assume that formula ${f.toString()} is  ${
        initialGuess === true ? "True" : "False"
      }`,
      sender: "game",
    });

    console.log(choices);

    if (f.getSignedSubFormulas(s).length === 0) {
      if (f.eval(structure, e2 ?? e) === s) {
        bubbles.push({ text: "You win", sender: "game" });
      } else {
        bubbles.push({ text: "You lose", sender: "game" });
      }
      return bubbles;
    }

    if (f.getSignedType(s) === SignedFormulaType.ALPHA) {
      let arr = newFormula.formula
        .getSignedSubFormulas(newFormula.sign)
        .map((f) => f.formula.signedFormulaToString(f.sign));
      const winners = f.winningSubformulas(s, structure, e2);

      if (winners.length === 0) {
        bubbles.push(addAlphaText(0, newFormula));
      } else {
        const win = winners[0];
        console.log(win);

        bubbles.push(
          addAlphaText(
            arr.indexOf(win.formula.signedFormulaToString(win.sign)),
            newFormula
          )
        );
      }
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
      f.getSignedType(newFormula.sign) === SignedFormulaType.GAMMA &&
      f instanceof QuantifiedFormula
    ) {
      const winners = f.winningElements(s, structure, e2);

      bubbles.push({
        text: `Then formula ${f.toString()} is also ${
          s === true ? "True" : "False"
        } when we assign element ${
          winners.length > 0 ? winners[0] : dom[0]
        } to variable ${f.variableName}`,
        sender: "game",
      });
    }

    if (
      f.getSignedType(s) === SignedFormulaType.DELTA &&
      f instanceof QuantifiedFormula
    ) {
      bubble = {
        text: `What element should be assigned to variable ${f.getVariableName()}?`,
        sender: "game",
      };
      bubbles.push(bubble);
    }

    let back = 0;
    for (const { formula, element, type } of choices) {
      if (type === "alpha") {
        bubbles.push({ text: "Continue", sender: "player" });
      }

      if (type === "gamma") {
        bubbles.push({ text: "Continue", sender: "player" });
      }

      if (type === "beta") {
        bubble = {
          text: `${f.getSignedSubFormulas(s)[formula!].formula.toString()} is ${
            f.getSignedSubFormulas(s)[formula!].sign === true ? "True" : "False"
          }`,
          sender: "player",
          goBack: back,
        };
        bubbles.push(bubble);
      }

      if (type === "delta") {
        if (f instanceof QuantifiedFormula) {
          const qf: QuantifiedFormula = f;
          bubble = {
            text: `Assign ${element!} to ${qf.getVariableName()}`,
            sender: "player",
            goBack: back,
          };
          bubbles.push(bubble);
        }
      }

      if (type === "alpha" || type === "beta") {
        bubble = {
          text: `You assume that the formula ${f
            .getSignedSubFormulas(s)
            [formula!].formula.toString()} is ${
            f.getSignedSubFormulas(s)[formula!].sign === true ? "True" : "False"
          }`,
          sender: "game",
        };
        bubbles.push(bubble);

        newFormula = f.getSignedSubFormulas(s)[formula!];
        f = newFormula.formula;
        s = newFormula.sign;
      } else if (type === "delta" || type === "gamma") {
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

      if (
        f.getSignedType(s) === SignedFormulaType.BETA &&
        f.getSignedSubFormulas(s).length > 0
      ) {
        bubble = {
          text: "Which option is true?",
          sender: "game",
        };
        bubbles.push(bubble);
        bubbles.push(...addBetaText(newFormula));
      }

      if (
        f.getSignedType(s) === SignedFormulaType.DELTA &&
        f instanceof QuantifiedFormula &&
        f.getSignedSubFormulas(s).length > 0
      ) {
        bubble = {
          text: `What element should be assigned to variable ${f.getVariableName()}?`,
          sender: "game",
        };
        bubbles.push(bubble);
      }

      if (
        f.getSignedType(s) === SignedFormulaType.GAMMA &&
        f instanceof QuantifiedFormula &&
        f.getSignedSubFormulas(s).length > 0
      ) {
        const winners = f.winningElements(s, structure, e2);

        bubbles.push({
          text: `Then formula ${f.toString()} is also ${
            s === true ? "True" : "False"
          } when we assign element ${
            winners.length > 0 ? winners[0] : dom[0]
          } to variable ${f.variableName}`,
          sender: "game",
        });
      }

      if (
        f.getSignedType(s) === SignedFormulaType.ALPHA &&
        f.getSignedSubFormulas(s).length > 0
      ) {
        let arr = newFormula.formula
          .getSignedSubFormulas(newFormula.sign)
          .map((f) => f.formula.signedFormulaToString(f.sign));
        const winners = f.winningSubformulas(s, structure, e2);

        if (winners.length === 0) {
          bubbles.push(addAlphaText(0, newFormula));
        } else {
          const win = winners[0];
          bubbles.push(
            addAlphaText(
              arr.indexOf(win.formula.signedFormulaToString(win.sign)),
              newFormula
            )
          );
        }
      }
      back++;
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
