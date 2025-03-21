interface Props {
  message: string;
  sent?: boolean;
  recieved?: boolean;
}

export default function MessageBubble({ message, sent }: Props) {
  const variant = sent ? "primary" : "secondary";
  const float = sent ? "float-end" : "float-start";
  return (
    <>
      <div>
        <div
          className={`${float} mb-1 mt-1 text-wrap badge text-bg-${variant}`}
        >
          {message}
        </div>
      </div>
    </>
  );
}
