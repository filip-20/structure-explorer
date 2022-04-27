import {Col, Form, Row} from "react-bootstrap";
import TextInput from "./TextInput";
import React from "react";

function TextComponent({labelText,onChangeSetFunction,onLockFunction,textData,textInputLabel,idName,errorProperty,teacherMode}){
    return(
        <Row>
            <Col lg={12}>
                    <Form.Group>
                        <Form.Label>{labelText}</Form.Label>
                        <TextInput
                            errorProperty={errorProperty}
                            onChange={(e) => onChangeSetFunction(e.target.value)}
                                   onLock={() => onLockFunction()}
                                   textData={textData}
                                   label={textInputLabel}
                                   teacherMode={teacherMode}
                                   id={idName}/>
                    </Form.Group>
            </Col>
        </Row>
    )
}

export default TextComponent;