import InputGroup from "react-bootstrap/InputGroup";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {
  remove,
  updateText,
  updateGuess,
  selectEvaluatedFormula,
  addChoice,
} from "./formulasSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { InlineMath } from "react-katex";
import ErrorFeedback from "../../components_helper/ErrorFeedback";
import { Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faGamepad,
  faTrash,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

interface Props {
  id: number;
  text: string;
  guess: boolean | null;
}
import GameComponent from "../game/GameComponent";
import { useState } from "react";
import PredicateAtom from "../../model/formula/Formula.PredicateAtom";

export default function FormulaComponent({ id, text, guess }: Props) {
  const real_id = id + 1;
  const dispatch = useAppDispatch();
  const { error, evaluated, formula } = useAppSelector((state) =>
    selectEvaluatedFormula(state, id)
  );
  const [begin, setBegin] = useState(false);

  return (
    <>
      <Form>
        <Row>
          <InputGroup className="mb-3" hasValidation={!!error}>
            <InputGroup.Text>
              <InlineMath>{String.raw`\varphi_{${real_id}}`}</InlineMath>
            </InputGroup.Text>
            <Form.Control
              placeholder="Formula"
              aria-label="Formula"
              aria-describedby="basic-addon2"
              value={text}
              onChange={(e) => {
                dispatch(updateText({ id: id, text: e.target.value }));
              }}
              isInvalid={!!error}
            />

            <Button
              variant="outline-danger"
              id="button-addon2"
              onClick={() => dispatch(remove(id))}
            >
              <FontAwesomeIcon icon={faTrash} />
            </Button>
            <ErrorFeedback error={error} text={text}></ErrorFeedback>
            {/*temporary}*/}
          </InputGroup>
        </Row>

        {/* <Row>
          <div>eval -{evaluated ? "true" : "false"}</div>
        </Row> */}

        <Row>
          <Col xs="auto">
            <InputGroup as={Col} className="mb-3">
              <InputGroup.Text>
                <InlineMath>{String.raw`\mathcal{M}`}</InlineMath>
              </InputGroup.Text>

              <Form.Select
                as={Col}
                aria-label="Select"
                value={
                  guess == true ? "true" : guess == false ? "false" : "null"
                }
                onChange={(e) => {
                  dispatch(
                    updateGuess({
                      id: id,
                      guess:
                        e.target.value == "true"
                          ? true
                          : e.target.value == "false"
                          ? false
                          : null,
                    })
                  );
                }}
              >
                <option value="null">⊨/⊭?</option>
                <option value="true">⊨</option>
                <option value="false">⊭</option>
              </Form.Select>
              <InputGroup.Text>
                <InlineMath>{String.raw`\varphi_{${real_id}}[e]`}</InlineMath>
              </InputGroup.Text>
            </InputGroup>
          </Col>
          <Col xs={4}>
            {guess !== null &&
              evaluated !== undefined &&
              guess === evaluated && (
                <Row>
                  <FontAwesomeIcon
                    icon={faCheck}
                    pull="left"
                    className="text-success"
                  />
                  <div className="text-success">Correct</div>
                </Row>
              )}

            {guess !== null &&
              evaluated === undefined &&
              guess !== evaluated && (
                <Row>
                  <FontAwesomeIcon
                    icon={faXmark}
                    pull="left"
                    className="text-danger"
                  />

                  <div className="text-danger">Incorrect</div>
                </Row>
              )}

            {guess !== null &&
              evaluated !== undefined &&
              guess !== evaluated && (
                <Row>
                  <FontAwesomeIcon
                    icon={faXmark}
                    pull="left"
                    className="text-danger"
                  />
                  <div className="text-danger">Incorrect</div>
                </Row>
              )}
          </Col>
          <Col xs={4}>
            <Button
              variant="secondary"
              id="button-addon2"
              disabled={!!error || guess === null}
              onClick={() => {
                setBegin(!begin);
              }}
            >
              <FontAwesomeIcon icon={faGamepad} />
            </Button>
          </Col>
        </Row>
        {begin && guess !== null && formula && (
          <GameComponent id={id} guess={guess} originalFormula={formula} />
        )}
      </Form>
    </>
  );
}
