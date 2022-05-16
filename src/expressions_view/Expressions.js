import React, { useState } from 'react';
import {
    Button, Col,
    Collapse,
    Form,
    InputGroup,
    Row,
} from "react-bootstrap";
import Card from "react-bootstrap/Card";
import {EXPRESSION_LABEL, FORMULA, TERM} from "../constants";
import FontAwesome from 'react-fontawesome';
import LockButton from '../buttons/LockButton';
import HelpButton from "../buttons/HelpButton";
import AddButton from "../buttons/AddButton";
import HenkinHintikkaGameButton from "../buttons/HenkinHintikkaGameButton";
import HenkinHintikkaGameContainer from "../redux/containers/HenkinHintikkaGameContainer";

const helpFormula = (
  <div className="well">
    Tu je možné overiť, či ľubovoľná formula spĺňa vyššie definovanú štruktúru. Všetky termy a predikáty
    musia byť definované v jazyku. Ak formula nie je zapísaná v správnej syntaxi, nevyhodnotí sa. Je potrebné
    dodržiavať správne uzátvorkovanie podformúl. Napravo od
    formuly sa vyberá možnosť splnenia alebo nesplnenia formuly v štruktúre. Sú povolené nasledujúce symboly
    spojok, atómov a kvantifikátorov a žiadne iné:
    <ul>
      <li>Konjunkcia: \wedge, \land, &&, &, /\, ∧</li>
      <li>Disjunkcia: \vee, \lor, ||, |, \/, ∨</li>
      <li>Implikácia: \to, →, -{'>'}</li>
      <li>Existenčný kvantifikátor: \exists, \e, \E, ∃</li>
      <li>Všeobecný kvantifikátor: \forall, \a, \A, ∀</li>
      <li>Negácia: \neg, \lnot, -, !, ~, ¬</li>
      <li>Rovnosť: =</li>
      <li>Nerovnosť: !=, &#60;&#62;, /=, &#8800;</li>
    </ul>
  </div>
);

const helpTerm = (
  <div className="well">
    Tu sa pridávajú termy a je možné zistiť ich hodnotu na základe vyššie definovanej štruktúry. Všetky termy
    musia byť definované v jazyku. Každý symbol premennej, symbol konštanty a funkčný symbol sa považuje za term.
    Predikátový symbol nie je term.
  </div>
);

const getFormulaAnswers = () => (
   <React.Fragment>
     <option key={'-1'} value={'-1'}>⊨/⊭?</option>
     <option key={'true'} value={'true'}>⊨</option>
     <option key={'false'} value={'false'}>⊭</option>
   </React.Fragment>
);

const getTermAnswers = (domain) => (
   <React.Fragment>
     <option value={''}>Vyber hodnotu ...</option>
     {domain.map(item =>
        <option key={item} value={item}>{item}</option>
     )}
   </React.Fragment>
);

function prepareExpressions(formulas, terms) {
  let f = {
    items: formulas,
    expressionType: FORMULA,
    answers: () => getFormulaAnswers(),
    help: helpFormula,
    panelTitle: 'Pravdivosť formúl v štruktúre 𝓜'
  };
  let t = {
    items: terms,
    expressionType: TERM,
    answers: (domain) => getTermAnswers(domain),
    help: helpTerm,
    panelTitle: 'Hodnoty termov v 𝓜'
  };
  return [f, t];
}

