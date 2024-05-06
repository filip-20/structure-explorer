import React from 'react';
import AppContainer from "./redux/containers/AppContainer";
import {Middleware, applyMiddleware, compose, createStore} from "redux";
import reducer from "./redux/reducers";
import {enableMapSet} from "immer";
import { stateToJSON } from './stateToJSON';
import { importAppState } from './redux/actions';

import './static/css/all.iso.css';
import './static/css/bootstrap.iso.css';
import './static/css/index.iso.css';
import './static/css/google-fonts.css';
import { CellContext, LogicContext } from './logicContext';
import { IMPORT_APP, SYNC_MATH_STATE, SET_CONSTANTS, SET_PREDICATES, SET_FUNCTIONS, CHECK_SYNTAX } from './redux/actions/action_types';

enableMapSet();

function filterAction(action: any) {
  switch(action.type) {
    case IMPORT_APP:
    case SYNC_MATH_STATE:
      return true;
    case SET_CONSTANTS:
    case SET_PREDICATES:
    case SET_FUNCTIONS:
    case CHECK_SYNTAX:
      if (action.ignore === true) {
        return true;
      }
      return false;
    default:
      return false;
  }
}

function prepare(initialState: any) {
    const composeEnhancers =
    typeof window === 'object' &&
    // @ts-ignore
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
      // @ts-ignore
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        name: 'structure-explorer'
      }) : compose;
    
    const stateMonitor: Middleware = store => next => action => {
      if (instance.handleStoreChange && !filterAction(action)) {
        instance.handleStoreChange();
      }
      return next(action)
    }

    const enhancer = composeEnhancers(
      applyMiddleware(stateMonitor),
    );

    const instance = {
        // @ts-ignore
        store: createStore(reducer, enhancer),
        handleStoreChange: undefined as ((() => void) | undefined),
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
    instance.handleStoreChange = onStateChange;
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
