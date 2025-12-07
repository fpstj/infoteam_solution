import { Search, Bell, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useThemeMode } from "@/theme/ThemeProvider";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetDescription,
} from "@/components/ui/sheet";
import { NotificationsPanel } from "@/components/layout/NotificationsPanel";

export function Navbar() {
  const { theme, toggleTheme } = useThemeMode();

  return (
    <header className="sticky top-0 z-20 h-16 border-b border-border bg-surface transition-colors">
      <div className="flex h-full items-center justify-between px-6">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          <SidebarTrigger className="h-9 w-9 rounded-md bg-surfaceMuted text-text-primary hover:bg-surfaceHover" />

          {/* Building Selector */}
          <select className="hidden min-w-[150px] rounded-md border border-border bg-surfaceMuted px-3 py-2 text-sm text-text-primary transition-colors focus:outline-none focus:ring-0 dark:bg-surface sm:block">
            <option>Building 1</option>
            <option>Building 2</option>
            <option>Building 3</option>
          </select>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Search Bar */}
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-secondary" />
            <Input placeholder="Search..." className="w-64 pl-10" />
          </div>

          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label="Toggle color theme"
          >
            {theme === "dark" ? (
              <Moon className="h-5 w-5" />
            ) : (
              <Sun className="h-5 w-5" />
            )}
          </Button>

          {/* Notifications */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="w-5 h-5" />
                <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-semantic-error" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full max-w-md gap-6">
              <SheetHeader>
                <SheetTitle>Notifications</SheetTitle>
                <SheetDescription>
                  Recent alerts from facilities, maintenance, and tenant reports
                </SheetDescription>
              </SheetHeader>
              <div className="flex flex-1 flex-col overflow-y-auto pr-1">
                <NotificationsPanel />
              </div>
              <SheetFooter>
                <SheetClose asChild>
                  <Button variant="outline">Close</Button>
                </SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
