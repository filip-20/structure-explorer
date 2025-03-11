import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

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

export default formulasSlice.reducer;
export const selectFormulas = (state: RootState) => state.formulas.allFormulas;
