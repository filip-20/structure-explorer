import { Button, Dropdown, DropdownButton, Form } from "react-bootstrap";
import { useAppDispatch } from "../app/hooks";
import { addChoice } from "../features/formulas/formulasSlice";

interface Props {
  id: number;
  choices: string[];
  type: string;
}

export default function SelectBubble({ id, choices, type }: Props) {
  const dispatch = useAppDispatch();
  return (
    <>
      <div>
        <DropdownButton title="Select a domain element" size="sm">
          {choices.map((choice, index) => (
            <Dropdown.Item
              onClick={(e) =>
                dispatch(addChoice({ id: id, choice: index, type: type }))
              }
            >
              {choice}
            </Dropdown.Item>
          ))}
        </DropdownButton>
      </div>
    </>
  );
}
