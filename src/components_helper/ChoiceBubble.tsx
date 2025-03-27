import { Button } from "react-bootstrap";
import { useAppDispatch } from "../app/hooks";
import { addChoice } from "../features/formulas/formulasSlice";

interface Props {
  id: number;
  choices: string[];
  type: string;
  onClickExtra?: React.MouseEventHandler<HTMLButtonElement>;
}

export default function ChoiceBubble({
  id,
  choices,
  type,
  onClickExtra,
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
                dispatch(addChoice({ id: id, choice: index, type: type }));
                if (onClickExtra) {
                  onClickExtra(e);
                }
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
