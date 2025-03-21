import { Button, Dropdown, DropdownButton, Form } from "react-bootstrap";

interface Props {
  choices: string[];
}

export default function SelectBubble({ choices }: Props) {
  return (
    <>
      <div>
        <DropdownButton title="Select a domain element" size="sm">
          {choices.map((choice, index) => (
            <Dropdown.Item>{choice}</Dropdown.Item>
          ))}
        </DropdownButton>
      </div>
    </>
  );
}
