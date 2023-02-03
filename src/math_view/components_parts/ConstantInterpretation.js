import {Col, Form, InputGroup} from "react-bootstrap";
import LockButton from "../../buttons/LockButton";
import React from "react";

export function ConstantInterpretation({structure,setConstantValue,structureObject,teacherMode,lockConstantValue}){
    return(
    <Col lg={12}>
        <Form>
            <Form.Label>Interpretation of individual constants</Form.Label>
            {Object.keys(structure.constants).map((constant) =>
                <Form.Group key={constant} >
                    <InputGroup size='sm'>
                        <InputGroup.Prepend>
                            <InputGroup.Text id={'constant-' + constant}><var>i</var>({constant}) = </InputGroup.Text>
                        </InputGroup.Prepend>

                        <Form.Control as="select" value={structure.constants[constant].value}
                                      id={'constant-' + constant}
                                      onChange={(e) => setConstantValue(e.target.value, constant)}
                                      disabled={structure.constants[constant].locked}
                                      isInvalid={structure.constants[constant].errorMessage.length > 0}
                                      className="custom-select">
                            <option key={''} value={''}>Vyber hodnotu ...</option>
                            {[...structureObject.domain].map((item) =>
                                <option key={item} value={item}>{item}</option>
                            )}
                        </Form.Control>
                        {teacherMode ? (
                            <InputGroup.Append>
                                <LockButton lockFn={() => lockConstantValue(constant)}
                                            locked={structure.constants[constant].locked}/>
                            </InputGroup.Append>
                        ) : null}
                        <Form.Control.Feedback type={"invalid"}>{structure.constants[constant].errorMessage}</Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>
            )}
        </Form>
    </Col>
    )
}
