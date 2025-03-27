import { SignedFormulaType } from "../../model/formula/Formula";
import ChoiceBubble from "../../components_helper/ChoiceBubble";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  addChoice,
  selectCurrentGameFormula,
  selectFormulaChoices,
  selectGameButtons,
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
  const buttons = useAppSelector((state) => selectGameButtons(state, id));

  let button = undefined;
  if (
    buttons?.type === "init" ||
    buttons?.type === "mc" ||
    buttons?.type === "continue" ||
    buttons?.type === "gc"
  ) {
    if (
      choices &&
      choices[0] &&
      current.formula.getSignedType(current.sign) === SignedFormulaType.ALPHA
    ) {
    }
    button = (
      <ChoiceBubble
        // onClickExtra={(e) => {
        //   dispatch(addChoice({ id: id, choice: 0, type: "gc" }));
        // }}
        choices={buttons.choices}
        id={id}
        type={buttons.type}
      />
    );
  }

  return (
    <>
      <div className="d-flex justify-content-center mb-3 mt-3">{button}</div>
    </>
  );
}
