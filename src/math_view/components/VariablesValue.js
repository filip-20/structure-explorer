import React, { useState } from 'react';
import {Col, Form, Row} from "react-bootstrap";
import Card from "react-bootstrap/Card";
import TextInput from "../components_parts/TextInput";
import HelpButton from "../../buttons/HelpButton";
import {Collapse} from "react-bootstrap";

const help = (
    <Card id='help-assignment' border='info' className="small mb-3">
        <Card.Body className="p-2">
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
        </Card.Body>
    </Card>
);

const VariablesValue = (props) => {
    const [showHelp, setShowHelp] = useState(false);
    return (
        <Card className={"mt-3"}>
            <Card.Header as="h5" className={"d-flex justify-content-between"}>
                <span>Variable assignment</span>
                <HelpButton onClick={() => setShowHelp(p => !p)}/>
            </Card.Header>
            <Card.Body>
                <Collapse in={showHelp}>
                    {help}
                </Collapse>
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