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
  updateInterpretationPredicates,
  selectIcName,
  selectParsedConstant,
  updateFunctionSymbols,
  selectParsedPredicate,
  selectIpName,
  selectIfName,
  selectParsedFunction,
} from "./structureSlice";
import {
  selectParsedConstants,
  selectParsedFunctions,
  selectParsedPredicates,
} from "../language/languageSlice";

import InterpretationInput from "./InterpretationInput";

export default function StructureComponent() {
  let help: string = "help";
  const dispatch = useAppDispatch();
  const domainText = useAppSelector(selectDomain);
  const domainError = useAppSelector(selectParsedDomain);
  const constants = useAppSelector(selectParsedConstants);
  const predicates = useAppSelector(selectParsedPredicates);
  const functions = useAppSelector(selectParsedFunctions);
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
          {Array.from(constants.parsed ?? []).map((name, index) => (
            <InterpretationInput
              name={name}
              id={`constant-${index}`}
              key={`constant-${index}`}
              selector={selectIcName}
              parser={selectParsedConstant}
              onChange={(e) => {
                dispatch(
                  updateInterpretationConstants({
                    key: name,
                    value: e.target.value,
                  })
                );
              }}
            ></InterpretationInput>
          ))}
          {predicates.parsed && predicates.parsed.size > 0 && (
            <h3 className="h6">Predicates interpretation</h3>
          )}
          {Array.from(predicates.parsed ?? []).map(([name, _], index) => (
            <InterpretationInput
              name={name}
              id={`predicate-${index}`}
              key={`predicate-${index}`}
              selector={selectIpName}
              parser={selectParsedPredicate}
              onChange={(e) => {
                dispatch(
                  updateInterpretationPredicates({
                    key: name,
                    value: e.target.value,
                  })
                );
              }}
            ></InterpretationInput>
          ))}
          {functions.parsed && functions.parsed.size > 0 && (
            <h3 className="h6">Functions interpretation</h3>
          )}
          {Array.from(functions.parsed ?? []).map(([from, _], index) => (
            <InterpretationInput
              name={from}
              id={`function-${index}`}
              key={`function-${index}`}
              selector={selectIfName}
              onChange={(e) => {
                dispatch(
                  updateFunctionSymbols({
                    key: from,
                    value: e.target.value,
                  })
                );
              }}
              parser={selectParsedFunction}
            ></InterpretationInput>
          ))}
        </Card.Body>
      </Card>
    </>
  );
}
