import { ReactNode } from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";

interface Props {
  id: number;
  title: ReactNode;
  choices: string[];
  type: string;
  onclicks: (() => void)[];
}

export default function SelectBubble({
  id,
  title,
  choices,
  type,
  onclicks,
}: Props) {
  return (
    <>
      <div>
        <DropdownButton title={title} size="sm">
          {choices.map((choice, index) => (
            <Dropdown.Item key={choice} onClick={() => onclicks[index]()}>
              {choice}
            </Dropdown.Item>
          ))}
        </DropdownButton>
      </div>
    </>
  );
}
