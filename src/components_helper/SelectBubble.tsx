import { Button, Dropdown, DropdownButton, Form } from "react-bootstrap";
import { useAppDispatch } from "../app/hooks";
import { addDelta, addGamma } from "../features/formulas/formulasSlice";

interface Props {
  id: number;
  choices: string[];
  type: string;
  onclicks: (() => void)[];
}

export default function SelectBubble({ id, choices, type, onclicks }: Props) {
  const dispatch = useAppDispatch();
  return (
    <>
      <div>
        <DropdownButton title="Select a domain element" size="sm">
          {choices.map((choice, index) => (
            <Dropdown.Item onClick={() => onclicks[index]()}>
              {choice}
            </Dropdown.Item>
          ))}
        </DropdownButton>
      </div>
    </>
  );
}
