import { Card, Col, Row } from "react-bootstrap";
import TooltipButton from "../../components_helper/TooltipButton";
import InputGroupTitle from "../../components_helper/InputGroupTitle";
import { InlineMath } from "react-katex";

export default function Language() {
  let help: string = "help";

  return (
    <>
      <Card>
        <Card.Header as="h4">
          <Row>
            <Col>Variable assignment</Col>
            <Col>
              <TooltipButton text={help}></TooltipButton>
            </Col>
          </Row>
        </Card.Header>
        <Card.Body>
          <InputGroupTitle
            label={"Variable assignment of individual variables"}
            id="0"
            prefix={<InlineMath>{String.raw`e = \{`}</InlineMath>}
            suffix={<InlineMath>{String.raw`\}`}</InlineMath>}
            placeholder="assignments"
          ></InputGroupTitle>
        </Card.Body>
      </Card>
    </>
  );
}
