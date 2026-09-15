import { Outlet, createRootRoute, Link } from "@tanstack/react-router";
import SidebarLink from "../components/ui/SidebarLink";
import Group from "../components/ui/Group";

export const Route = createRootRoute({
  component: RootComponent,
});

const groups = [
  {
    title: "Study",
    items: [
      { name: "Lessons", link: "/lesson" },
      { name: "Reviews", link: "/review" },
      { name: "Questions", link: "/question" },
      { name: "Schedule", link: "/schedule" },
      { name: "Coach", link: "/coach" },
    ],
  },
];

function RootComponent() {
  return (
    <div className="flex h-screen bg-base text-fg">
      <aside className="flex flex-col gap-5 w-64 pt-5 px-2 shrink-0 overflow-y-auto border-r border-line bg-ink">
        <span className="font-sans">
          <Link to="/">Recall</Link>
        </span>
        <hr className="text-line" />
        {groups.map((group) => (
          <Group title={group.title} key={group.title}>
            {group.items.map((item) => (
              <SidebarLink key={item.link} to={item.link}>
                {item.name}
              </SidebarLink>
            ))}
          </Group>
        ))}
      </aside>
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
