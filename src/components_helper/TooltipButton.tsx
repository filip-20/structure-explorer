import { faQuestion } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useRef, ReactNode } from "react";
import { Button, Overlay, Tooltip } from "react-bootstrap";

interface Props {
  text: ReactNode;
}

export default function TooltipButton({ text }: Props) {
  const [show, setShow] = useState(false);
  const [color, setColor] = useState("outline-primary");
  const target = useRef(null);
  return (
    <>
      <Button
        ref={target}
        variant={color}
        onClick={() => {
          setShow(!show);
          setColor(color === "primary" ? "outline-primary" : "primary");
        }}
      >
        <FontAwesomeIcon icon={faQuestion} />
      </Button>
      <Overlay target={target.current} show={show} placement="auto" flip>
        {(props) => (
          <Tooltip id="overlay-example" {...props}>
            {text}
          </Tooltip>
        )}
      </Overlay>
    </>
  );
}