const Expressions = (props) => {
  const [showHelp, setShowHelp] = useState({});
  return (
    <React.Fragment>
      {prepareExpressions(props.formulas, props.terms).map(expression =>
        <Card className={expression.expressionType == TERM ? "mt-3" : ""} key={expression.expressionType}>
          <Card.Header as={"h5"} className={"d-flex justify-content-between"}>
            <span>{expression.panelTitle}</span>
            <HelpButton onClick={() => setShowHelp(p => {const k = expression.expressionType.toLowerCase(); p[k] = (p[k] === undefined ? true : undefined); return Object.create(p)})}/>
          </Card.Header>
          <Card.Body>
            <Collapse in={showHelp[expression.expressionType.toLowerCase()] === true}>
              {expression.help}
            </Collapse>
            {expression.items.map((item, index) =>
              <Form key={"expression-form-" + index}>
                <Form.Group className="mb-1">
                  <InputGroup size='sm'>
                    <InputGroup.Prepend>
                      <InputGroup.Text id={expression.expressionType.toLowerCase() + '-' + index}>{EXPRESSION_LABEL[expression.expressionType]}<sub>{index + 1}</sub></InputGroup.Text>
                    </InputGroup.Prepend>
                    <Form.Control type='text' value={item.value}
                      onChange={(e) => props.onInputChange(e.target.value, index, expression.expressionType)}
                      id={expression.expressionType.toLowerCase() + '-' + index}
                      disabled={item.inputLocked}
                      isInvalid={item.errorMessage.length > 0}
                      onFocus={() => {
                        props.diagramModel.clearSelection();
                      }}
                    />
                    <InputGroup.Append>
                      <Button variant={"outline-danger"} onClick={() => props.removeExpression(expression.expressionType, index)}>
                        <FontAwesome name='fas fa-trash' />
                      </Button>
                      {props.teacherMode ? (
                        <LockButton
                          lockFn={() => props.lockExpressionValue(expression.expressionType, index)}
                          locked={item.inputLocked} />
                      ) : null}
                    </InputGroup.Append>
                    <Form.Control.Feedback type={"invalid"}>{item.errorMessage}</Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>
                <Form.Row>
                  <Col xs={true} sm={true} md={true} lg={true}>
                    <Form.Group>
                      <InputGroup size='sm'>
                        <InputGroup.Prepend>
                          <InputGroup.Text id={expression.expressionType.toLowerCase() + '-answer-' + index}>𝓜</InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control as="select" value={item.answerValue}
                          onChange={(e) => props.setExpressionAnswer(expression.expressionType, e.target.value, index)}
                          id={expression.expressionType.toLowerCase() + '-answer-' + index}
                          disabled={item.answerLocked}
                          className="custom-select">
                          {expression.answers(props.domain)}
                        </Form.Control>

                        {expression.expressionType === TERM ? null : (
                          <InputGroup.Append>
                            <InputGroup.Text id={expression.expressionType.toLowerCase() + '-answer-' + index}>𝝋<sub>{index + 1}</sub>[e]</InputGroup.Text>
                          </InputGroup.Append>
                        )}
                        {props.teacherMode ? (
                          <InputGroup.Append>
                            <LockButton
                              lockFn={() => props.lockExpressionAnswer(expression.expressionType, index)}
                              locked={item.answerLocked} />
                          </InputGroup.Append>
                        ) : null}
                      </InputGroup>
                    </Form.Group>
                  </Col>

                  <Col className={"pt-1 no-padding-right"}>
                    {item.answerValue !== '' && item.answerValue !== '-1' ?
                      (item.answerValue === item.expressionValue ?
                        <strong className="text-success no-padding-right"><FontAwesome
                          name='check' /><span className={'hidden-on-medium-and-lower'}>&nbsp;Správne</span></strong> :
                        <strong className="text-danger"><FontAwesome
                          name='times' /><span className={'hidden-on-medium-and-lower'}>&nbsp;Nesprávne</span></strong>
                      ) : null}
                  </Col>

                  <Col xs={true} sm={true} md={true} lg={true} className={"no-padding-right"}>
                    {expression.expressionType === FORMULA ?
                      <HenkinHintikkaGameButton
                        onClick={() => props.initiateGame(index)}
                        enabled={item.gameEnabled} /> : null}
                  </Col>
                </Form.Row>
                <Form.Row>
                  {item.gameEnabled ? <HenkinHintikkaGameContainer formula={item} domain={props.domain} index={index} /> : null}
                </Form.Row>
              </Form>
            )}
            <AddButton onClickAddFunction={props.addExpression} addType={expression.expressionType} />
          </Card.Body>
        </Card>
      )}
    </React.Fragment>
  );
}

export default Expressions;