import React, { useState } from 'react';
import AppContainer from "./redux/containers/AppContainer";
import {createStore} from "redux";
import reducer from "./redux/reducers";
import {enableMapSet} from "immer";

enableMapSet();

function initStore() {
    // @ts-ignore
    return createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
}

function AppModule() {
    const store = useState(initStore())[0];
    return (
        <AppContainer store={store}/>
    );
}

export default AppModule;
