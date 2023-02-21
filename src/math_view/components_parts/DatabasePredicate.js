import React from 'react';
import {Table} from 'react-bootstrap';
import {SelectComponent} from "./SelectComponent";

function renderPredicateValueSelect(predicateName, predicateValues, params, domain, onInputChange, disabled,value,index) {
    return (
        <select onChange={(e) => changeValue(onInputChange,e.target.value,params,index,predicateName)} value={value}>
            <option value=''>{''}</option>
            {domain.map(item =>
                <option key={item} disabled={disabled} value={item}>{item}</option>
            )}
        </select>
    )
}
function changeValue(onInputChange,value,params,index,predicateName){
    if(value===params[index]){
        return;
    }
    onInputChange(params,predicateName,false);
    if(value!==''){
        params[index]=value;
        onInputChange(params,predicateName,true);
    }
}

export function DatabasePredicate(props) {
    let domain = [...props.domain];

    if(props.selectionElement===undefined){
        props = Object.assign({selectionElement: Array(parseInt(props.arity))}, props);
        props.selectionElement.fill("");
    }
        let element = (predicateArrayElements) => (
        <tbody>
        {predicateArrayElements.map((onePredicateArray,count) =>
        <tr key={'database-predicate-row'+count}>
            {onePredicateArray.map((domainElement,index) =>
                <td key={'database-predicate-column'+index}>
                    {renderPredicateValueSelect(props.name, props.value, [...onePredicateArray], domain, props.onInputChange, props.disabled,domainElement,index)}

                </td>
            )}
        </tr>
        )}
        {newSelectionElement()}
        </tbody>
    );

    //ak je props.arity string tak to nevytvori pole danej velkost, teda to treba najprv parsnut
    let newSelectionElement = () => (
        <tr>
            {props.selectionElement.map((value,index)=>
                <SelectComponent key={'select-component'+index} domain={domain} index={index} props={props}/>
            )}
        </tr>
    );


    let headElements = () =>(
        <thead>
        <tr>
            {[...Array(parseInt(props.arity))].map((x, count) =>
                <th key={"m" + (count + 1)} className="interpretationHead"><var>{"m"}</var><sub>{count + 1}</sub></th>

            )}
        </tr>
        </thead>
        );

    if(Array.isArray(props.value)) {
        return (
            <Table bordered responsive size="sm" className="small">
                {headElements()}
                {element(props.value)}
            </Table>
        );
   }
    else{
        return (
            <Table bordered responsive>
                {headElements()}
                <tbody>
                {newSelectionElement()}
                </tbody>
            </Table>
        )
    }
}