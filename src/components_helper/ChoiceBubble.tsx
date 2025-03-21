import { Button } from "react-bootstrap";

interface Props {
  choice1: string;
  choice2: string;
}

export default function ChoiceBubble({ choice1, choice2 }: Props) {
  return (
    <>
      <div>
        <Button variant="outline-primary d-inline">{choice1}</Button>
        <Button variant="outline-primary d-inline">{choice2}</Button>
      </div>
    </>
  );
}
