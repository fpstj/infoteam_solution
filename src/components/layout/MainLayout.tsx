import { ReactNode } from "react";

import { AppSidebar } from "./Sidebar";
import { Navbar } from "./Navbar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="flex min-h-screen flex-col bg-background text-text-primary transition-colors">
        <Navbar />
        <div className="flex-1 overflow-y-auto bg-background transition-colors">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
