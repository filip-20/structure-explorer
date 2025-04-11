import { Dropdown, DropdownButton } from "react-bootstrap";

interface Props {
  id: number;
  choices: string[];
  type: string;
  onclicks: (() => void)[];
}

export default function SelectBubble({ id, choices, type, onclicks }: Props) {
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
