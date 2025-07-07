import React, { useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import {
  Users,
  Calendar,
  Settings,
  FileText,
  TrendingUp,
  Calculator,
  Upload,
  CreditCard,
  BarChart3,
  Menu,
  Bell,
  User,
  Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const navigationItems = [
  {
    title: "Employee Information",
    path: "/employees",
    icon: Users,
    description: "Manage employee data and profiles",
  },
  {
    title: "Attendance",
    path: "/attendance",
    icon: Calendar,
    description: "Track employee attendance and leaves",
  },
  {
    title: "Salary Structure",
    path: "/salary-structure",
    icon: Settings,
    description: "Configure salary structures and components",
  },
  {
    title: "Payhead Master",
    path: "/payheads",
    icon: FileText,
    description: "Manage earning and deduction payheads",
  },
  {
    title: "Additional Pay Components",
    path: "/adjustments",
    icon: Calculator,
    description: "Process salary adjustments and corrections",
  },
  {
    title: "Variable Pay",
    path: "/variable-pay",
    icon: TrendingUp,
    description: "Manage quarterly variable pay tracking",
  },
  {
    title: "Statutory Components",
    path: "/statutory-settings",
    icon: CreditCard,
    description: "Configure PF, Professional Tax, and ESIC",
  },
  {
    title: "Pay Schedule",
    path: "/pay-schedule",
    icon: Calendar,
    description: "Configure pay schedules for different business units",
  },
  {
    title: "Taxes",
    path: "/tds-upload",
    icon: Upload,
    description: "Upload and manage TDS data",
  },
  {
    title: "Payroll Runs",
    path: "/payroll",
    icon: BarChart3,
    description: "Execute and manage payroll processing",
  },
];

export function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [fontSize, setFontSize] = useState("normal");
  const location = useLocation();

  // Apply font size class to html
  React.useEffect(() => {
    document.documentElement.className = document.documentElement.className
      .replace(/font-(smaller|normal|larger)/g, "")
      .concat(` font-${fontSize}`)
      .trim();
  }, [fontSize]);

  return (
    <div className="h-screen flex bg-gray-50">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "bg-blue-500 text-white transition-all duration-300 flex flex-col shadow-lg z-50",
          "fixed lg:relative h-full",
          sidebarOpen ? "w-64" : "w-14 lg:w-14",
          "transform lg:transform-none",
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        )}
      >
        {/* Header */}
        <div className="p-3 border-b border-blue-400">
          <div className="flex items-center justify-between">
            {sidebarOpen && (
              <div>
                <h1 className="text-lg font-bold text-white">JNET</h1>
                <p className="text-blue-100 text-xs">Payroll System</p>
              </div>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-blue-100 hover:text-white hover:bg-blue-400"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-2 px-2 py-2 rounded-lg transition-all duration-200 group",
                  isActive
                    ? "bg-white text-blue-500 shadow-lg font-medium"
                    : "text-white hover:bg-blue-400 hover:text-white",
                )}
              >
                <Icon className="h-4 w-4 flex-shrink-0" />
                {sidebarOpen && (
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{item.title}</p>
                    <p className="text-xs opacity-75 truncate">
                      {item.description}
                    </p>
                  </div>
                )}
              </Link>
            );
          })}
        </nav>

        {/* User Profile */}
        <div className="p-3 border-t border-blue-400">
          {sidebarOpen ? (
            <div className="flex items-center gap-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder-avatar.jpg" />
                <AvatarFallback>HR</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">
                  HR Admin
                </p>
                <p className="text-xs text-blue-100 truncate">
                  admin@company.com
                </p>
              </div>
            </div>
          ) : (
            <Avatar className="h-8 w-8 mx-auto">
              <AvatarImage src="/placeholder-avatar.jpg" />
              <AvatarFallback>HR</AvatarFallback>
            </Avatar>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div
        className={cn(
          "flex-1 flex flex-col overflow-hidden transition-all duration-300",
          "lg:ml-0",
          !sidebarOpen && "lg:ml-0",
        )}
      >
        {/* Top Bar */}
        <header className="bg-white border-b border-gray-200 px-4 py-3 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Smart search: 'Marketing Mumbai', 'Active Employees', 'Pending Payroll'"
                  className="pl-10 bg-gray-50 border-gray-200 focus:border-blue-500 focus:ring-blue-500 text-sm h-9"
                />
              </div>

              <div className="flex items-center gap-1">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setFontSize("smaller")}
                  className={`h-8 w-8 p-0 text-xs ${fontSize === "smaller" ? "bg-blue-50 border-blue-200" : ""}`}
                  title="Decrease font size"
                >
                  A-
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setFontSize("normal")}
                  className={`h-8 w-8 p-0 text-xs ${fontSize === "normal" ? "bg-blue-50 border-blue-200" : ""}`}
                  title="Default font size"
                >
                  A
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setFontSize("larger")}
                  className={`h-8 w-8 p-0 text-xs ${fontSize === "larger" ? "bg-blue-50 border-blue-200" : ""}`}
                  title="Increase font size"
                >
                  A+
                </Button>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                className="relative h-8 w-8 p-0"
              >
                <Bell className="h-4 w-4" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center text-[10px]">
                  3
                </span>
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="flex items-center gap-2 h-8 px-2"
                  >
                    <Avatar className="h-6 w-6">
                      <AvatarImage src="/placeholder-avatar.jpg" />
                      <AvatarFallback className="text-xs">HR</AvatarFallback>
                    </Avatar>
                    <span className="text-xs font-medium">HR Admin</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Sign out</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
