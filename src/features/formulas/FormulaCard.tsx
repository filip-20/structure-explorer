import { Col, Row } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import FormulaComponent from "./FormulaComponent";
import TooltipButton from "../../components_helper/TooltipButton";
import Button from "react-bootstrap/Button";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectFormulas, FormulaState, add } from "./formulasSlice";
import { InlineMath } from "react-katex";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

interface Props {
  type: string;
  help: string;
}

export default function FormulaCard({ type, help }: Props) {
  const dispatch = useAppDispatch();
  const allFormulas = useAppSelector(selectFormulas);

  return (
    <>
      <Card className="mb-3 mt-3">
        <Card.Header as="h4">
          <Row>
            <Col>
              {type == "formula" && "Truth of formulas in "}
              <InlineMath>{String.raw`\mathcal{M}`}</InlineMath>
              {type == "term" && "Denotation of terms in M"}
            </Col>
            <Col xs="auto">
              <TooltipButton text={help}></TooltipButton>
            </Col>
          </Row>
        </Card.Header>
        <Card.Body>
          {allFormulas.map((formula: FormulaState, index: number) => (
            <FormulaComponent
              id={index}
              key={index}
              text={formula.text}
              guess={formula.guess}
            />
          ))}

          <Button variant="success" onClick={() => dispatch(add())}>
            <FontAwesomeIcon icon={faPlus} /> Add
          </Button>
        </Card.Body>
      </Card>
    </>
  );
}
