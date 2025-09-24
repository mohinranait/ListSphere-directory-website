import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

import { NavUser } from "../nav-user";
import { NavGroup } from "../nav-group";
import { sidebarData } from "@/consts/menus";
import { SidebarHeaderAction } from "./sidebar-header";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" variant="sidebar" {...props}>
      <SidebarHeader className="border-b h-16">
        <SidebarHeaderAction />
      </SidebarHeader>
      <SidebarContent>
        {sidebarData.map((props) => (
          <NavGroup key={props.title} {...props} />
        ))}
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
