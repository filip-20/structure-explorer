import React, { useState } from 'react';
import {Col, Form, Row} from "react-bootstrap";
import Card from "react-bootstrap/Card";
import TextInput from "../components_parts/TextInput";
import Help from "../../buttons/Help";
import {Collapse} from "react-bootstrap";

const assignmentHelp = (
    <>
        <p>An assignment of individual variables
            (i.e., a partial map from individual variables to the domain 𝐷)
            is defined in this section.</p>
        <p>Any alphanumeric symbol that is not an individual constant,
            predicate, or function symbol is considered a variable.</p>
        <p className='mb-0'>Elements of the assignment are comma-separated ordered pairs.
            Each pair can be written as <code>(variable, element)</code>
            or <code>variable ↦ element</code>.
            The maps-to symbol <code>↦</code> can also be written as{" "}
            <code>-></code>, <code>|-></code>, <code>\mapsto</code>,
            or <code>⟼</code>.</p>
    </>
);

const VariablesValue = (props) => {
    const [showHelp, setShowHelp] = useState(false);
    return (
        <Card className={"mb-3"}>
            <Card.Header as="h5" className={"d-flex justify-content-between"}>
                <span>Variable assignment</span>
                <Help subject='language'
                    children={assignmentHelp}
                    onToggle={setShowHelp}
                    show={showHelp} />
            </Card.Header>
            <Card.Body>
                <Row>
                    <Col lg={12}>
                        <Form.Group>
                            <Form.Label>Assignment of individual variables</Form.Label>
                            <TextInput
                                errorProperty={props.variables.errorMessage}
                                onChange={(e) => props.onInputChange(e.target.value)}
                                onLock={() => props.lockInput()}
                                textData={props.variables}
                                label={<span>𝑒 = &#123;</span>}
                                teacherMode={props.teacherMode}
                                id='editor-variables'/>
                        </Form.Group>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
}

export default VariablesValue;