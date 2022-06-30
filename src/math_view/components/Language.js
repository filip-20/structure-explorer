import React, { useState } from 'react';
import Card from "react-bootstrap/Card";
import HelpButton from "../../buttons/HelpButton";
import TextComponent from "../components_parts/TextComponent";
import ComponentLockButton from "../../buttons/ComponentLockButton";
import {Collapse} from "react-bootstrap";

const help = (
  <div className="well">
    Tu sa definuje jazyk. <strong>Symboly konštánt</strong> sa definujú oddelene
    čiarkou. <strong>Symboly predikátov</strong> sa definujú oddelené čiarkami, vo
    formáte <code>predikat/arita</code>. <strong>Symboly funkcií</strong> sa definujú oddelené čiarkami, vo
    formáte <code>funkcia/arita</code>.
  </div>
);

function constantComponent(props) {
    if(props.language.lockedComponent){
        return (
            <p><span>𝓒<sub>𝓛</sub> = &#123;</span> {props.language.constants.parsed.join(', ')} &#125;</p>
        );
    } else {
        return(
            <TextComponent labelText={"Indivíduové konštanty"}
                           errorProperty={props.language.constants.errorMessage}
                           onChangeSetFunction={props.setConstants}
                           onLockFunction={props.lockConstants}
                           textData={props.language.constants}
                           textInputLabel={<span>𝓒<sub>𝓛</sub> = &#123;</span>}
                           teacherMode={props.teacherMode}
                           idName={'language-editor-constants'}
            />
        );
    }
}

function predicateComponent(props) {
    if(props.language.lockedComponent){
        return (
            <p><span>𝓟<sub>𝓛</sub> = &#123;</span> {props.language.predicates.parsed.map(tuple => tuple.name + '/' + tuple.arity).join(', ')} &#125;</p>
        );
    } else {
        return(
            <TextComponent labelText={"Predikátové symboly"}
                           errorProperty={props.language.predicates.errorMessage}
                           onChangeSetFunction={props.setPredicates}
                           onLockFunction={props.lockPredicates}
                           textData={props.language.predicates}
                           textInputLabel={<span>𝓟<sub>𝓛</sub> = &#123;</span>}
                           teacherMode={props.teacherMode}
                           idName={'language-editor-predicates'}
            />
        );
    }
}

function functionComponent(props) {
    if(props.language.lockedComponent){
        return (
            <p><span>𝓕<sub>𝓛</sub> = &#123;</span> {props.language.functions.parsed.map(tuple => tuple.name + '/' + tuple.arity).join(', ')} &#125;</p>
        );
    } else {
        return(
            <TextComponent labelText={"Funkčné symboly"}
                           errorProperty={props.language.functions.errorMessage}
                           onChangeSetFunction={props.setFunctions}
                           onLockFunction={props.lockFunctions}
                           textData={props.language.functions}
                           textInputLabel={<span>𝓕<sub>𝓛</sub> = &#123;</span>}
                           teacherMode={props.teacherMode}
                           idName={'language-editor-functions'}
            />
        );
    }
}

const Language = (props) => {
  const [showHelp, setShowHelp] = useState(false);

  return (
    <Card className={"no-border-radius"}>
      <Card.Header as="h5" className={"d-flex justify-content-between"}>
          <span>Jazyk 𝓛</span>
          <div className={"d-flex justify-content-left"}>
            <ComponentLockButton lockFn={() => props.lockLanguageComponent()} locked={props.language.lockedComponent}/>
            <HelpButton onClick={() => setShowHelp(p => !p)} />
          </div>
      </Card.Header>
      <Card.Body>
        <Collapse in={showHelp}>
          {help}
        </Collapse>
        {constantComponent(props)}
        {predicateComponent(props)}
        {functionComponent(props)}
      </Card.Body>
    </Card>
  );
}

export default Language;