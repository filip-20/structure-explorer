import { Button } from "react-bootstrap";
import { useAppDispatch } from "../app/hooks";
import { addChoice } from "../features/formulas/formulasSlice";

interface Props {
  id: number;
  choices: string[];
  type: string;
  onClickRight?: boolean;
  onClickLeft?: boolean;
}

export default function ChoiceBubble({
  id,
  choices,
  type,
  onClickLeft,
  onClickRight,
}: Props) {
  const dispatch = useAppDispatch();

  return (
    <>
      <div>
        {choices.map((choice, index) => {
          return (
            <Button
              variant="outline-primary d-inline"
              onClick={(e) => {
                if (onClickLeft) {
                  dispatch(addChoice({ id: id, choice: 0, type: "alpha" }));
                }

                if (onClickRight) {
                  dispatch(addChoice({ id: id, choice: 1, type: "alpha" }));
                }

                dispatch(addChoice({ id: id, choice: index, type: type }));
              }}
            >
              {choice}
            </Button>
          );
        })}
      </div>
    </>
  );
}
