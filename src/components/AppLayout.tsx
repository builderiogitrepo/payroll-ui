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
  ChevronDown,
  ChevronRight,
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
import jnetLogo from "@/assets/images/jnet-logo.png";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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
  // Payroll Settings Section
  {
    section: "Payroll Settings",
    children: [
      {
        title: "Payhead Master",
        path: "/payheads",
        icon: FileText,
        description: "Manage earning and deduction payheads",
      },
      {
        title: "Salary Configuration",
        path: "/salary-configuration",
        icon: Settings,
        description: "Configure salary structures and statutory components",
      },
      {
        title: "Pay Schedule",
        path: "/pay-schedule",
        icon: Calendar,
        description: "Configure pay schedules for different business units",
      },
    ],
  },
];

export function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [fontSize, setFontSize] = useState("normal");
  const [payrollSettingsOpen, setPayrollSettingsOpen] = useState(true);
  const location = useLocation();

  // Apply font size class to html
  React.useEffect(() => {
    document.documentElement.className = document.documentElement.className
      .replace(/font-(smaller|normal|larger)/g, "")
      .concat(` font-${fontSize}`)
      .trim();
  }, [fontSize]);

  const payrollSettingsPaths = [
    "/salary-configuration",
    "/payheads",
    "/pay-schedule",
  ];
  const isPayrollSectionActive = payrollSettingsPaths.includes(
    location.pathname,
  );

  const isCollapsed = !sidebarOpen && window.innerWidth >= 1024;

  return (
    <div className="h-screen flex bg-slate-50">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Professional Sidebar */}
      <div
        className={cn(
          "bg-slate-900 text-slate-100 transition-all duration-300 flex flex-col shadow-xl z-50 overflow-x-hidden min-w-0", // added min-w-0
          "fixed lg:relative h-full",
          sidebarOpen ? "w-64" : "w-16 lg:w-16",
          "transform lg:transform-none",
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
          "lg:z-auto z-50",
        )}
      >
        {/* Professional Header */}
        <div className="p-4 border-b border-slate-700 bg-slate-800 min-w-0">
          <div className="flex items-center justify-between">
            {sidebarOpen && (
              <div>
                <h1 className="text-xl font-bold text-white tracking-tight">
                  JNET
                </h1>
                <p className="text-slate-300 text-sm font-medium">
                  Payroll System
                </p>
              </div>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-slate-300 hover:text-white hover:bg-slate-700"
            >
              <Menu
                className={cn(
                  "transition-all duration-200",
                  sidebarOpen ? "h-5 w-5" : "h-6 w-6",
                )}
              />
            </Button>
          </div>
        </div>

        {/* Professional Navigation */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto min-w-0">
          {navigationItems.map((item, idx) => {
            if (item.section) {
              // Section header and grouped children
              const isActiveParent = item.children.some(
                (child) => location.pathname === child.path,
              );
              // Collapsed sidebar: show flyout on icon hover
              if (isCollapsed) {
                return (
                  <TooltipProvider key={item.section}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button
                          type="button"
                          className={cn(
                            "flex items-center justify-center w-full h-12 rounded-lg transition-all duration-200 group min-w-0",
                            isActiveParent && "bg-blue-50 text-blue-700",
                          )}
                        >
                          <Settings className="h-5 w-5" />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent side="right" className="p-0 fixed">
                        <div className="bg-white shadow-lg rounded min-w-[180px] py-2">
                          <div className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-slate-400">
                            {item.section}
                          </div>
                          {item.children.map((child) => {
                            const Icon = child.icon;
                            const isActive = location.pathname === child.path;
                            return (
                              <Link
                                key={child.path}
                                to={child.path}
                                className={cn(
                                  "flex items-center gap-3 px-4 py-2 text-sm rounded transition-all duration-200",
                                  isActive
                                    ? "bg-blue-600 text-white font-medium"
                                    : "text-slate-700 hover:bg-blue-50 hover:text-blue-700",
                                )}
                              >
                                <Icon className="h-4 w-4" />
                                {child.title}
                              </Link>
                            );
                          })}
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                );
              }
              // Expanded sidebar: modern parent/child styling
              return (
                <div key={item.section} className="mt-4">
                  <button
                    type="button"
                    className={cn(
                      "w-full flex items-center justify-between px-3 py-2 text-base font-bold tracking-wide text-slate-400 hover:text-blue-600 focus:outline-none",
                      isActiveParent &&
                        "text-blue-600 font-bold bg-slate-800/10 rounded",
                    )}
                    onClick={() => setPayrollSettingsOpen((open) => !open)}
                  >
                    <span className="flex items-center gap-2">
                      <Settings className="h-5 w-5" />
                      {item.section}
                    </span>
                    {payrollSettingsOpen ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </button>
                  {payrollSettingsOpen && (
                    <div className="space-y-1">
                      {item.children.map((child) => {
                        const Icon = child.icon;
                        const isActive = location.pathname === child.path;
                        return (
                          <Link
                            key={child.path}
                            to={child.path}
                            className={cn(
                              "flex items-center gap-3 pl-8 pr-3 py-3 rounded-lg transition-all duration-200 group text-sm",
                              "hover:bg-slate-800 hover:text-white",
                              isActive
                                ? "bg-blue-600 text-white font-medium"
                                : "text-slate-400",
                            )}
                            onClick={() => {
                              if (window.innerWidth < 1024) {
                                setSidebarOpen(false);
                              }
                            }}
                          >
                            <Icon className="flex-shrink-0 h-4 w-4" />
                            <span>{child.title}</span>
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            }
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 group",
                  "hover:bg-slate-800 hover:text-white",
                  "min-h-[44px] lg:min-h-auto", // Touch-friendly minimum height on mobile
                  isActive
                    ? "bg-blue-600 text-white shadow-lg font-medium"
                    : "text-slate-300",
                )}
                onClick={() => {
                  // Close sidebar on mobile when navigation item is clicked
                  if (window.innerWidth < 1024) {
                    setSidebarOpen(false);
                  }
                }}
              >
                <Icon
                  className={cn(
                    "flex-shrink-0 transition-all duration-200",
                    sidebarOpen ? "h-4 w-4" : "h-6 w-6",
                  )}
                />
                {sidebarOpen && (
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{item.title}</p>
                    <p className="text-xs text-slate-400 truncate">
                      {item.description}
                    </p>
                  </div>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Professional User Profile */}
        <div className="p-4 border-t border-slate-700 bg-slate-800">
          {sidebarOpen ? (
            <div className="flex items-center gap-3">
              <Avatar className="h-9 w-9 ring-2 ring-slate-600">
                <AvatarImage src="/placeholder-avatar.jpg" />
                <AvatarFallback className="bg-slate-700 text-white">
                  HR
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-white truncate">
                  HR Admin
                </p>
                <p className="text-xs text-slate-400 truncate">
                  admin@company.com
                </p>
              </div>
            </div>
          ) : (
            <Avatar className="h-9 w-9 mx-auto ring-2 ring-slate-600">
              <AvatarImage src="/placeholder-avatar.jpg" />
              <AvatarFallback className="bg-slate-700 text-white">
                HR
              </AvatarFallback>
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
        {/* Professional Top Bar */}
        <header className="bg-white border-b border-slate-200 px-4 lg:px-6 py-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* Mobile Burger Menu */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden h-9 w-9 p-0 hover:bg-slate-100"
              >
                <Menu className="h-5 w-5" />
              </Button>

              <div className="relative flex-1 max-w-lg">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                <Input
                  placeholder="Search..."
                  className="pl-10 bg-slate-50 border-slate-200 focus:border-blue-500 focus:ring-blue-500 text-sm h-10 lg:placeholder:text-base"
                />
              </div>
            </div>
            <div className="flex items-center gap-2 lg:gap-3">
              <Button
                variant="ghost"
                size="sm"
                className="relative h-9 w-9 p-0 hover:bg-slate-100"
              >
                <Bell className="h-4 w-4" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                  3
                </span>
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="flex items-center gap-2 h-9 px-2 lg:px-3 hover:bg-slate-100"
                  >
                    <Avatar className="h-7 w-7">
                      <AvatarImage src="/placeholder-avatar.jpg" />
                      <AvatarFallback className="text-xs">HR</AvatarFallback>
                    </Avatar>
                    <span className="hidden lg:inline text-sm font-medium">
                      HR Admin
                    </span>
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
        <main className="flex-1 overflow-auto bg-slate-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
