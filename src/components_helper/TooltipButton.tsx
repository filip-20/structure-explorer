import { faQuestion } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useRef } from "react";
import { Button, Overlay, Tooltip } from "react-bootstrap";

interface Props {
  text: string;
}

export default function TooltipButton({ text }: Props) {
  const [show, setShow] = useState(false); //pre help
  const target = useRef(null); //pre help
  return (
    <>
      <Button ref={target} variant="primary" onClick={() => setShow(!show)}>
        <FontAwesomeIcon icon={faQuestion} />
      </Button>
      <Overlay target={target.current} show={show} placement="right">
        {(props) => (
          <Tooltip id="overlay-example" {...props}>
            {text}
          </Tooltip>
        )}
      </Overlay>
    </>
  );
}
