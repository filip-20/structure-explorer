import {Col} from "react-bootstrap";
import React from "react";
import TextComponent from "./TextComponent";

function Domain({structure,setDomain,lockDomain,teacherMode}) {
    return (
        <Col>
        <TextComponent onChangeSetFunction={setDomain}
                       errorProperty={structure.domain.errorMessage} textInputLabel={<span><var>D</var> = &#123;</span>} onLockFunction={lockDomain} textData={structure.domain} teacherMode={teacherMode} idName={'language-editor-domain'} labelText={"Domain"}>
        </TextComponent>
        </Col>
    )
}

export default Domain;