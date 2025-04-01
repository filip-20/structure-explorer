import { Card, Col, Row } from "react-bootstrap";
import TooltipButton from "../../components_helper/TooltipButton";
import InputGroupTitle from "../../components_helper/InputGroupTitle";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { InlineMath } from "react-katex";
import {
  selectDomain,
  updateDomain,
  selectParsedDomain,
  updateInterpretationConstants,
  selectIc,
  selectIp,
  updateInterpretationPredicates,
  selectIndividualConstant,
  selectPredicateSymbol,
  selectParsedConstant,
  selectFunctionSymbol,
  updateFunctionSymbols,
  selectIf,
  selectParsedPredicate,
} from "./structureSlice";
import {
  selectParsedConstants,
  selectParsedFunctions,
  selectParsedPredicates,
} from "../language/languageSlice";

import InterpretationInput from "./InterpretationInput";
import InterpretationInputIp from "./InterpretationInputIp";
import InterpretationInputIf from "./InterpretationInputIf";

export default function StructureComponent() {
  let help: string = "help";
  const dispatch = useAppDispatch();
  const domainText = useAppSelector(selectDomain);
  const domainError = useAppSelector(selectParsedDomain);
  const constants = useAppSelector(selectParsedConstants);
  const predicates = useAppSelector(selectParsedPredicates);
  const functions = useAppSelector(selectParsedFunctions);
  const constantsInterpretation = useAppSelector(selectIc);
  const predicatesInterpretation = useAppSelector(selectIp);
  const functionsInterpretation = useAppSelector(selectIf);
  return (
    <>
      <Card className="mb-3">
        <Card.Header as="h2" className="h4">
          <Row>
            <Col>
              Structure{" "}
              <InlineMath>{String.raw`\mathcal{M} = (D, i)`}</InlineMath>
            </Col>
            <Col xs="auto">
              <TooltipButton text={help}></TooltipButton>
            </Col>
          </Row>
        </Card.Header>
        <Card.Body>
          <InputGroupTitle
            label={"Domain"}
            id="0"
            prefix={<InlineMath>{String.raw`\mathcal{D} = \{`}</InlineMath>}
            suffix={<InlineMath>{String.raw`\}`}</InlineMath>}
            placeholder="Domain"
            text={domainText}
            onChange={(e) => {
              dispatch(updateDomain(e.target.value));
            }}
            error={domainError.error}
          ></InputGroupTitle>
          {constants.parsed && constants.parsed.size > 0 && (
            <h3 className="h6">Constants interpretation</h3>
          )}
          {Array.from(constants.parsed ?? []).map((values, index) => (
            <>
              <InterpretationInput //vraciat rovnaky objekt - aj meno
                name={values}
                id={`constant-${index}`}
                selector={selectIndividualConstant}
                parser={selectParsedConstant}
                onChange={(e) => {
                  dispatch(
                    updateInterpretationConstants({
                      key: values,
                      value: e.target.value,
                    })
                  );
                }}
              ></InterpretationInput>
            </>
          ))}
          {predicates.parsed && predicates.parsed.size > 0 && (
            <h3 className="h6">Predicates interpretation</h3>
          )}
          {Array.from(predicates.parsed ?? []).map((values, index) => (
            <>
              {/* <InterpretationInput
                name={values[0]}
                selector={selectPredicateSymbol}
                parser={selectParsedPredicate}
                onChange={(e) => {
                  dispatch(
                    updateInterpretationPredicates({
                      key: values[0],
                      value: e.target.value,
                    })
                  );
                }}
              ></InterpretationInput> */}

              <InterpretationInputIp
                name={values[0]}
                //id={`predicate-${index}`}
                selector={selectPredicateSymbol}
                onChange={(e) => {
                  dispatch(
                    updateInterpretationPredicates({
                      key: values[0],
                      value: e.target.value,
                    })
                  );
                }}
              ></InterpretationInputIp>
            </>
          ))}
          {functions.parsed && functions.parsed.size > 0 && (
            <h3 className="h6">Functions interpretation</h3>
          )}
          {Array.from(functions.parsed ?? []).map((values, index) => (
            <>
              <InterpretationInputIf
                name={values[0]}
                //id={`function-${index}`}
                selector={selectFunctionSymbol}
                onChange={(e) => {
                  dispatch(
                    updateFunctionSymbols({
                      key: values[0],
                      value: e.target.value,
                    })
                  );
                }}
              ></InterpretationInputIf>
            </>
          ))}
          Interpretations: <br />
          {Object.entries(constantsInterpretation).map(
            ([i, j]) => i + " => " + j.text + ";"
          )}
          {Object.entries(predicatesInterpretation).map(
            ([i, j]) => i + " => " + j.text + ";"
          )}
          {Object.entries(functionsInterpretation).map(
            ([i, j]) => i + " => " + j.text + ";"
          )}
        </Card.Body>
      </Card>
    </>
  );
}
