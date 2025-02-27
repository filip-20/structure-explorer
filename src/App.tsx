import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";
import FormulaCard from "./features/formulas/FormulaCard";
import Language from "./features/language/Language";
import Structure from "./features/structure/Structure";
import Variables from "./features/structure/Variables";
import { Col, Row } from "react-bootstrap";

function App() {
  return (
    <>
      <Form>
        <Row>
          <Col>
            <Language />
            <Structure />
            <Variables />
          </Col>
          <Col>
            <FormulaCard type="formula" help="helper"></FormulaCard>
            {/* <FormulaCard type="term" help="helper"></FormulaCard> */}
          </Col>
        </Row>
      </Form>
    </>
  );
}

export default App;
