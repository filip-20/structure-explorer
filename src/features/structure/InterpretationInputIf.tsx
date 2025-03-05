import InputGroupTitle from "../../components_helper/InputGroupTitle";
import { InlineMath } from "react-katex";
import { useAppSelector } from "../../app/hooks";
import { InterpretationState, selectParsedFunction } from "./structureSlice";
import { RootState } from "../../app/store";
import { ChangeEvent } from "react";

interface Props {
  name: string;
  selector(
    state: RootState,
    name: string
  ): { interpretation: InterpretationState; name: string };
  onChange(event: ChangeEvent<HTMLInputElement>): void;
}

// InterpretationInput
export default function InterpretationInputIf({
  name,
  selector,
  onChange,
}: Props) {
  const interpretation = useAppSelector((state) => selector(state, name));
  // const { error } = ...selectParsedConstant(...)...
  const { error } = useAppSelector((state) =>
    selectParsedFunction(state, name)
  );

  return (
    <>
      <InputGroupTitle
        label=""
        prefix={
          <InlineMath>{String.raw`i(\text{\textsf{${name}}}) = \{`}</InlineMath>
        }
        suffix={<InlineMath>{String.raw`\}`}</InlineMath>}
        placeholder=""
        text={interpretation.interpretation?.text ?? ""}
        onChange={onChange}
        error={error}
      ></InputGroupTitle>
      {}
    </>
  );
}
