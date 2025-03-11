import InputGroup from "react-bootstrap/InputGroup";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { remove, updateText, updateGuess } from "./formulasSlice";
import { useAppDispatch } from "../../app/hooks";
import { InlineMath } from "react-katex";

interface Props {
  id: number;
  text: string;
  guess: boolean | null;
}

export default function FormulaComponent({ id, text, guess }: Props) {
  let real_id = id + 1;
  const dispatch = useAppDispatch();
  //const text = useAppSelector((state) => state.formulas.allFormulas[id].text);
  //const guess = useAppSelector((state) => state.formulas.allFormulas[id].guess);
  return (
    <>
      <InputGroup as={Col} className="mb-3">
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
        />
        <Button
          variant="danger"
          id="button-addon2"
          onClick={() => dispatch(remove(id))}
        >
          Delete
        </Button>
      </InputGroup>

      <InputGroup as={Col} className="mb-3">
        <InputGroup.Text>
          <InlineMath>{String.raw`\mathcal{M}`}</InlineMath>
        </InputGroup.Text>
        <Form.Select
          aria-label="Select"
          value={guess == true ? "⊨" : guess == false ? "⊭" : "⊨/⊭?"}
          onChange={(e) => {
            dispatch(
              updateGuess({
                id: id,
                guess:
                  e.target.value == "⊨"
                    ? true
                    : e.target.value == "⊭"
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
        <Button variant="success" id="button-addon2">
          Game
        </Button>
      </InputGroup>
    </>
  );
}
