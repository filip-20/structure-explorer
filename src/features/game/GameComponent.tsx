import Card from "react-bootstrap/Card";
import Formula from "../../model/formula/Formula";
import MessageBubble from "../../components_helper/MessageBubble";
import ChoiceBubble from "../../components_helper/ChoiceBubble";
import SelectBubble from "../../components_helper/SelectBubble";
import { useAppSelector } from "../../app/hooks";
import {
  selectFormulaChoices,
  selectGameButtons,
} from "../formulas/formulasSlice";
import { selectParsedDomain } from "../structure/structureSlice";
interface Props {
  id: number;
  formula: Formula;
}

export default function GameComponent({ formula, id }: Props) {
  const choices = useAppSelector((state) => selectFormulaChoices(state, id));
  const domain = useAppSelector(selectParsedDomain).parsed ?? [];
  const guess = choices[0] && choices[0].choice === 0;

  const buttons = useAppSelector((state) => selectGameButtons(state, id));
  let b = undefined;
  if (buttons?.type === "init") {
    b = <ChoiceBubble choices={buttons.choices} id={id} type="init" />;
  }

  return (
    <>
      <Card className="mb-3 mt-3 h-100">
        <Card.Body
          className="d-flex flex-column overflow-y-auto text-break vw-25"
          style={{
            maxHeight: "33vh",
          }}
        >
          <MessageBubble
            message={`What is your initial assumption about the truth/satisfaction of the formula ${formula.toString()} by the valuation 𝑒 in the structure ℳ?`}
            recieved
          />

          {choices.map(({ choice, type }) => {
            if (type === "init") {
              const ch = choice === 0 ? "True" : "False";
              return (
                <>
                  <MessageBubble sent message={ch} />
                  <MessageBubble
                    recieved
                    message={`You assume that the formula ${formula.toString()} is ${ch}`}
                  />
                </>
              );
            }

            return <MessageBubble message="error" />;
          })}

          {/* <MessageBubble message="hello" sent />
          <MessageBubble message="hello" sent />
          <MessageBubble message="hello" sent />
          <MessageBubble message="hello" recieved /> */}
        </Card.Body>
        <div className="d-flex justify-content-center mb-3 mt-3">
          {/* <ChoiceBubble choices={["true", "false"]} id={id} type="init" />
          <SelectBubble choices={domain}></SelectBubble> */}
          {b}
        </div>
      </Card>
    </>
  );
}
