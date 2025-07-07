import type { ChangeEvent, ReactNode } from "react";
import { Form, InputGroup, Col, Button } from "react-bootstrap";
import { SyntaxError } from "@fmfi-uk-1-ain-412/js-fol-parser";
import ErrorFeedback from "./ErrorFeedback";

interface Props {
  label: string;
  id: string;
  prefix: ReactNode;
  suffix: ReactNode;
  placeholder: string;
  text: string;
  onChange(event: ChangeEvent<HTMLInputElement>): void;
  error?: Error | SyntaxError;
}

export default function InputGroupTitle({
  label,
  id,
  prefix,
  suffix,
  placeholder,
  text,
  onChange,
  error,
}: Props) {
  return (
    <>
      {label != "" && (
        <Form.Label htmlFor={`${id}-${label.toLowerCase()}`}>
          {label}
        </Form.Label>
      )}
      <InputGroup as={Col} className="mb-3" hasValidation={!!error}>
        <InputGroup.Text>{prefix}</InputGroup.Text>
        <Form.Control
          placeholder={placeholder}
          aria-label={placeholder}
          aria-describedby="basic-addon2"
          value={text}
          onChange={onChange}
          id={`${id}-${label.toLowerCase()}`}
          isInvalid={!!error}
        />

        {suffix && <InputGroup.Text>{suffix}</InputGroup.Text>}
        {/* <Button variant="secondary">Lock</Button> */}

        <ErrorFeedback error={error} text={text}></ErrorFeedback>
      </InputGroup>
    </>
  );
}
