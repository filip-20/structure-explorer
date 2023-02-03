import React, { useState } from 'react';
import Card from "react-bootstrap/Card";
import HelpButton from "../../buttons/HelpButton";
import TextComponent from "../components_parts/TextComponent";
import ComponentLockButton from "../../buttons/ComponentLockButton";
import {Collapse} from "react-bootstrap";

const languageHelp = (
    <Card id='help-language' border='info' className="small mb-3">
        <Card.Body className="p-2">
            <p>A first-order language is defined in this section.</p>
            <p>The Edit/Done button toggles between editing
            the language and viewing it in a more compact form.</p>
            <p className="mb-0">Syntactic requirements:</p>
            <ul className="mb-0">
                <li>Symbols in all sets are <strong>comma-separated</strong>.</li>
                <li>Each predicate and function symbol
                must be followed by a slash (<code>/</code>) and arity
                (the number of arguments the symbol takes, a positive integer):{" "}
                <strong><code>symbol/arity</code></strong>.</li>
            </ul>
        </Card.Body>
    </Card>
);

function constantComponent(props) {
    if(props.language.lockedComponent){
        return (
            <p><span>𝓒<sub>𝓛</sub> = &#123;</span> {props.language.constants.parsed.join(', ')} &#125;</p>
        );
    } else {
        return(
            <TextComponent labelText={"Individual constant"}
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
            <TextComponent labelText={"Predicate symbols"}
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
            <TextComponent labelText={"Function symbols"}
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
          <span>Language 𝓛</span>
          <div className={"d-flex justify-content-left"}>
            <ComponentLockButton lockFn={() => props.lockLanguageComponent()}
                locked={props.language.lockedComponent} subject='language'/>
            <HelpButton subject='language'
                onClick={() => setShowHelp(p => !p)}
                active={showHelp} />
          </div>
      </Card.Header>
      <Card.Body>
        <Collapse in={showHelp}>
            { languageHelp }
        </Collapse>
        {constantComponent(props)}
        {predicateComponent(props)}
        {functionComponent(props)}
      </Card.Body>
    </Card>
  );
}

export default Language;