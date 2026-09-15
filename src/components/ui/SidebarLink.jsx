import { Link } from "@tanstack/react-router";

export default function SidebarLink({ to, children }) {
  return (
    <Link
      to={to}
      className="text-sm font-sans py-2 px-2"
      activeProps={{ className: "text-accent-hi border-l-2 border-accent rounded-md bg-accent/15" }}
      inactiveProps={{ className: "text-muted" }}
    >
      {children}
    </Link>
  );
}
