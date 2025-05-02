import { createSelector, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { parseValuation, SyntaxError } from "@fmfi-uk-1-ain-412/js-fol-parser";
import { selectLanguage } from "../language/languageSlice";
import { selectParsedDomain } from "../structure/structureSlice";
export interface VariablesState {
  text: string;
}

const initialState: VariablesState = {
  text: "",
};

export const variablesSlice = createSlice({
  name: "variables",
  initialState,
  reducers: {
    importVariablesState: (state, action: PayloadAction<string>) => {
      return JSON.parse(action.payload);
    },
    updateVariables: (state, action: PayloadAction<string>) => {
      state.text = action.payload;
    },
  },
});

export const { updateVariables, importVariablesState } = variablesSlice.actions;

export default variablesSlice.reducer;

export const selectVariables = (state: RootState) => state.variables.text;

export const selectParsedVariables = createSelector(
  [selectVariables, selectLanguage, selectParsedDomain],
  (variables, language, domain) => {
    try {
      const vars = parseValuation(variables, language.getParserLanguage());
      let err = undefined;
      const varsMap = vars.map(([from, to]) => {
        if (
          (domain.parsed && domain.parsed.includes(to) == false) ||
          !domain.parsed
        ) {
          err = new Error(`${to} is not an element of domain`);
        }

        return { from: from, to: to };
      });

      if (err) return { error: err };

      return { parsed: varsMap };
    } catch (error) {
      if (error instanceof SyntaxError) {
        return { error: error };
      }

      throw error;
    }
  }
);

export const selectValuation = createSelector(
  [selectParsedVariables],
  (variables) => {
    if (variables.parsed === undefined) return new Map<string, string>();

    return new Map(variables.parsed.map(({ from, to }) => [from, to]));
  }
);
