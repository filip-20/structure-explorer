import { configureStore } from "@reduxjs/toolkit";
import formulasReducer from "../features/formulas/formulasSlice";
import languageReducer from "../features/language/languageSlice";
import structureReducer from "../features/structure/structureSlice";
import variablesReducer from "../features/variables/variablesSlice";

const rootReducer = {
  formulas: formulasReducer,
  language: languageReducer,
  structure: structureReducer,
  variables: variablesReducer,
};

export const createStore = () =>
  configureStore({
    reducer: rootReducer,
  });

// Types
export type AppStore = ReturnType<typeof createStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
