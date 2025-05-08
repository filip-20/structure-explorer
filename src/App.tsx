import "bootstrap/dist/css/bootstrap.min.css";
// import { Provider } from "react-redux";
import FormulaCard from "./features/formulas/FormulaCard";
import StructureComponent from "./features/structure/StructureComponent";
import VariablesComponent from "./features/variables/VariablesComponent";
import { Col, Container, Row } from "react-bootstrap";
import LanguageComponent from "./features/language/LanguageComponent";

// interface Props {
//   store: any;
// }

// function App({ store }: Props) {
function App() {
  return (
    <>
      {/* <Provider store={store}> */}
      <Container fluid>
        <Row>
          <Col>
            <LanguageComponent />
            <StructureComponent />
            <VariablesComponent />
          </Col>
          <Col>
            <FormulaCard type="formula" help="helper"></FormulaCard>
          </Col>
        </Row>
      </Container>
      {/* </Provider> */}
    </>
  );
}

export default App;
