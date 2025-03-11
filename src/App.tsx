import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";
import FormulaCard from "./features/formulas/FormulaCard";
import StructureComponent from "./features/structure/StructureComponent";
import VariablesComponent from "./features/structure/VariablesComponent";
import { Col, Row } from "react-bootstrap";
import LanguageComponent from "./features/language/LanguageComponent";

function App() {
  return (
    <>
      <Form>
        <Row>
          <Col>
            <LanguageComponent />
            <StructureComponent />
            <VariablesComponent />
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
