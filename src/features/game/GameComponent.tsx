import Card from "react-bootstrap/Card";
import Formula from "../../model/formula/Formula";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { gameGoBack, selectGameResetIndex } from "../formulas/formulasSlice";
import GameControl from "./GameControls";
import { useEffect } from "react";
import GameHistory from "./GameHistory";

interface Props {
  id: number;
  guess: boolean;
  originalFormula: Formula;
}

export default function GameComponent({ id }: Props) {
  const dispatch = useAppDispatch();
  const backIndex = useAppSelector((state) => selectGameResetIndex(state, id));

  useEffect(() => {
    dispatch(gameGoBack({ id, index: backIndex }));
  });

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
          <GameHistory id={id} />
        </Card.Body>
        <GameControl id={id} />
      </Card>
    </>
  );
}
