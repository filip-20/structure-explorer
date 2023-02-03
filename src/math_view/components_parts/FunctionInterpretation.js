import {Col, Form} from "react-bootstrap";
import TextInput from "./TextInput";
import {FUNCTION} from "../../constants";
import React from "react";
import DatabaseFunction from "./DatabaseFunction";
import {RelationalTable} from './index'

function FunctionInterpretation({functions,structure,setFunctionValueText,lockFunctionValue,toggleTable,toggleDatabase,teacherMode,domain,structureObject,setFunctionValueTable,lengthOfCol}) {
    return (
        <Col lg={lengthOfCol}>
            <Form.Label>Interpretation of function symbols</Form.Label>
                {functions.map((name) =>
                    <Form.Group key={name}>
                        <TextInput
                            errorProperty={structure.functions[name].errorMessage}
                            onChange={(e) => setFunctionValueText(e.target.value, name)}
                            onLock={() => lockFunctionValue(name)}
                            textData={structure.functions[name]}
                            label={<span><var>i</var>({name.split('/')[0]}) = &#123;</span>}
                            teacherMode={teacherMode}
                            id={'function-' + name}
                            toggleTable={() => toggleTable(FUNCTION, name)}
                            toggleDatabase={() => toggleDatabase(FUNCTION, name)}
                            databaseEnabled={structure.functions[name].databaseEnabled}
                            tableEnabled={structure.functions[name].tableEnabled}
                            arity={parseInt(name.split('/')[1])}
                            domain={domain}/>
                        {structure.functions[name].tableEnabled && domain.size > 0 ? (
                            <RelationalTable name={name} domain={structureObject.domain}
                                             arity={structureObject.language.functions.get(name.split('/')[0])}
                                             value={structureObject.iFunction.has(name) ? structureObject.iFunction.get(name) : {}}
                                             onInputChange={setFunctionValueTable}
                                             disabled={structure.functions[name].locked}
                                             type={FUNCTION}/>
                        ) : null}
                        {structure.functions[name].databaseEnabled && domain.size > 0 ? (
                            <DatabaseFunction name={name} domain={structureObject.domain}
                                              arity={structureObject.language.functions.get(name.split('/')[0])}
                                              symbol={name.split('/')[0]}
                                              value={structureObject.iFunction.has(name) ? structureObject.iFunction.get(name) : {}}
                                              onInputChange={setFunctionValueTable}
                                              disabled={structure.functions[name].locked}
                                              type={FUNCTION}/>
                        ) : null}
                    </Form.Group>
                )}
        </Col>
    )
}
export default FunctionInterpretation;