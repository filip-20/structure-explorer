import React, { useState } from 'react';
import AppContainer from "./redux/containers/AppContainer";
import {createStore} from "redux";
import reducer from "./redux/reducers";
import {enableMapSet} from "immer";
import { stateToJSON } from './stateToJSON';
import { importAppState } from './redux/actions';

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

function AppComponent(props: {instance: any, onStateChange: () => void}) {
    const store = props.instance.store;
    store.subscribe(() => props.onStateChange())
    return (
        <AppContainer store={store}/>
    );
}

export {
  prepare,
  AppComponent,
};