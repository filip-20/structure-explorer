import { Button } from "react-bootstrap";

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
