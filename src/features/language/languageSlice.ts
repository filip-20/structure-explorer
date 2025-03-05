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
      parsed.forEach((element) => {
        if (parsed.filter((element2) => element === element2).length > 1) {
          throw new Error(`Constant ${element} is already defined`);
        }
      });

      return { parsed: new Set(parsed) };
    } catch (error) {
      if (error instanceof SyntaxError || error instanceof Error) {
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
      const parsed = parsePredicates(predicates);

      parsed.forEach((element) => {
        if (
          parsed.filter((element2) => element.name === element2.name).length > 1
        ) {
          throw new Error(`Predicate ${element} is already defined`);
        }
      });

      return {
        parsed: new Map(parsed.map(({ name, arity }) => [name, arity])),
      };
    } catch (error) {
      if (error instanceof SyntaxError || error instanceof Error) {
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
      const parsed = parseFunctions(functions);

      parsed.forEach((element) => {
        if (
          parsed.filter((element2) => element.name === element2.name).length > 1
        ) {
          throw new Error(`Function ${element} is already defined`);
        }
      });

      return {
        parsed: new Map(parsed.map(({ name, arity }) => [name, arity])),
      };
    } catch (error) {
      if (error instanceof SyntaxError || error instanceof Error) {
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
    const predicates = new Set(preds.parsed.keys());
    const functions = new Set(funcs.parsed.keys());

    constants.forEach((element) => {
      if (preds.parsed.has(element)) {
        err = `Constant ${element} is also defined in predicates`;
      }

      if (funcs.parsed.has(element)) {
        err = `Constant ${element} is also defined in functions`;
      }
    });

    predicates.forEach((element) => {
      if (functions.has(element)) {
        err = `Predicate ${element} is also defined in functions`;
      }
    });

    // functions.forEach((element) => {
    //   if (functions.filter((element2) => element2 === element).length > 1) {
    //     err = `Function ${element} is also defined in functions`;
    //   }
    // });

    return err;
  }
);
