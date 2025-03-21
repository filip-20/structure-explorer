import { Col, Row } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import TooltipButton from "../../components_helper/TooltipButton";
import { InlineMath } from "react-katex";
import Formula from "../../model/formula/Formula";
import MessageBubble from "../../components_helper/MessageBubble";
import ChoiceBubble from "../../components_helper/ChoiceBubble";
import SelectBubble from "../../components_helper/SelectBubble";
interface Props {
  formula: Formula;
  choices: { subformulaChoice?: number; elementChoice?: string }[];
}

export default function GameComponent({ formula, choices }: Props) {
  return (
    <>
      <Card className="mb-3 mt-3 h-100">
        <Card.Body
          className="d-flex flex-column overflow-y-auto text-break vw-25"
          style={{
            maxHeight: "33vh",
          }}
        >
          <MessageBubble
            message={`What is your initial assumption about the truth/satisfaction of the formula ${formula.toString()} by the valuation 𝑒 in the structure ℳ?`}
            sent
          />

          <ChoiceBubble choice1="True" choice2="False" />

          <SelectBubble choices={["1", "2", "3"]}></SelectBubble>

          {/* <MessageBubble message="hello" sent />
          <MessageBubble message="hello" sent />
          <MessageBubble message="hello" sent />
          <MessageBubble message="hello" recieved /> */}
        </Card.Body>
      </Card>
    </>
  );
}
