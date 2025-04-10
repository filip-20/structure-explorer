import { Button } from "react-bootstrap";

interface Props {
  message: string;
  sent?: boolean;
  recieved?: boolean;
  change?: boolean;
  onClick?: () => void;
}

export default function MessageBubble({
  message,
  sent,
  recieved,
  change,
  onClick,
}: Props) {
  const variant = sent ? "primary" : "secondary";
  const float = sent ? "float-end" : "float-start";
  const rounded = sent ? "rounded-start-4" : "rounded-end-4";

  return (
    <>
      <div>
        {change && <Button onClick={onClick}>Change</Button>}
        <div
          className={`${float} mb-1 mt-1 p-1 text-wrap rounded-bottom-4 ${rounded} text-bg-${variant}`}
        >
          {message}
        </div>
      </div>
    </>
  );
}
