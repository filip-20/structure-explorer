import { SignedFormulaType } from "../../model/formula/Formula";
import ChoiceBubble from "../../components_helper/ChoiceBubble";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  addChoice,
  selectCurrentGameFormula,
  selectFormulaChoices,
  selectGameButtons,
  selectNextStep,
} from "../formulas/formulasSlice";
interface Props {
  id: number;
}

export default function GameControl({ id }: Props) {
  const dispatch = useAppDispatch();
  const choices = useAppSelector((state) => selectFormulaChoices(state, id));
  const current = useAppSelector((state) =>
    selectCurrentGameFormula(state, id)
  );
  const { left, right } = useAppSelector((state) => selectNextStep(state, id));
  const buttons = useAppSelector((state) => selectGameButtons(state, id));

  let button = undefined;

  if (buttons === undefined) {
    return (
      <>
        <div className="d-flex justify-content-center mb-3 mt-3">{button}</div>
      </>
    );
  }

  if (buttons.type === "beta") {
    button = (
      <ChoiceBubble
        id={id}
        choices={buttons.values}
        type={buttons.type}
        onClickLeft={left === 1}
        onClickRight={right === 1}
      />
    );
  }

  if (buttons.type === "alpha") {
    button = (
      <ChoiceBubble
        id={id}
        choices={buttons.values}
        type={buttons.type}
        onClickLeft={left === 1}
        onClickRight={right === 1}
      />
    );
  }

  if (buttons.type === "continue") {
    button = (
      <ChoiceBubble
        id={id}
        choices={buttons.values}
        type={buttons.type}
        onClickLeft={left === 1}
        onClickRight={right === 1}
      />
    );
  }

  return (
    <>
      <div className="d-flex justify-content-center mb-3 mt-3">{button}</div>
    </>
  );
}
