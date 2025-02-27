import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'

export interface FormulaState {
  text: string;
  guess: boolean | null;
}

// Define the TS type for the counter slice's state

export interface FormulasState {
    allFormulas: FormulaState[]
}

// Define the initial value for the slice state
const initialState: FormulasState = {
    allFormulas: []
}


function newFormulaState() {
  return { text: "", guess: null };
}


// Slices contain Redux reducer logic for updating state, and
// generate actions that can be dispatched to trigger those updates.
export const formulasSlice = createSlice({
  name: 'formulas',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    add: state => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      
      //state.allFormulas = [...state.allFormulas, newFormulaState()]
      state.allFormulas.push(newFormulaState())
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    remove: (state, action: PayloadAction<number>) => {
      //state.allFormulas = state.allFormulas.filter((_, index2) => index2 !== action.payload)
			state.allFormulas.splice(action.payload,1)
    },

		updateText: (state, action: PayloadAction<{id: number, text: string}>) => {
				state.allFormulas[action.payload.id].text = action.payload.text
		},

    updateGuess: (state, action: PayloadAction<{id: number, guess: boolean | null}>) => {
      state.allFormulas[action.payload.id].guess = action.payload.guess
  }
  }
})

// Export the generated action creators for use in components
export const { add, remove, updateText, updateGuess } = formulasSlice.actions

// Export the slice reducer for use in the store configuration
export default formulasSlice.reducer
export const selectFormulas = (state: RootState) => state.formulas.allFormulas