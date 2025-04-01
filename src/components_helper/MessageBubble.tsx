interface Props {
  message: string;
  sent?: boolean;
  recieved?: boolean;
}

export default function MessageBubble({ message, sent }: Props) {
  const variant = sent ? "primary" : "secondary";
  const float = sent ? "float-end" : "float-start";
  const rounded = sent ? "rounded-start-5" : "rounded-end-5";

  return (
    <>
      <div>
        <div
          className={`${float} mb-1 mt-1 p-1 text-wrap rounded-bottom-5 ${rounded} text-bg-${variant}`}
        >
          {message}
        </div>
      </div>
    </>
  );
}
