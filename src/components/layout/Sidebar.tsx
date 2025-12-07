import { useState } from "react";
import {
  Home,
  Euro,
  Users,
  // Wrench,
  // Building2,
  // Shield,
  // FileText,
  ChevronDown,
  Sparkles,
  User,
  CreditCard,
  Bell,
  LogOut,
} from "lucide-react";
import { NavLink } from "react-router-dom";

import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sidebar as SidebarContainer,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarSeparator,
  useSidebar,
} from "@/components/ui/sidebar";

const navigationItems = [
  { icon: Home, label: "Dashboard", path: "/", exact: true },
  { icon: Euro, label: "Financial Management", path: "/financial" },
  // { icon: Wrench, label: "Facility Management", path: "/facility" },
  // { icon: Users, label: "Occupancy & Utilization", path: "/occupancy" },
  // { icon: Building2, label: "Building Management", path: "/building" },
  // { icon: Shield, label: "Security", path: "/security" },
  // { icon: FileText, label: "Reports", path: "/reports" },
];

const currentUser = {
  name: "Filip Stojanov",
  email: "filip.stojanov@example.com",
  avatarUrl: "",
};

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function AppSidebar() {
  const [currentRole] = useState("Manager");
  const { state, isMobile, setOpenMobile } = useSidebar();
  const collapsed = state === "collapsed";

  const handleNavigate = () => {
    if (isMobile) {
      setOpenMobile(false);
    }
  };

  const userInitials = getInitials(currentUser.name);

  const renderUserMenuContent = (align: "start" | "center" | "end" = "end") => (
    <DropdownMenuContent
      align={align}
      side="right"
      sideOffset={12}
      alignOffset={0}
      className="w-64 p-1"
    >
      <div className="rounded-md bg-surface px-3 py-3">
        <p className="text-sm font-medium text-text-primary">
          {currentUser.name}
        </p>
        <p className="text-xs text-text-secondary">{currentUser.email}</p>
      </div>
      <DropdownMenuSeparator />
      <DropdownMenuItem className="flex items-center gap-3 px-3 py-2 text-text-primary">
        <Sparkles className="h-4 w-4 text-primary" />
        <span className="flex-1">Upgrade to Pro</span>
        <span className="text-xs text-text-secondary">↗</span>
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem className="flex items-center gap-3 px-3 py-2 text-text-primary">
        <User className="h-4 w-4 text-text-secondary" />
        <span>Account</span>
      </DropdownMenuItem>
      <DropdownMenuItem className="flex items-center gap-3 px-3 py-2 text-text-primary">
        <CreditCard className="h-4 w-4 text-text-secondary" />
        <span>Billing</span>
      </DropdownMenuItem>
      <DropdownMenuItem className="flex items-center gap-3 px-3 py-2 text-text-primary">
        <Bell className="h-4 w-4 text-text-secondary" />
        <span>Notifications</span>
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem className="flex items-center gap-3 px-3 py-2 text-text-primary">
        <LogOut className="h-4 w-4 text-text-secondary" />
        <span>Log out</span>
      </DropdownMenuItem>
    </DropdownMenuContent>
  );

  return (
    <SidebarContainer
      collapsible="icon"
      className="border-border bg-surface text-text-primary"
    >
      <SidebarHeader className="border-b border-border px-3 py-4">
        {collapsed ? (
          <div className="flex items-center justify-center">
            <div className="flex h-10 w-10 items-center justify-center rounded-md text-sm font-bold text-primary">
              BD
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-3 rounded-md py-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary text-sm font-bold text-white">
              BD
            </div>
            <span className="text-base font-semibold">BDM System</span>
          </div>
        )}
      </SidebarHeader>

      <SidebarContent>
        <div className="border-b border-border py-4">
          {collapsed ? (
            <div className="flex items-center justify-center bg-surfaceMuted px-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-md">
                <Users className="h-4 w-4 text-text-secondary" />
              </div>
            </div>
          ) : (
            <div className="rounded-md px-3 py-2">
              <p className="mb-1 text-xs text-text-secondary">Current role</p>
              <select className="w-full rounded border border-border bg-surface px-2 py-1 text-sm text-text-primary transition-colors focus:outline-none focus:ring-0">
                <option>{currentRole}</option>
                <option>Property Owner</option>
                <option>Tenant</option>
                <option>Visitor</option>
              </select>
            </div>
          )}
        </div>

        <nav className="flex flex-1 flex-col gap-1 overflow-y-auto py-4">
          {navigationItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.exact}
                onClick={handleNavigate}
                className={({ isActive }) =>
                  cn(
                    "group flex w-full items-center gap-3 px-5 py-2 text-sm font-medium transition-colors",
                    collapsed && "justify-center px-0",
                    isActive
                      ? collapsed
                        ? "bg-surfaceMuted text-primary"
                        : "border-l-4 border-primary bg-surfaceMuted text-primary"
                      : "text-text-secondary hover:bg-surfaceHover hover:text-text-primary"
                  )
                }
              >
                <Icon className="h-5 w-5" />
                {!collapsed && <span>{item.label}</span>}
              </NavLink>
            );
          })}
        </nav>
      </SidebarContent>

      <SidebarSeparator />

      <SidebarFooter className="px-3 py-4">
        {collapsed ? (
          <div className="flex flex-col items-center gap-3 px-3">
            <div className="flex gap-2">
              <button className="rounded bg-primary px-2 py-1 text-xs text-white transition-colors hover:bg-primary/90">
                SI
              </button>
              <button className="rounded px-2 py-1 text-xs text-text-secondary transition-colors hover:bg-surfaceHover">
                EN
              </button>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="rounded-full px-2 transition-colors hover:border-primary focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 data-[state=open]:border-primary data-[state=open]:bg-surfaceHover">
                  <Avatar className="h-10 w-10">
                    <AvatarImage
                      src={currentUser.avatarUrl}
                      alt={currentUser.name}
                    />
                    <AvatarFallback>{userInitials}</AvatarFallback>
                  </Avatar>
                </button>
              </DropdownMenuTrigger>
              {renderUserMenuContent("end")}
            </DropdownMenu>
          </div>
        ) : (
          <div className="flex flex-col gap-4 rounded-md py-3">
            <div className="px-3">
              <p className="mb-2 text-xs text-text-secondary">Language</p>
              <div className="flex gap-2">
                <button className="rounded bg-primary px-3 py-1 text-sm text-white transition-colors hover:bg-primary/90">
                  SI
                </button>
                <button className="rounded px-3 py-1 text-sm text-text-secondary transition-colors hover:bg-surfaceHover">
                  EN
                </button>
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-left transition-colors hover:bg-surfaceHover focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 data-[state=open]:bg-surfaceHover">
                  <Avatar className="h-10 w-10 border border-border">
                    <AvatarImage
                      src={currentUser.avatarUrl}
                      alt={currentUser.name}
                    />
                    <AvatarFallback>{userInitials}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-text-primary">
                      {currentUser.name}
                    </p>
                    <p className="text-xs text-text-secondary">
                      {currentUser.email}
                    </p>
                  </div>
                  <ChevronDown className="h-4 w-4 text-text-secondary" />
                </button>
              </DropdownMenuTrigger>
              {renderUserMenuContent("end")}
            </DropdownMenu>
          </div>
        )}
      </SidebarFooter>

      <SidebarRail />
    </SidebarContainer>
  );
}
