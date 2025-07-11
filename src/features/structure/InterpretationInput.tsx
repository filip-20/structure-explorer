import InputGroupTitle from "../../components_helper/InputGroupTitle";
import { InlineMath } from "react-katex";
import { useAppSelector } from "../../app/hooks";
import type { InterpretationState } from "./structureSlice";
import type { RootState } from "../../app/store";
import type { ChangeEvent } from "react";

interface Props {
  name: string;
  id: string;
  selector: (state: RootState, name: string) => InterpretationState;
  parser: (state: RootState, name: string) => { error?: Error };
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export default function InterpretationInput({
  name,
  id,
  selector,
  parser,
  onChange,
}: Props) {
  const interpretation = useAppSelector((state) => selector(state, name));
  const { error } = useAppSelector((state) => parser(state, name));
  const escapedName = name.replace(/_/g, "\\_");
  return (
    <>
      <InputGroupTitle
        label=""
        id={id}
        prefix={
          <InlineMath>{String.raw`i(\text{\textsf{${escapedName}}}) =`}</InlineMath>
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
