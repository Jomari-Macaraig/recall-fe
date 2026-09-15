export default function Group({ title, children }) {
  return (
    <div className="flex flex-col gap-2">
      <span className="font-mono text-xs text-muted px-1">{title}</span>
      <div className="flex flex-col gap-1">{children}</div>
    </div>
  );
}
