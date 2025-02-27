import { Col, Row } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Formula from "./Formula";
import TooltipButton from "../../components_helper/TooltipButton";
import Button from "react-bootstrap/Button";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectFormulas, FormulaState, add } from "./formulasSlice";
import { InlineMath } from "react-katex";

interface Props {
  type: string;
  help: string;
}

export default function FormulaCard({ type, help }: Props) {
  const dispatch = useAppDispatch();
  const allFormulas = useAppSelector(selectFormulas);

  return (
    <>
      <Card>
        <Card.Header as="h4">
          <Row>
            <Col>
              {type == "formula" && "Truth of formulas in "}
              <InlineMath>{String.raw`\mathcal{M}`}</InlineMath>
              {type == "term" && "Denotation of terms in M"}
            </Col>
            <Col>
              <TooltipButton text={help}></TooltipButton>
            </Col>
          </Row>
        </Card.Header>
        <Card.Body>
          {allFormulas.map((formula: FormulaState, index: number) => (
            <Formula
              id={index}
              key={index}
              text={formula.text}
              guess={formula.guess}
            />
          ))}
        </Card.Body>
        <Button onClick={() => dispatch(add())}>Add</Button>
      </Card>
    </>
  );
}
