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
  <div style={{textAlign:"justify"}}>
    Pomocou editoru štruktúry sa definuje štruktúra. Prvky <strong>domény</strong> sa oddeľujú čiarkami.
    Pridaním nového symbolu do jazyka sa automaticky pridá vstup na zadanie interpretácie.
    Interpretácia <strong>konštanty</strong> sa vyberá zo selectu, ktorý automaticky obsahuje prvky z
    domény. Interpretácia <strong>predikátového symbolu</strong> s&nbsp;aritou&nbsp;<var>n</var> sa zapisuje vo
    formáte <code>(prvok<sub>1</sub>, …, prvok<sub><var>n</var></sub>)</code>.
    Interpretácia <strong>funkčného symbolu</strong> s&nbsp;aritou&nbsp;<var>n</var> sa zapisuje vo
    formáte <code>(prvok<sub>1</sub>, …, prvok<sub><var>n</var></sub>, hodnota)</code>.
  </div>
);

function Structure({structure,setDomain,lockDomain,teacherMode,setConstantValue,structureObject,lockConstantValue,setPredicateValueText,lockPredicateValue,toggleTable,toggleDatabase,domain,setPredicateValueTable,setFunctionValueText,lockFunctionValue,setFunctionValueTable}) {
  let constants = Object.keys(structure.constants);
  let predicates = Object.keys(structure.predicates);
  let functions = Object.keys(structure.functions);

  const [showHelp, setShowHelp] = useState(false);

  return (
     <Card className={"mt-3"}>
       <Card.Header as={"h5"} className={"d-flex justify-content-between"}>
           <span>Štruktúra 𝓜 = (<var>D</var>, <var>i</var>)</span>
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