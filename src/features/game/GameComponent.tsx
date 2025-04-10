import Card from "react-bootstrap/Card";
import Formula from "../../model/formula/Formula";
import MessageBubble from "../../components_helper/MessageBubble";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  gameGoBack,
  selectCurrentAssignment,
  selectCurrentGameFormula,
  selectFormulaChoices,
  selectHistory,
} from "../formulas/formulasSlice";
import {
  selectParsedDomain,
  selectStructure,
} from "../structure/structureSlice";
import GameControl from "./GameControls";
interface Props {
  id: number;
  guess: boolean;
  originalFormula: Formula;
}

export default function GameComponent({ originalFormula, id, guess }: Props) {
  const dispatch = useAppDispatch();
  const choices = useAppSelector((state) => selectFormulaChoices(state, id));
  const domain = useAppSelector(selectParsedDomain).parsed ?? [];

  const structure = useAppSelector(selectStructure);
  const currentFormula = useAppSelector((state) =>
    selectCurrentGameFormula(state, id)
  );
  const history = useAppSelector((state) => selectHistory(state, id));
  const currentAssignment = useAppSelector((state) =>
    selectCurrentAssignment(state, id)
  );

  return (
    <>
      <Card className="mb-3 mt-3 h-100">
        <Card.Body
          className="d-flex flex-column overflow-y-auto text-break vw-25"
          style={{
            maxHeight: "33vh",
          }}
        >
          {history.map(({ text, sender, goBack }) => (
            <MessageBubble
              message={text}
              sent={sender === "player"}
              recieved={sender === "game"}
              onClick={
                goBack !== undefined
                  ? () => dispatch(gameGoBack({ id: id, index: goBack }))
                  : undefined
              }
              change={goBack !== undefined}
            />
          ))}

          {`${currentFormula.formula.signedFormulaToString(
            currentFormula.sign
          )}`}
        </Card.Body>
        <GameControl id={id} />
        {choices.map(({ formula, element, type }) => (
          <div>
            {type} {formula} {`"${element}"`}
          </div>
        ))}
      </Card>
    </>
  );
}
