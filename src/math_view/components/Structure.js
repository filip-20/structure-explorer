import React, { useState } from 'react';
import {
  Row
} from "react-bootstrap";
import Card from "react-bootstrap/Card";

import Domain from "../components_parts/Domain";
import {ConstantInterpretation} from "../components_parts";
import PredicateInterpretation from "../components_parts/PredicateInterpretation";
import FunctionInterpretation from "../components_parts/FunctionInterpretation";
import HelpButton from "../../buttons/HelpButton";
import {Collapse} from "react-bootstrap";

const help = (
    <Card id='help-structure' border='info' className="small mb-3">
        <Card.Body className="p-2">
            <p>
              A first-order structure for language 𝓛
              is defined in this section.
              When the language is modified,
              inputs for interpretations of symbols are updated accordingly.
            </p>
            <p className='mb-0'>Syntactic requirements:</p>
            <ul className='mb-0'>
              <li>Elements in all sets (the domain, interpretations of
                predicates and functions) are comma-separated.</li>
              <li>Strings of any Unicode characters except spaces, comma,
                and parentheses can be used as domain elements.</li>
              <li>An individual constant is interpreted a domain element
                picked from a menu.</li>
              <li>A unary predicate symbol is interpreted as
                a set of domain elements.</li>
              <li>An <var>n</var>-ary predicate symbol
                for <var>n</var> &gt; 1 is interpreted as
                a set of <var>n</var>-tuples of domain elements.
                Each <var>n</var>-tuple is written as{" "}
                <code>(elem<sub>1</sub>, …, elem<sub><var>n</var></sub>)</code>.</li>
              <li>An <var>n</var>-ary function symbol is interpreted as
                a set of (<var>n</var>+1)-tuples of domain elements,
                each written as{" "}
                <code>(arg<sub>1</sub>, …, arg<sub><var>n</var></sub>, value)</code>.</li>
            </ul>
        </Card.Body>
    </Card>
);

function Structure({structure,setDomain,lockDomain,teacherMode,setConstantValue,structureObject,lockConstantValue,setPredicateValueText,lockPredicateValue,toggleTable,toggleDatabase,domain,setPredicateValueTable,setFunctionValueText,lockFunctionValue,setFunctionValueTable}) {
  let constants = Object.keys(structure.constants);
  let predicates = Object.keys(structure.predicates);
  let functions = Object.keys(structure.functions);

  const [showHelp, setShowHelp] = useState(false);

  return (
     <Card className={"mt-3"}>
       <Card.Header as={"h5"} className={"d-flex justify-content-between"}>
           <span>Structure 𝓜 = (<var>D</var>, <var>i</var>)</span>
           <HelpButton onClick={() => setShowHelp(p => !p)}/>
       </Card.Header>

       <Card.Body>
         <Collapse in={showHelp}>
          {help}
         </Collapse>
           <Row>
               <Domain structure={structure} setDomain={setDomain} lockDomain={lockDomain} teacherMode={teacherMode} lengthOfCol={12}/>
           </Row>
         {constants.length === 0 ? null : (
            <Row>
                <ConstantInterpretation structure={structure} teacherMode={teacherMode} constants={constants} lockConstantValue={lockConstantValue} setConstantValue={setConstantValue} structureObject={structureObject} lengthOfCol={12}/>
            </Row>
         )}
         {predicates.length === 0 ? null : (
            <Row>
                <PredicateInterpretation structureObject={structureObject} structure={structure} toggleDatabase={toggleDatabase} teacherMode={teacherMode} domain={domain} lockPredicateValue={lockPredicateValue} predicates={predicates} setPredicateValueTable={setPredicateValueTable} setPredicateValueText={setPredicateValueText} toggleTable={toggleTable} lengthOfCol={12}/>
            </Row>
         )}
         {functions.length === 0 ? null : (
            <Row>
                <FunctionInterpretation toggleTable={toggleTable} toggleDatabase={toggleDatabase} domain={domain} teacherMode={teacherMode} structure={structure} structureObject={structureObject} functions={functions} lockFunctionValue={lockFunctionValue} setFunctionValueTable={setFunctionValueTable} setFunctionValueText={setFunctionValueText} lengthOfCol={12}/>
            </Row>
         )}
       </Card.Body>
     </Card>
  )
}

export default Structure;