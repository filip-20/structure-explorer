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
      const parsed = new Set(parseConstants(constants));

      return { parsed: parsed };
      //if (constants.filter((element2) => element2 === element).length > 1) {
      //  throw Error(`Constant ${element} is already defined in constants`);
      //}
    } catch (error) {
      return { error: error };
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
