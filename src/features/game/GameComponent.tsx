import Card from "react-bootstrap/Card";
import Formula from "../../model/formula/Formula";
import MessageBubble from "../../components_helper/MessageBubble";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  gameGoBack,
  selectFormulaChoices,
  selectGameResetIndex,
  selectHistory,
  selectHistoryData,
} from "../formulas/formulasSlice";
import GameControl from "./GameControls";
import { useEffect, useRef } from "react";

interface Props {
  id: number;
  guess: boolean;
  originalFormula: Formula;
}

export default function GameComponent({ originalFormula, id, guess }: Props) {
  const dispatch = useAppDispatch();
  const choices = useAppSelector((state) => selectFormulaChoices(state, id));
  const data = useAppSelector((state) => selectHistoryData(state, id));
  const history = useAppSelector((state) => selectHistory(state, id));
  const last = useRef<HTMLDivElement>(null);
  const backIndex = useAppSelector((state) => selectGameResetIndex(state, id));

  useEffect(() => {
    if (last.current) {
      last.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }

    dispatch(gameGoBack({ id, index: backIndex }));
  }, [history]);

  return (
    <>
      <Card className="mb-3 mt-3 h-100">
        <Card.Body
          className="d-flex flex-column overflow-y-auto text-break vw-25"
          style={{
            maxHeight: "33vh",
            overflowY: "auto",
            position: "relative",
          }}
        >
          {history.map(({ text, sender, goBack }, index) => (
            <MessageBubble
              key={`${text}-${sender}-${index}`}
              children={text}
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
          {/* {`${currentFormula.formula.signedFormulaToString(
            currentFormula.sign
          )}`} */}

          {/* {`Back: ${backIndex} arr length: ${data.length}`} */}
          <div ref={last}></div>
        </Card.Body>
        <GameControl id={id} />
        {/* {choices.map(({ formula, element, type }) => (
          <div>
            {type} {formula} {`"${element}"`}
          </div>
        ))} */}

        {/* {data.map(({ sf, valuation, winElement, winFormula, type }) => (
          <div>
            {`formula: ${sf.formula.signedFormulaToString(
              sf.sign
            )}\n type: ${type} 
            \n winFormula: ${
              winFormula?.formula.signedFormulaToString(winFormula.sign) ??
              "nic"
            }\n winElement: ${winElement}
             \n valuation: ${Array.from(valuation).flatMap(
               ([from, to]) => `${from} => ${to}`
             )}`}
          </div>
        ))} */}
      </Card>
    </>
  );
}
