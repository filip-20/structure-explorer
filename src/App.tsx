import "bootstrap/dist/css/bootstrap.min.css";
import FormulaCard from "./features/formulas/FormulaCard";
import StructureComponent from "./features/structure/StructureComponent";
import VariablesComponent from "./features/variables/VariablesComponent";
import { Col, Container, Row } from "react-bootstrap";
import LanguageComponent from "./features/language/LanguageComponent";
import GearButton from "./features/import/GearButton";

function App() {
  return (
    <>
      <Container fluid>
        <GearButton />
        <Row>
          <Col>
            <LanguageComponent />
            <StructureComponent />
            <VariablesComponent />
          </Col>
          <Col>
            <FormulaCard />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
