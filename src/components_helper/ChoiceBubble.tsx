import { Button } from "react-bootstrap";
import { useAppDispatch } from "../app/hooks";
import { addAlpha, addBeta } from "../features/formulas/formulasSlice";

interface Props {
  id: number;
  choices: string[];
  type: string;
  onclicks: (() => void)[];
}

export default function ChoiceBubble({ choices, onclicks }: Props) {
  return (
    <>
      <div>
        {choices.map((choice, index) => {
          return (
            <Button
              variant="outline-primary d-inline"
              onClick={() => {
                onclicks[index]();
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
