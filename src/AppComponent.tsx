import { useEffect } from "react";
import App from "./App";
import { store } from "./app/store";
import { importAppState } from "./features/import/importThunk";

interface PrepareResult {
  instance: any;
  getState: (instance: any) => any;
}

function prepare(initialState?: any): PrepareResult {
  const instance = { store: store };
  const getState = (instance: any) => {
    const storeState = instance.store.getState();
    return JSON.stringify(
      {
        formulas: storeState.formulas,
        language: storeState.language,
        structure: storeState.structure,
        variables: storeState.variables,
      },
      null,
      2
    );
  };

  if (initialState !== null) {
    instance.store.dispatch(importAppState(initialState));
  }

  return {
    instance: instance,
    getState: getState,
  };
}

interface AppProps {
  instance: any;
  isEdited: boolean;
  onStateChange: () => void;
}

function AppComponent({ instance, isEdited, onStateChange }: AppProps) {
  const store = instance.store;

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      onStateChange();
    });

    return () => {
      unsubscribe();
    };
  }, [store, onStateChange]);

  return <App store={store} />;
}

export default { prepare, AppComponent };
