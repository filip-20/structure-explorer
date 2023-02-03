import {FUNCTION, PREDICATE, UNBINARY} from "./ConstantNames";
import {DiagramEngine } from "@projectstorm/react-diagrams";
import {getLanguageObject} from "../../redux/selectors/languageObject";
import {getStructureObject} from "../../redux/selectors/structureObject";
import {parseConstants, parseDomain} from '@fmfi-uk-1-ain-412/js-fol-parser';

export function canUseNameForGivenArityAndType(elementName:string,elementArity:string,reduxProps:any,type:string):boolean{
    let languageObject = getLanguageObject(reduxProps["store"].getState());

    if(languageObject.constants && languageObject.constants.has(elementName)){
        return false;
    }

    let givenSet = type === PREDICATE ? languageObject.functions : languageObject.predicates;
    if(givenSet && givenSet.has(elementName)){
        return false;
    }

    let finalSet = type === PREDICATE ? languageObject.predicates : languageObject.functions;

    if(finalSet){
        for(let [langaugeElementName,languageElementArity] of finalSet.entries()){
            if(langaugeElementName === elementName){
                return languageElementArity.toString() === elementArity;
            }
        }
    }
    return true;
}

export function functionIsAlreadyDefinedForGivenFunction(functionParameters:[string],functionValue:string,functionName:string,reduxProps:any):boolean{
    let functionInterpretation = getStructureObject(reduxProps["store"].getState()).iFunction;

    if(functionInterpretation.has(functionName)){
        for(let [funcParameters,funcValue] of Object.entries(functionInterpretation.get(functionName))){
            if(funcParameters === JSON.stringify(functionParameters)){
                return funcValue!==functionValue;
            }
        }
    }
    return false;
}

export function selectOnlyCurrentGraphElement(currentModel:any,engine:DiagramEngine){
    engine.getModel().clearSelection();
    currentModel.setSelected(true);
    engine.repaintCanvas();
}

export function clearAllWithoutCurrentModel(currentModel:any,engine:DiagramEngine){
    let selectedElements = engine.getModel().getSelectedEntities();
    for(let graphObject of selectedElements){
        if(graphObject!==currentModel){
            graphObject.setSelected(false);
        }
    }
    engine.repaintCanvas();
}

function setNodeBadNameIfStateContainsNodeWithSameName(state:Map<string,any>,newName:string,setNodeBadName:any){
    if(state.has(newName)){
        setNodeBadName(true);
        return true;
    }
    else{
        setNodeBadName(false);
        return false;
    }
}

function parseText(name:string, setNodeBadName:any, parse:any){
    try {
        if (name.trim() == '' || name.includes(',')) {
            throw Error('no or multiple identifiers')
        }
        parse(name);
        setNodeBadName(false);
        return false;
    }
    catch (e) {
        setNodeBadName(true);
        return true;
    }
}

export function setPredFuncBadNameIfRegexViolated(name:string, setBadName:any){
   return parseText(name, setBadName, parseConstants);
}

function setDomainBadNameIfRegexViolated(newName:string, setNodeBadName:any){
    parseText(newName, setNodeBadName, parseDomain)
}

function setConstantsBadNameIfRegexViolated(newName:string, setNodeBadName:any){
    parseText(newName, setNodeBadName, parseConstants);
}

export function canUseNameForNode(oldName:string,newName:string,setNodeBadName:any,reduxProps:any,nodeType:string){
    let diagramState = reduxProps["store"].getState().diagramState;

    if(oldName === newName){
        setNodeBadName(false);
        return;
    }

    if(newName.length === 0 ){
        setNodeBadName(true);
        return;
    }

    if(setNodeBadNameIfStateContainsNodeWithSameName(nodeType === UNBINARY?diagramState.domainNodes:diagramState.constantNodes,newName,setNodeBadName)){
        return;
    }
    nodeType === UNBINARY?setDomainBadNameIfRegexViolated(newName,setNodeBadName):setConstantsBadNameIfRegexViolated(newName, setNodeBadName);
}

export function getAvailableLanguageElementForGivenArity(arity:string,reduxProps:any,modelSet:Set<string>,type:string):Set<string> {
    let languageElementSet: Set<string> = new Set();
    let languageObject = getLanguageObject(reduxProps["store"].getState());
    let languageElement = type === PREDICATE ? languageObject.predicates : languageObject.functions;

    for(let [elementValue,elementArity] of languageElement.entries()){
        if(elementArity.toString() === arity && !modelSet.has(elementValue)){
            languageElementSet.add(elementValue);
        }
    }
    return languageElementSet;
}


export function getMaxLengthForGivenLanguageElementWithArity(arity:string,type:string,reduxProps:any):number{
    let maxLength = 0;
    let languageObject = getLanguageObject(reduxProps["store"].getState());
    let languageElement = type === PREDICATE ? languageObject.predicates : languageObject.functions;

    for(let [elementValue,elementArity] of languageElement.entries()){
        if(elementArity.toString() === arity && maxLength<elementValue.length){
            maxLength = elementValue.length;
        }
    }
    return maxLength;
}

export function getWidestElement(isDropDownMenu:boolean,inputElementTestLength:number,model:any,width:number,predicateArity:string,functionArity:string) {
    if(isDropDownMenu){
        let predicateWidth = getMaxLengthForGivenLanguageElementWithArity(predicateArity,PREDICATE,model.getReduxProps());
        let functionWidth = 0;

        if(functionArity !== "0"){
            functionWidth = getMaxLengthForGivenLanguageElementWithArity(functionArity,FUNCTION,model.getReduxProps());
        }

        if(width<predicateWidth){
            width = predicateWidth;
        }
        if(width<functionWidth){
            width = functionWidth;
        }
        if(inputElementTestLength>width){
            width = inputElementTestLength;
        }
    }
    return width;
}
