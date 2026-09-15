import Subtitle from "./Subtitle";

export default function Group({ title, children }) {
  return (
    <div className="flex flex-col gap-2">
      <Subtitle>{title}</Subtitle>
      <div className="flex flex-col gap-1">{children}</div>
    </div>
  );
}
