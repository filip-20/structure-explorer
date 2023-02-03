import languageReducer from "./language";
import structureReducer from "./structure";
import expressionsReducer from "./expressions";
import teacherModeReducer from "./teacherMode";
import {IMPORT_APP} from "../actions/action_types";
import diagramReducer,{ defaultState as diagramDefaultState } from "./diagram";
import {defaultState as expressionsDefaultState} from "./expressions";
import {defaultState as structureDefaultState} from "./structure";
import {defaultState as languageDefaultState} from "./language";

function defaultState() {
    return {
        common: {
            teacherMode: false
        },
        language: languageDefaultState(),
        structure: structureDefaultState(),
        expressions: expressionsDefaultState(),
        diagramState: diagramDefaultState()
    };
}

function checkImportedState(state:any) {
    if (!state.common || !state.language || !state.structure) {
        throw 'State is not valid!';
    }
    if (!state.language.constants || !state.language.predicates || !state.language.functions) {
        throw 'State is not valid!';
    }
}

function root(state = defaultState(), action:any) {
    if (action.type === IMPORT_APP) {
        try {
            const importedState = JSON.parse(action.content);
            checkImportedState(importedState);
            state = importedState;
            state.diagramState = action.diagramState?action.diagramState:diagramDefaultState();
            // console.log('Imported state', state);
        } catch (e) {
            console.error(e);
        }

    }

    const common = teacherModeReducer(state.common, action);
    const language = languageReducer(state.language, action);
    const structure = structureReducer(state.structure, action, {language});
    const expressions = expressionsReducer(state.expressions, action, {language, structure})
    const diagramState = diagramReducer(state.diagramState, action, state);

    return {
        common,
        language,
        structure,
        expressions,
        diagramState
    }
}

export default root;