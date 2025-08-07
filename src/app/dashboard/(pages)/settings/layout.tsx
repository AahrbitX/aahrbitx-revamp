import { IconTool, IconUser } from "@tabler/icons-react";
import SidebarNav from "./components/sidebar-nav";

export default function Settings({ children }: { children: React.ReactNode }) {
  return (
    <div className="p-4">
      <div className="space-y-0.5">
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
          Settings
        </h1>
        <p className="text-muted-foreground">
          Manage your account settings and set e-mail preferences.
        </p>
      </div>
      <div className="flex flex-1 flex-col space-y-2 overflow-hidden md:space-y-2 lg:flex-row lg:space-y-0 lg:space-x-12">
        <aside className="top-0 lg:sticky lg:w-1/5">
          <SidebarNav items={sidebarNavItems} />
        </aside>
        <div className="flex w-full overflow-y-hidden py-4">{children}</div>
      </div>
    </div>
  );
}

const sidebarNavItems = [
  {
    title: "General",
    icon: <IconUser size={18} />,
    href: "/dashboard/settings/general",
  },
];
