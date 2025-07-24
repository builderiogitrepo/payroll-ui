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
  LayoutDashboard,
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
import { ThemeToggleCompact } from "@/components/ui/theme-toggle";
import { useTheme } from "@/contexts/ThemeContext";
import jnetLogo from "@/assets/images/jnet-logo.png";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const navigationItems = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
    description: "Analytics and insights overview",
  },
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
  const { theme } = useTheme();

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
    <div className="h-screen flex bg-background">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Modern Sidebar with Gradient */}
      <div
        className={cn(
          "transition-all duration-300 flex flex-col shadow-2xl z-50 overflow-x-hidden min-w-0",
          "fixed lg:relative h-full backdrop-blur-md",
          sidebarOpen ? "w-64" : "w-16 lg:w-16",
          "transform lg:transform-none",
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
          "lg:z-auto z-50",
        )}
        style={{
          background:
            theme === "dark"
              ? "linear-gradient(180deg, rgba(30, 34, 45, 0.95) 0%, rgba(30, 34, 45, 0.98) 100%)"
              : "linear-gradient(180deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.98) 100%)",
          borderRight:
            theme === "dark"
              ? "1px solid rgba(255, 255, 255, 0.1)"
              : "1px solid rgba(0, 0, 0, 0.1)",
        }}
      >
        {/* Modern Header with Gradient */}
        <div
          className="p-4 border-b min-w-0 transition-all duration-300"
          style={{
            background:
              theme === "dark"
                ? "linear-gradient(135deg, rgba(108, 92, 231, 0.2) 0%, rgba(255, 118, 117, 0.2) 100%)"
                : "linear-gradient(135deg, rgba(30, 144, 255, 0.1) 0%, rgba(0, 201, 167, 0.1) 100%)",
            borderBottom:
              theme === "dark"
                ? "1px solid rgba(255, 255, 255, 0.1)"
                : "1px solid rgba(0, 0, 0, 0.1)",
          }}
        >
          <div className="flex items-center justify-between">
            {sidebarOpen && (
              <div className="space-y-1">
                <h1
                  className="text-xl font-bold tracking-tight transition-colors duration-300"
                  style={{
                    background:
                      theme === "dark"
                        ? "linear-gradient(135deg, #1E90FF 0%, #00C9A7 100%)"
                        : "linear-gradient(135deg, #6C5CE7 0%, #FF7675 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  JNET
                </h1>
                <p className="text-muted-foreground text-sm font-medium transition-colors duration-300">
                  Payroll System
                </p>
              </div>
            )}
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-all duration-300"
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
        </div>

        {/* Modern Navigation */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto min-w-0">
          {navigationItems.map((item, idx) => {
            // Payroll Settings section
            if (item.section) {
              const isActiveParent = item.children?.some(
                (child) => location.pathname === child.path,
              );

              if (isCollapsed) {
                return (
                  <TooltipProvider key={item.section}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button
                          className={cn(
                            "flex items-center justify-center w-full h-12 rounded-lg transition-all duration-300 group min-w-0",
                            "hover:bg-accent/50 hover:scale-105",
                            isActiveParent && "bg-primary/20 text-primary",
                          )}
                          onClick={() =>
                            setPayrollSettingsOpen((open) => !open)
                          }
                        >
                          <Settings className="h-5 w-5" />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent side="right" className="p-2">
                        <div className="text-sm font-medium">
                          {item.section}
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          {item.children?.map((child, index) => (
                            <div
                              key={index}
                              className="flex items-center gap-2 py-1"
                            >
                              <child.icon className="h-3 w-3" />
                              <span>{child.title}</span>
                            </div>
                          ))}
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                );
              }

              return (
                <div key={item.section} className="space-y-1">
                  <button
                    className={cn(
                      "flex items-center justify-between w-full px-3 py-2 text-sm rounded-lg transition-all duration-300",
                      "hover:scale-105 hover:shadow-md",
                      "text-muted-foreground hover:bg-accent/50 hover:text-primary",
                      isActiveParent &&
                        "text-primary font-bold bg-primary/10 rounded-lg",
                    )}
                    onClick={() => setPayrollSettingsOpen((open) => !open)}
                  >
                    <span>{item.section}</span>
                    <ChevronRight
                      className={cn(
                        "h-4 w-4 transition-transform duration-200",
                        payrollSettingsOpen && "rotate-90",
                      )}
                    />
                  </button>
                  {payrollSettingsOpen && (
                    <div className="mt-2 ml-4 space-y-1">
                      {item.children.map((child) => {
                        const Icon = child.icon;
                        const isActive = location.pathname === child.path;
                        return (
                          <Link
                            key={child.path}
                            to={child.path}
                            className={cn(
                              "flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-all duration-300",
                              "hover:scale-105 hover:shadow-md",
                              isActive
                                ? "bg-gradient-to-r from-primary-500 to-primary-600 text-white font-medium shadow-lg"
                                : "text-muted-foreground hover:bg-accent/50 hover:text-primary",
                            )}
                          >
                            <Icon className="h-4 w-4" />
                            {child.title}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            }

            // Regular navigation item
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            if (isCollapsed) {
              return (
                <TooltipProvider key={item.path}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link
                        to={item.path}
                        className={cn(
                          "flex items-center justify-center w-full h-12 rounded-lg transition-all duration-300 group min-w-0",
                          "hover:bg-accent/50 hover:scale-105",
                          isActive && "bg-primary/20 text-primary",
                        )}
                      >
                        <Icon className="h-5 w-5" />
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent side="right" className="p-2">
                      <div className="text-sm font-medium">{item.title}</div>
                      <div className="text-xs text-muted-foreground">
                        {item.description}
                      </div>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              );
            }

            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-all duration-300",
                  "hover:scale-105 hover:shadow-md",
                  isActive
                    ? "bg-gradient-to-r from-primary-500 to-primary-600 text-white font-medium shadow-lg"
                    : "text-muted-foreground hover:bg-accent/50 hover:text-primary",
                )}
              >
                <Icon className="h-4 w-4" />
                {item.title}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Modern Header */}
        <header
          className="h-16 px-6 flex items-center justify-between border-b transition-all duration-300"
          style={{
            background:
              theme === "dark"
                ? "rgba(30, 34, 45, 0.8)"
                : "rgba(255, 255, 255, 0.8)",
            borderBottom:
              theme === "dark"
                ? "1px solid rgba(255, 255, 255, 0.1)"
                : "1px solid rgba(0, 0, 0, 0.1)",
            backdropFilter: "blur(12px)",
          }}
        >
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search..."
                className="pl-10 w-80 bg-background/50 border-border/50 backdrop-blur-sm transition-all duration-300"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="relative text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-all duration-300"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-3 w-3 bg-primary rounded-full animate-pulse" />
            </Button>

            <ThemeToggleCompact />

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-8 w-8 rounded-full transition-all duration-300 hover:scale-105"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/avatars/01.png" alt="@user" />
                    <AvatarFallback className="bg-gradient-to-r from-primary-500 to-primary-600 text-white">
                      U
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-56 backdrop-blur-md transition-all duration-300"
                align="end"
                forceMount
                style={{
                  background:
                    theme === "dark"
                      ? "rgba(30, 34, 45, 0.95)"
                      : "rgba(255, 255, 255, 0.95)",
                  border:
                    theme === "dark"
                      ? "1px solid rgba(255, 255, 255, 0.1)"
                      : "1px solid rgba(0, 0, 0, 0.1)",
                }}
              >
                <DropdownMenuItem className="transition-all duration-300 hover:bg-accent/50">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="transition-all duration-300 hover:bg-accent/50">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="transition-all duration-300 hover:bg-destructive/20 text-destructive">
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-auto p-6 transition-all duration-300">
          <div className="animate-fade-in">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
