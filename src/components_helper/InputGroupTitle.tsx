import { ChangeEvent } from "react";
import { Form, InputGroup, Col } from "react-bootstrap";
import { SyntaxError } from "@fmfi-uk-1-ain-412/js-fol-parser";
import ErrorFeedback from "./ErrorFeedback";

interface Props {
  label: string;
  prefix: string | React.JSX.Element;
  suffix: string;
  placeholder: string;
  text: string;
  onChange(event: ChangeEvent<HTMLInputElement>): void;
  error?: Error | SyntaxError;
}

export default function InputGroupTitle({
  label,
  //id,
  prefix,
  suffix,
  placeholder,
  text,
  onChange,
  error,
}: Props) {
  return (
    <>
      {label != "" && <Form.Label htmlFor={label}>{label}</Form.Label>}
      <InputGroup as={Col} className="mb-3" hasValidation={!!error}>
        <InputGroup.Text>{prefix}</InputGroup.Text>
        <Form.Control
          placeholder={placeholder}
          aria-label={placeholder}
          aria-describedby="basic-addon2"
          value={text}
          onChange={onChange}
          id={label}
          isInvalid={!!error}
        />

        {suffix && <InputGroup.Text>{suffix}</InputGroup.Text>}

        <ErrorFeedback error={error} text={text}></ErrorFeedback>
      </InputGroup>
    </>
  );
}
