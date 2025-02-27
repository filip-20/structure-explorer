import { createSelector, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import {
  parseConstants,
  parsePredicates,
  parseFunctions,
  SyntaxError,
} from "@fmfi-uk-1-ain-412/js-fol-parser";

export interface LanguageState {
  constants: string;
  predicates: string;
  functions: string;
}

const initialState: LanguageState = {
  constants: "",
  predicates: "",
  functions: "",
};

export const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    updateConstants: (state, action: PayloadAction<string>) => {
      state.constants = action.payload;
    },

    updatePredicates: (state, action: PayloadAction<string>) => {
      state.predicates = action.payload;
    },

    updateFunctions: (state, action: PayloadAction<string>) => {
      state.functions = action.payload;
    },
  },
});

// Export the generated action creators for use in components
export const { updateConstants, updatePredicates, updateFunctions } =
  languageSlice.actions;

// Export the slice reducer for use in the store configuration
export default languageSlice.reducer;
export const selectConstants = (state: RootState) => state.language.constants;
export const selectPredicates = (state: RootState) => state.language.predicates;
export const selectFunctions = (state: RootState) => state.language.functions;

export const selectParsedConstants = createSelector(
  [selectConstants],
  (constants) => {
    try {
      const parsed = parseConstants(constants);

      return { parsed: parsed };
    } catch (error) {
      if (error instanceof SyntaxError) {
        return { error: error };
      }
      throw error;
    }
  }
);
export const selectParsedPredicates = createSelector(
  [selectPredicates],
  (predicates) => {
    try {
      const parsed = new Map(
        parsePredicates(predicates).map(({ name, arity }) => [name, arity])
      );
      return { parsed };
    } catch (error) {
      if (error instanceof SyntaxError) {
        return { error: error };
      }

      throw error;
    }
  }
);

export const selectParsedFunctions = createSelector(
  [selectFunctions],
  (functions) => {
    try {
      const parsed = new Map(
        parseFunctions(functions).map(({ name, arity }) => [name, arity])
      );

      return { parsed: parsed };
    } catch (error) {
      if (error instanceof SyntaxError) {
        return { error: error };
      }

      throw error;
    }
  }
);

export const selectSymbolsClash = createSelector(
  [selectParsedConstants, selectParsedPredicates, selectParsedFunctions],
  (consts, preds, funcs) => {
    let err = undefined;
    if (!consts.parsed) return "";
    if (!preds.parsed) return "";
    if (!funcs.parsed) return "";

    const constants = consts.parsed;
    const predicates = Array.from(preds.parsed).map((name) => name[0]);
    const functions = Array.from(funcs.parsed).map((name) => name[0]);

    constants.forEach((element) => {
      if (predicates.includes(element)) {
        err = `Constant ${element} is already defined in predicates`;
      }

      if (functions.includes(element)) {
        err = `Constant ${element} is already defined in functions`;
      }

      if (constants.filter((element2) => element2 === element).length > 1) {
        err = `Constant ${element} is already defined in constants`;
      }
    });

    predicates.forEach((element) => {
      if (functions.includes(element)) {
        err = `Predicate ${element} is already defined in functions`;
      }

      if (predicates.filter((element2) => element2 === element).length > 1) {
        err = `Predicate ${element} is already defined in predicates`;
      }
    });

    functions.forEach((element) => {
      if (functions.filter((element2) => element2 === element).length > 1) {
        err = `Function ${element} is already defined in functions`;
      }
    });

    return err;
  }
);
