import { configureStore } from '@reduxjs/toolkit'
import formulasReducer from '../features/formulas/formulasSlice'
import languageReducer from '../features/language/languageSlice'
import structureReducer from '../features/structure/structureSlice'
export const store = configureStore({
  reducer: {
    formulas: formulasReducer,
    language: languageReducer,
    structure: structureReducer
  }
})

// Infer the type of `store`
export type AppStore = typeof store
export type RootState = ReturnType<AppStore['getState']>
// Infer the `AppDispatch` type from the store itself
export type AppDispatch = AppStore['dispatch']
// Define a reusable type describing thunk functions