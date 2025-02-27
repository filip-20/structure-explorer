import InputGroupTitle from "../../components_helper/InputGroupTitle";
import { InlineMath } from "react-katex";
import { useAppSelector } from "../../app/hooks";
import { InterpretationState } from "./structureSlice";
import { RootState } from "../../app/store";
import { ChangeEvent } from "react";

interface Props {
  name: string;
  selector(state: RootState, name: string): InterpretationState;
  parser(
    state: RootState,
    name: string
  ): {
    error: Error;
    parsed?: undefined;
  };
  onChange(event: ChangeEvent<HTMLInputElement>): void;
}

// InterpretationInput
export default function InterpretationInput({
  name,
  selector,
  parser,
  onChange,
}: Props) {
  const interpretation = useAppSelector((state) => selector(state, name));
  // const { error } = ...selectParsedConstant(...)...
  const { error } = useAppSelector((state) => parser(state, name));
  return (
    <>
      <InputGroupTitle
        label=""
        prefix={
          <InlineMath>{String.raw`i(\text{\textsf{${name}}}) =`}</InlineMath>
        }
        suffix=""
        placeholder=""
        text={interpretation?.text ?? ""}
        onChange={onChange}
        error={error}
      ></InputGroupTitle>
      {}
    </>
  );
}
