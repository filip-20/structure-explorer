import Card from "react-bootstrap/Card";
import Formula, { SignedFormulaType } from "../../model/formula/Formula";
import MessageBubble from "../../components_helper/MessageBubble";
import ChoiceBubble from "../../components_helper/ChoiceBubble";
import SelectBubble from "../../components_helper/SelectBubble";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  addChoice,
  selectCurrentAssignment,
  selectCurrentGameFormula,
  selectFormulaChoices,
  selectGameButtons,
  selectHistory,
} from "../formulas/formulasSlice";
import { selectParsedDomain } from "../structure/structureSlice";
import GameControl from "./GameControls";
import { selectValuation } from "../variables/variablesSlice";
import { Button } from "react-bootstrap";
import { useState } from "react";
interface Props {
  id: number;
  guess: boolean;
  originalFormula: Formula;
}

export default function GameComponent({ originalFormula, id, guess }: Props) {
  const dispatch = useAppDispatch();
  const choices = useAppSelector((state) => selectFormulaChoices(state, id));
  const domain = useAppSelector(selectParsedDomain).parsed ?? [];

  const currentFormula = useAppSelector((state) =>
    selectCurrentGameFormula(state, id)
  );
  const history = useAppSelector((state) => selectHistory(state, id));
  const currentAssignment = useAppSelector((state) =>
    selectCurrentAssignment(state, id)
  );

  let b = undefined;

  return (
    <>
      <Card className="mb-3 mt-3 h-100">
        <Card.Body
          className="d-flex flex-column overflow-y-auto text-break vw-25"
          style={{
            maxHeight: "33vh",
          }}
        >
          {history.map(({ text, sender }) => (
            <MessageBubble
              message={text}
              sent={sender === "player"}
              recieved={sender === "game"}
            />
          ))}

          {`${
            currentFormula.sign === true ? "T" : "F"
          } ${currentFormula.formula.toString()}`}
        </Card.Body>
        <GameControl id={id} />
        {choices.map(({ choice, type }) => (
          <div>
            {type} {choice} {currentFormula.formula.toString()}
          </div>
        ))}
      </Card>
    </>
  );
}
