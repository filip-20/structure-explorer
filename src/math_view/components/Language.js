import React, { useContext, useState, useMemo } from 'react';
import Card from "react-bootstrap/Card";
import Help from "../../buttons/Help";
import TextComponent from "../components_parts/TextComponent";
import ComponentLockButton from "../../buttons/ComponentLockButton";
import {Collapse} from "react-bootstrap";
import { LogicContext } from '../../logicContext';
import produce from 'immer';

const languageHelp = (
    <>
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
    </>
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
  const context = useContext(LogicContext);

  // load language from context when context is present
  useMemo(() => {
    context && props.setConstants(context.constants.join(', '));
  }, [context?.constants]);
  useMemo(() => {
    context && props.setPredicates(context.predicates.map(({name, arity}) => `${name}/${arity}`).join(', '));
  }, [context?.predicates]);
  useMemo(() => {
    context && props.setFunctions(context.functions.map(({name, arity}) => `${name}/${arity}`).join(', '));
  }, [context?.functions]);
  // force lock language when context is present
  context && (props = produce(props, draft => {draft.language.lockedComponent = true}));

  return (
    <Card className='mb-3'>
      <Card.Header as="h5" className={"d-flex justify-content-between"}>
          <span>Language 𝓛</span>
          <div className={"d-flex justify-content-left"}>
            {!context && <ComponentLockButton lockFn={() => props.lockLanguageComponent()}
                locked={props.language.lockedComponent} subject='language'/>}
            <Help subject='language'
                children={languageHelp}
                onToggle={setShowHelp}
                show={showHelp} />
          </div>
      </Card.Header>
      <Card.Body>
        {constantComponent(props)}
        {predicateComponent(props)}
        {functionComponent(props)}
      </Card.Body>
    </Card>
  );
}

export default Language;