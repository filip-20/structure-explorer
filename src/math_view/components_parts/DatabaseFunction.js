import React from 'react';
import {Table} from 'react-bootstrap';

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


function permutateWithRepetitions(permutationOptions,permutationLength) {
    if (permutationLength === 1) {
        return permutationOptions.map(permutationOption => [permutationOption]);
    }

    // Init permutations array.
    const permutations = [];

    // Get smaller permutations.
    const smallerPermutations = permutateWithRepetitions(
        permutationOptions,
        permutationLength - 1,
    );

    // Go through all options and join it to the smaller permutations.
    permutationOptions.forEach((currentOption) => {
        smallerPermutations.forEach((smallerPermutation) => {
            permutations.push([currentOption].concat(smallerPermutation));
        });
    });
    return permutations;
}


function DatabaseFunction(props) {
    let domain = [...props.domain];
    let domainValueArray = Object.values(domain);

    let mainElement = (
        <tbody>
        {permutateWithRepetitions(domainValueArray,props.arity).map((arrayValues,count) =>
            <tr key={"database-function-row"+count}>
                {arrayValues.map((value,index) =>
                    <td key={"database-function-row-"+count+"-item-"+index}>
                        {value}
                    </td>
                )}
                <td>
                    {renderFunctionValueSelect(props.name, props.value, [...arrayValues], domain, props.onInputChange, props.disabled)}
                </td>
            </tr>
                    )}
        </tbody>
        );

    let headElements = (
        <th>
            {props.symbol+"("}
        {[...Array(props.arity-1)].map((x, count) =>
            <span key={"database-function-header-parameter-"+count}><var>{"m"}</var><sub>{count+1}</sub>{", "}</span>
         )}
            <span key={"database-function-header-parameter-last"}><var>{"m"}</var><sub>{props.arity}</sub></span>
            {")"}
        </th>
    );

    return (
        <Table bordered responsive size="sm" className="small">
            <thead>
            <tr>
                {[...Array(props.arity)].map((x, count) =>
                    <th key={"database-function-header"+count}><var>{"m"}</var><sub>{count+1}</sub></th>
                )}
                {headElements}
            </tr>
            </thead>
            {mainElement}
        </Table>
    );
}
export default DatabaseFunction;