import React, { useState } from 'react';
import {
    Button, Col,
    Collapse,
    Form,
    InputGroup,
    Row,
    Table,
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
  <Card id='help-formulas' border='info' className="small mb-3">
    <Card.Body className="p-2">
      <p>The truth of closed first-order formulas in the structure 𝓜
        and the satisfaction of open first-order formulas
        by the valuation of variables 𝑒 in 𝓜
        can be examined in this section.</p>
      <p>The desired/expected truth or satisfaction can be selected
        from the ⊨/⊭ menu below a formula.
        Structure Explorer checks the correctness of your selection.</p>
      <p className='mb-0'>Syntactic requirements:</p>
      <ul className='mb-0'>
        <li>All non-logical symbols used in formulas
          must come from the language 𝓛
          and must be used according to their type and arity.
          All other alphanumerical symbols are treated as variables.</li>
        <li>Formulas must be properly parenthesized.</li>
        <li>The following notation of logical symbols is accepted:
          <Table size='sm' striped className="my-2 border-bottom">
            <tr><th>Symbol</th><th>Notation</th></tr>
            <tr><td>Equality</td><td> =, ≐</td></tr>
            <tr><td>Non-equality</td><td> !=, {'<>'}, /=, ≠</td></tr>
            <tr><td>Negation</td><td> \neg, \lnot, -, !, ~, ¬</td></tr>
            <tr><td>Conjunction</td><td> \wedge, \land, &&, &, /\, ∧</td></tr>
            <tr><td>Disjunction</td><td> \vee, \lor, ||, |, \/, ∨</td></tr>
            <tr><td>Implication</td><td> \to, \limpl, {'->'}, →</td></tr>
            <tr><td>Equivalence</td><td> \lequiv, \leftrightarrow, {'<->'}, ↔︎</td></tr>
            <tr><td>Existential quantifier</td><td> \exists, \e, \E, ∃</td></tr>
            <tr><td>General quantifier</td><td> \forall, \a, \A, ∀</td></tr>
          </Table>
        </li>
        <li>The priority of logical symbols:
          <ol className="my-0">
            <li>≐, ≠ (highest priority)</li>
            <li>¬, ∀, ∃</li>
            <li>∧ (left-associative, i.e., A ∧ B ∧ C ≡ ((A ∧ B) ∧ C))</li>
            <li>∨ (left-associative)</li>
            <li>→ (right-associative, i.e., A → B → C ≡ (A → (B → C)))</li>
            <li>↔︎ (non-associative, lowest priority)</li>
          </ol>
        </li>
      </ul>
    </Card.Body>
  </Card>
);

const helpTerm = (
  <Card id='help-terms' border='info' className="small mb-3">
    <Card.Body className="p-2">
      <p>Denotations of first-order terms in the structure 𝓜
        for the valuation of variables 𝑒
        can be examined in this section.</p>
      <p>The desired/expected denotation can be selected
        from the menu below the term.
        Structure Explorer checks the correctness of your selection.</p>
      <p className='mb-0'>Syntactic requirements:</p>
      <ul className='mb-0'>
        <li>All individual constants and function symbols used in the terms
          must come from the language 𝓛
          and must be used according to their type and arity.
          All other alphanumerical symbols are treated as variables.</li>
        <li>Terms must be properly parenthesized.</li>
      </ul>
    </Card.Body>
  </Card>
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
     <option value={''}>Select a domain element…</option>
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
    panelTitle: 'Truth of formulas in 𝓜'
  };
  let t = {
    items: terms,
    expressionType: TERM,
    answers: (domain) => getTermAnswers(domain),
    help: helpTerm,
    panelTitle: 'Denotation of terms in 𝓜'
  };
  return [f, t];
}

const Expressions = (props) => {
  const [showHelp, setShowHelp] = useState({});
  return (
    <React.Fragment>
      {prepareExpressions(props.formulas, props.terms).map(expression =>
        <Card className='mb-3' key={expression.expressionType}>
          <Card.Header as='h5' className='d-flex justify-content-between'>
            <span>{expression.panelTitle}</span>
            <HelpButton onClick={() => setShowHelp(p => {const k = expression.expressionType.toLowerCase(); p[k] = (p[k] === undefined ? true : undefined); return Object.create(p)})}/>
          </Card.Header>
          <Card.Body>
            <Collapse in={showHelp[expression.expressionType.toLowerCase()] === true}>
              {expression.help}
            </Collapse>
            {expression.items.map((item, index) =>
              <Form key={"expression-form-" + index}>
                <Form.Group>
                  <InputGroup size='sm' className='mb-1 has-validation'>
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
                  <Form.Row className='align-items-center'>
                    <Col xs="auto" className='mb-1'>
                      <InputGroup size='sm'>
                        <InputGroup.Prepend>
                          <InputGroup.Text as='label' for={expression.expressionType.toLowerCase() + '-answer-' + index}>
                            { expression.expressionType === TERM
                                ? <>{EXPRESSION_LABEL[expression.expressionType]}<sub>{index + 1}</sub><sup>𝓜</sup>[𝑒] =</>
                                : '𝓜' }
                          </InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control as="select" value={item.answerValue}
                          onChange={(e) => props.setExpressionAnswer(expression.expressionType, e.target.value, index)}
                          id={expression.expressionType.toLowerCase() + '-answer-' + index}
                          disabled={item.answerLocked}
                          className="custom-select">
                          {expression.answers(props.domain)}
                        </Form.Control>

                        {expression.expressionType === TERM
                          ? null
                          : (
                            <InputGroup.Append>
                              <InputGroup.Text id={expression.expressionType.toLowerCase() + '-answer-' + index}>𝝋<sub>{index + 1}</sub>[𝑒]</InputGroup.Text>
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
                    </Col>

                    <Col className="pr-0 text-nowrap mb-1">
                      {item.answerValue !== '' && item.answerValue !== '-1' ?
                        (item.answerValue === item.expressionValue ?
                          <strong className="text-success pr-0"><FontAwesome
                            name='check' /><span className='d-none d-sm-inline'>&nbsp;Correct</span></strong> :
                          <strong className="text-danger"><FontAwesome
                            name='times' /><span className='d-none d-sm-inline'>&nbsp;Incorrect</span></strong>
                        ) : null}
                    </Col>

                    <Col className="pr-0 mb-1">
                      {expression.expressionType === FORMULA ?
                        <HenkinHintikkaGameButton
                          onClick={() => props.initiateGame(index)}
                          enabled={item.gameEnabled} /> : null}
                    </Col>
                  </Form.Row>
                  {item.gameEnabled
                    ? <HenkinHintikkaGameContainer index={index}
                          formula={item}
                          domain={props.domain} />
                    : null}
                </Form.Group>
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