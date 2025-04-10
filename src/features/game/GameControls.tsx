import { SignedFormulaType } from "../../model/formula/Formula";
import ChoiceBubble from "../../components_helper/ChoiceBubble";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  addAlpha,
  addBeta,
  addDelta,
  addGamma,
  selectCurrentGameFormula,
  selectFormulaChoices,
  selectGameButtons,
} from "../formulas/formulasSlice";
import SelectBubble from "../../components_helper/SelectBubble";
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

  const arr = current.formula
    .getSignedSubFormulas(current.sign)
    .map(({ sign, formula }) => formula.signedFormulaToString(sign));

  let button = undefined;

  if (buttons === undefined) {
    return (
      <>
        <div className="d-flex justify-content-center mb-3 mt-3">{button}</div>
      </>
    );
  }

  if (buttons.type === "delta") {
    button = (
      <SelectBubble
        id={id}
        choices={buttons.values}
        type={buttons.type}
        onclicks={buttons.elements!.map(
          (element) => () => dispatch(addDelta({ id: id, element: element }))
        )}
      />
    );
  }

  if (buttons.type === "gamma") {
    button = (
      <ChoiceBubble
        id={id}
        choices={buttons.values}
        type={buttons.type}
        onclicks={buttons.elements!.map(
          (element) => () => dispatch(addGamma({ id: id, element: element }))
        )}
      />
    );
  }

  if (buttons.type === "beta") {
    button = (
      <ChoiceBubble
        id={id}
        choices={buttons.values}
        type={buttons.type}
        onclicks={buttons.subformulas!.map((_, index) => {
          if (index === 0 || index === 1) {
            return () => dispatch(addBeta({ id: id, formula: index }));
          }
          return () => {};
        })}
      />
    );
  }

  if (buttons.type === "alpha") {
    button = (
      <ChoiceBubble
        id={id}
        choices={buttons.values}
        type={buttons.type}
        onclicks={buttons.subformulas!.map((sf) => {
          let index = arr.indexOf(sf.formula.signedFormulaToString(sf.sign));

          if (index === 0 || index === 1) {
            return () => dispatch(addAlpha({ id: id, formula: index }));
          }
          return () => {};
        })}
      />
    );
  }

  return (
    <>
      <div className="d-flex justify-content-center mb-3 mt-3">{button}</div>
    </>
  );
}
