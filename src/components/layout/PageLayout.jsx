import Subtitle from "../ui/Subtitle";

export default function PageLayout({ title, subtitle, actions, children }) {
  return (
    <div>
      <div className="mx-10 my-5 flex justify-between">
        <div>
          <h1 className="text-2xl">{title}</h1>
          <Subtitle>{subtitle}</Subtitle>
        </div>
        {actions && <div className="flex gap-2">{actions}</div>}
      </div>
      <hr className="border-line" />
      <div className="mx-10 my-5">{children}</div>
    </div>
  );
}
