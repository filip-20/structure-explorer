import type { AppDispatch, RootState } from "../../app/store";
import { importFormulasState } from "../formulas/formulasSlice";
import { importLanguageState } from "../language/languageSlice";
import { importStructureState } from "../structure/structureSlice";
import { importVariablesState } from "../variables/variablesSlice";

export const importAppState =
  (importedState: RootState) => (dispatch: AppDispatch) => {
    dispatch(importFormulasState(JSON.stringify(importedState.formulas)));
    dispatch(importLanguageState(JSON.stringify(importedState.language)));
    dispatch(importStructureState(JSON.stringify(importedState.structure)));
    dispatch(importVariablesState(JSON.stringify(importedState.variables)));
  };
