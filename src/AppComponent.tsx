import React from 'react';
import AppContainer from "./redux/containers/AppContainer";
import {createStore} from "redux";
import reducer from "./redux/reducers";
import {enableMapSet} from "immer";
import { stateToJSON } from './stateToJSON';
import { importAppState } from './redux/actions';

import './static/css/all.iso.css';
import './static/css/bootstrap.iso.css';
import './static/css/index.iso.css';
import './static/css/google-fonts.css';
import { CellContext, LogicContext } from './logicContext';

enableMapSet();

function prepare(initialState: any) {
    const instance = {
        // @ts-ignore
        store: createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
    };
    const getState = (instance: any) => stateToJSON(instance.store.getState());

    if (initialState !== null) {
      instance.store.dispatch(importAppState(initialState, instance.store.getState().diagramState));
    }

    return {
        instance,
        getState,
    };
}

interface AppComponentProps {
    instance: any,
    onStateChange: () => void,
    isEdited: boolean,
    context: CellContext,
}

function AppComponent({instance, onStateChange, isEdited, context}: AppComponentProps) {
    const store = instance.store;
    store.subscribe(() => onStateChange())
    return (
        <div className={"fol-graphexplorer-cYTZ7LnVXZ"}>
            <div className={`container-fluid${!isEdited ?
                                ' view-mode' : ''}`}>
              <LogicContext.Provider value={context}>
                <AppContainer store={store}/>
              </LogicContext.Provider>
            </div>
        </div>
    );
}

export default {
  prepare,
  AppComponent,
};
