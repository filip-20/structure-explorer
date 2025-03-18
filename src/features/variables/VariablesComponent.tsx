import { Card, Col, Row } from "react-bootstrap";
import TooltipButton from "../../components_helper/TooltipButton";
import InputGroupTitle from "../../components_helper/InputGroupTitle";
import { InlineMath } from "react-katex";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  selectParsedVariables,
  selectVariables,
  updateVariables,
} from "./variablesSlice";

export default function VariablesComponent() {
  let help: string = "help";
  const dispatch = useAppDispatch();
  const text = useAppSelector(selectVariables);
  const { error, parsed: variables } = useAppSelector(selectParsedVariables);
  return (
    <>
      <Card>
        <Card.Header as="h4">
          <Row>
            <Col>Variable assignment</Col>
            <Col xs="auto">
              <TooltipButton text={help}></TooltipButton>
            </Col>
          </Row>
        </Card.Header>
        <Card.Body>
          <InputGroupTitle
            label={"Variable assignment of individual variables"}
            id="0"
            text={text}
            prefix={<InlineMath>{String.raw`e = \{`}</InlineMath>}
            suffix={<InlineMath>{String.raw`\}`}</InlineMath>}
            placeholder="assignments"
            onChange={(e) => dispatch(updateVariables(e.target.value))}
            error={error}
          ></InputGroupTitle>

          {variables !== undefined &&
            variables.map(({ from, to }) => `${from} -> ${to}\n`)}
        </Card.Body>
      </Card>
    </>
  );
}
