import React from 'react';
import {Table} from 'react-bootstrap';
import {PREDICATE} from "../../constants";

function renderFunctionValueSelect(functionName, functionValues, params, domain, onChange, disabled) {
    let value = functionValues[JSON.stringify(params)];
    if (!value) {
        value = '';
    }
    return (
        <select onChange={(e) => onChange(params.concat([e.target.value]), functionName)} value={value}>
            <option value=''>{''}</option>
            {domain.map(item =>
                <option key={item} disabled={disabled} value={item}>{item}</option>
            )}
        </select>
    )
}

export function RelationalTable(props) {
    let domain = [...props.domain];

    let inputComponent = (item) => (
        <td key={item} className="checkComponent">
            {props.type === PREDICATE ? (
                <input type='checkbox'
                       onChange={(e) => props.onInputChange(item, props.name, e.target.checked)}
                       checked={props.value.findIndex((e) => JSON.stringify(e) === JSON.stringify(item)) > -1}
                       disabled={props.disabled}/>
            ) : (
                renderFunctionValueSelect(props.name, props.value, item, domain, props.onInputChange, props.disabled)
            )}
        </td>
    );

    let arity1 = (
        <tr>
            <td>{''}</td>
            {domain.map((item) =>
                inputComponent([item])
            )}
        </tr>
    );

    let arity2 = domain.map((item1) =>
        <tr key={item1}>
            <th className="interpretationHead">{item1}</th>
            {domain.map((item2) =>
                inputComponent([item1, item2])
            )}
        </tr>
    );

    return (
        <Table bordered responsive size="sm" className="small">
            <thead>
            <tr>
                <th className="interpretationHead">{props.name}</th>
                {domain.map(item =>
                    <th key={item} className="interpretationHead">{item}</th>
                )}
            </tr>
            </thead>
            <tbody>
            {parseInt(props.arity) === 1 ? arity1 : arity2}
            </tbody>
        </Table>
    )
}