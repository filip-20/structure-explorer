import React, { useState } from 'react';
import {Col, Form, Row} from "react-bootstrap";
import Card from "react-bootstrap/Card";
import TextInput from "../components_parts/TextInput";
import HelpButton from "../../buttons/HelpButton";
import {Collapse} from "react-bootstrap";

const help = (
  <div className="well">
    Tu sa definujú hodnoty premenných. Za premennú sa považuje každý symbol, ktorý nie je v jazyku. Syntax
    zapisovania má formát <code>(premenná, hodnota)</code>.
  </div>
);

const VariablesValue = (props) => {
  const [showHelp, setShowHelp] = useState(false);
  return (
    <Card className={"mt-3"}>
      <Card.Header as="h5" className={"d-flex justify-content-between"}>
        <span>Ohodnotenie premenných</span>
        <HelpButton onClick={() => setShowHelp(p => !p)}/>
      </Card.Header>
      <Card.Body>
        <Collapse in={showHelp}>
          {help}
        </Collapse>
          <Row>
              <Col lg={12}>
                  <Form.Group>
                      <Form.Label>Ohodnotenie premenných</Form.Label>
                      <TextInput
                          errorProperty={props.variables.errorMessage}
                          onChange={(e) => props.onInputChange(e.target.value)}
                          onLock={() => props.lockInput()}
                          textData={props.variables}
                          label={<span><var>e</var> = &#123;</span>}
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