import { Card, Col, Row } from "react-bootstrap";
import TooltipButton from "../../components_helper/TooltipButton";
import InputGroupTitle from "../../components_helper/InputGroupTitle";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { InlineMath } from "react-katex";
import {
  selectConstants,
  selectParsedConstants,
  selectParsedFunctions,
  selectParsedPredicates,
  selectFunctions,
  selectPredicates,
  updateConstants,
  updateFunctions,
  updatePredicates,
  selectSymbolsClash,
} from "./languageSlice";

const help = (
  <>
    <p>A first-order language is defined in this section.</p>
    <p className="mb-0">Syntactic requirements:</p>
    <ul className="mb-0">
      <li>
        Symbols in all sets are <strong>comma-separated</strong>.
      </li>
      <li>
        Each predicate and function symbol must be followed by a slash (
        <code>/</code>) and arity (the number of arguments the symbol takes, a
        positive integer):{" "}
        <strong>
          <code>symbol/arity</code>
        </strong>
        .
      </li>
    </ul>
  </>
);

export default function LanguageComponent() {
  const dispatch = useAppDispatch();
  const constantsText = useAppSelector(selectConstants);
  const predicatesText = useAppSelector(selectPredicates);
  const languageText = useAppSelector(selectFunctions);
  const constantsErorrs = useAppSelector(selectParsedConstants);
  const predicatesErorrs = useAppSelector(selectParsedPredicates);
  const functionsErrors = useAppSelector(selectParsedFunctions);
  const symbolsClash = useAppSelector(selectSymbolsClash);
  return (
    <>
      <Card className="mb-3 mt-3">
        <Card.Header as="h4">
          <Row>
            <Col>
              Language <InlineMath>{String.raw`\mathcal{L}`}</InlineMath>
            </Col>
            <Col xs="auto">
              <TooltipButton text={help}></TooltipButton>
            </Col>
          </Row>
        </Card.Header>
        <Card.Body>
          <InputGroupTitle
            label={"Individual constants"}
            id="0"
            prefix={<InlineMath>{String.raw`\mathcal{C_L} = \{`}</InlineMath>}
            suffix={<InlineMath>{String.raw`\}`}</InlineMath>}
            placeholder="Constants"
            text={constantsText}
            onChange={(e) => {
              dispatch(updateConstants(e.target.value));
            }}
            error={constantsErorrs.error}
          ></InputGroupTitle>

          <InputGroupTitle
            label={"Predicate symbols"}
            id="0"
            prefix={
              <InlineMath>{String.raw`\mathcal{P}_{\mathcal{L}} = \{`}</InlineMath>
            }
            suffix={<InlineMath>{String.raw`\}`}</InlineMath>}
            placeholder="Predicates"
            text={predicatesText}
            onChange={(e) => {
              dispatch(updatePredicates(e.target.value));
            }}
            error={predicatesErorrs.error}
          ></InputGroupTitle>

          <InputGroupTitle
            label={"Function symbols"}
            id="0"
            prefix={
              <InlineMath>{String.raw`\mathcal{F}_{\mathcal{L}} = \{`}</InlineMath>
            }
            suffix={<InlineMath>{String.raw`\}`}</InlineMath>}
            placeholder="Functions"
            text={languageText}
            onChange={(e) => {
              dispatch(updateFunctions(e.target.value));
            }}
            error={functionsErrors.error}
          ></InputGroupTitle>

          {symbolsClash && <div className="text-danger">{symbolsClash}</div>}
        </Card.Body>
      </Card>
    </>
  );
}
