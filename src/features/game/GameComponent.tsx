import Card from "react-bootstrap/Card";
import Formula, { SignedFormulaType } from "../../model/formula/Formula";
import MessageBubble from "../../components_helper/MessageBubble";
import ChoiceBubble from "../../components_helper/ChoiceBubble";
import SelectBubble from "../../components_helper/SelectBubble";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  addChoice,
  selectCurrentGameFormula,
  selectFormulaChoices,
  selectGameButtons,
  selectHistory,
} from "../formulas/formulasSlice";
import { selectParsedDomain } from "../structure/structureSlice";
import GameControl from "./GameControls";
interface Props {
  id: number;
  originalFormula: Formula;
}

export default function GameComponent({ originalFormula, id }: Props) {
  const dispatch = useAppDispatch();
  const choices = useAppSelector((state) => selectFormulaChoices(state, id));
  const domain = useAppSelector(selectParsedDomain).parsed ?? [];
  const guess = choices[0] && choices[0].choice === 0;
  const currentFormula = useAppSelector((state) =>
    selectCurrentGameFormula(state, id)
  );
  const history = useAppSelector((state) => selectHistory(state, id));
  const buttons = useAppSelector((state) => selectGameButtons(state, id));

  let b = undefined;
  if (
    buttons?.type === "init" ||
    buttons?.type === "mc" ||
    buttons?.type === "continue"
  ) {
    b = <ChoiceBubble choices={buttons.choices} id={id} type={buttons.type} />;
  }

  // if (
  //   choices &&
  //   choices[0] &&
  //   currentFormula.formula.getSignedType(currentFormula.sign) ===
  //     SignedFormulaType.ALPHA
  // ) {
  //   dispatch(addChoice({ id: id, choice: 0, type: "gc" }));
  // }

  return (
    <>
      <Card className="mb-3 mt-3 h-100">
        <Card.Body
          className="d-flex flex-column overflow-y-auto text-break vw-25"
          style={{
            maxHeight: "33vh",
          }}
        >
          {/* <MessageBubble
            message={`What is your initial assumption about the truth/satisfaction of the formula ${formula.toString()} by the valuation 𝑒 in the structure ℳ?`}
            recieved
          /> */}

          {history.map(({ text, sender }) => (
            <MessageBubble
              message={text}
              sent={sender === "player"}
              recieved={sender === "game"}
            />
          ))}

          {currentFormula.formula.toString()}

          {/* {choices.map(({ choice, type }) => {
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
          })} */}

          {/* <MessageBubble message="hello" sent />
          <MessageBubble message="hello" sent />
          <MessageBubble message="hello" sent />
          <MessageBubble message="hello" recieved /> */}
        </Card.Body>
        <GameControl id={id} />
        {choices.map(({ choice, type }) => (
          <div>
            {type} {currentFormula.formula.toString()}
          </div>
        ))}
      </Card>
    </>
  );
}
