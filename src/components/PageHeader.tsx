import React from "react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/contexts/ThemeContext";

interface PageHeaderProps {
  title: string;
  description?: string;
  children?: React.ReactNode;
  className?: string;
  gradient?:
    | "primary"
    | "secondary"
    | "accent"
    | "success"
    | "warning"
    | "sunset"
    | "ocean"
    | "forest"
    | "fire"
    | "aurora"
    | "midnight"
    | "sunrise"
    | "twilight";
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  description,
  children,
  className,
  gradient = "primary",
}) => {
  const { theme } = useTheme();

  const gradientStyles = {
    primary:
      theme === "dark"
        ? "linear-gradient(135deg, rgba(0, 102, 204, 0.1) 0%, rgba(0, 153, 255, 0.1) 100%)"
        : "linear-gradient(135deg, rgba(0, 102, 204, 0.05) 0%, rgba(0, 153, 255, 0.05) 100%)",
    secondary:
      theme === "dark"
        ? "linear-gradient(135deg, rgba(0, 64, 128, 0.1) 0%, rgba(0, 102, 204, 0.1) 100%)"
        : "linear-gradient(135deg, rgba(0, 64, 128, 0.05) 0%, rgba(0, 102, 204, 0.05) 100%)",
    accent:
      theme === "dark"
        ? "linear-gradient(135deg, rgba(0, 153, 255, 0.1) 0%, rgba(102, 179, 255, 0.1) 100%)"
        : "linear-gradient(135deg, rgba(0, 153, 255, 0.05) 0%, rgba(102, 179, 255, 0.05) 100%)",
    success:
      theme === "dark"
        ? "linear-gradient(135deg, rgba(0, 204, 153, 0.1) 0%, rgba(0, 153, 255, 0.1) 100%)"
        : "linear-gradient(135deg, rgba(0, 204, 153, 0.05) 0%, rgba(0, 153, 255, 0.05) 100%)",
    warning:
      theme === "dark"
        ? "linear-gradient(135deg, rgba(255, 153, 51, 0.1) 0%, rgba(0, 102, 204, 0.1) 100%)"
        : "linear-gradient(135deg, rgba(255, 153, 51, 0.05) 0%, rgba(0, 102, 204, 0.05) 100%)",
    sunset:
      theme === "dark"
        ? "linear-gradient(135deg, rgba(255, 107, 107, 0.1) 0%, rgba(254, 202, 87, 0.1) 50%, rgba(0, 153, 255, 0.1) 100%)"
        : "linear-gradient(135deg, rgba(255, 107, 107, 0.05) 0%, rgba(254, 202, 87, 0.05) 50%, rgba(0, 153, 255, 0.05) 100%)",
    ocean:
      theme === "dark"
        ? "linear-gradient(135deg, rgba(0, 102, 204, 0.1) 0%, rgba(0, 153, 255, 0.1) 50%, rgba(102, 179, 255, 0.1) 100%)"
        : "linear-gradient(135deg, rgba(0, 102, 204, 0.05) 0%, rgba(0, 153, 255, 0.05) 50%, rgba(102, 179, 255, 0.05) 100%)",
    forest:
      theme === "dark"
        ? "linear-gradient(135deg, rgba(0, 204, 153, 0.1) 0%, rgba(0, 153, 255, 0.1) 100%)"
        : "linear-gradient(135deg, rgba(0, 204, 153, 0.05) 0%, rgba(0, 153, 255, 0.05) 100%)",
    fire:
      theme === "dark"
        ? "linear-gradient(135deg, rgba(255, 107, 107, 0.1) 0%, rgba(255, 153, 51, 0.1) 100%)"
        : "linear-gradient(135deg, rgba(255, 107, 107, 0.05) 0%, rgba(255, 153, 51, 0.05) 100%)",
    aurora:
      theme === "dark"
        ? "linear-gradient(135deg, rgba(102, 179, 255, 0.1) 0%, rgba(153, 204, 255, 0.1) 100%)"
        : "linear-gradient(135deg, rgba(102, 179, 255, 0.05) 0%, rgba(153, 204, 255, 0.05) 100%)",
    midnight:
      theme === "dark"
        ? "linear-gradient(135deg, rgba(0, 26, 51, 0.1) 0%, rgba(0, 102, 204, 0.1) 100%)"
        : "linear-gradient(135deg, rgba(0, 26, 51, 0.05) 0%, rgba(0, 102, 204, 0.05) 100%)",
    sunrise:
      theme === "dark"
        ? "linear-gradient(135deg, rgba(255, 236, 210, 0.1) 0%, rgba(0, 153, 255, 0.1) 100%)"
        : "linear-gradient(135deg, rgba(255, 236, 210, 0.05) 0%, rgba(0, 153, 255, 0.05) 100%)",
    twilight:
      theme === "dark"
        ? "linear-gradient(135deg, rgba(0, 102, 204, 0.1) 0%, rgba(0, 153, 255, 0.1) 50%, rgba(102, 179, 255, 0.1) 100%)"
        : "linear-gradient(135deg, rgba(0, 102, 204, 0.05) 0%, rgba(0, 153, 255, 0.05) 50%, rgba(102, 179, 255, 0.05) 100%)",
  };

  const titleColors = {
    primary: theme === "dark" ? "text-blue-400" : "text-blue-600",
    secondary: theme === "dark" ? "text-blue-500" : "text-blue-700",
    accent: theme === "dark" ? "text-blue-300" : "text-blue-500",
    success: theme === "dark" ? "text-green-400" : "text-green-600",
    warning: theme === "dark" ? "text-orange-400" : "text-orange-600",
    sunset: theme === "dark" ? "text-red-400" : "text-red-600",
    ocean: theme === "dark" ? "text-blue-300" : "text-blue-600",
    forest: theme === "dark" ? "text-green-400" : "text-green-600",
    fire: theme === "dark" ? "text-red-400" : "text-red-600",
    aurora: theme === "dark" ? "text-blue-200" : "text-blue-500",
    midnight: theme === "dark" ? "text-blue-400" : "text-blue-700",
    sunrise: theme === "dark" ? "text-orange-300" : "text-orange-600",
    twilight: theme === "dark" ? "text-blue-300" : "text-blue-600",
  };

  const gradientOverlays = {
    primary: "linear-gradient(135deg, #1E90FF 0%, #00C9A7 100%)",
    secondary: "linear-gradient(135deg, #6C5CE7 0%, #FF7675 100%)",
    accent: "linear-gradient(135deg, #00C9A7 0%, #6C5CE7 100%)",
    success: "linear-gradient(135deg, #00C9A7 0%, #1E90FF 100%)",
    warning: "linear-gradient(135deg, #FF7675 0%, #6C5CE7 100%)",
    sunset: "linear-gradient(135deg, #ff6b6b 0%, #feca57 50%, #48dbfb 100%)",
    ocean: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    forest: "linear-gradient(135deg, #11998e 0%, #38ef7d 100%)",
    fire: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
    aurora: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
    midnight: "linear-gradient(135deg, #2c3e50 0%, #3498db 100%)",
    sunrise: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
    twilight: "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)",
  };

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl p-6 mb-6 transition-all duration-300",
        "backdrop-blur-md border border-border/50",
        "hover:shadow-lg hover:scale-[1.01]",
        className,
      )}
      style={{
        background: gradientStyles[gradient],
        border:
          theme === "dark"
            ? "1px solid rgba(255, 255, 255, 0.1)"
            : "1px solid rgba(0, 0, 0, 0.1)",
      }}
    >
      {/* Gradient overlay */}
      <div
        className="absolute inset-0 opacity-20 transition-opacity duration-300"
        style={{
          background: gradientOverlays[gradient],
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <h1
              className={cn(
                "text-3xl font-bold tracking-tight transition-colors duration-300",
                titleColors[gradient],
              )}
            >
              {title}
            </h1>
            {description && (
              <p className="text-muted-foreground text-lg transition-colors duration-300">
                {description}
              </p>
            )}
          </div>
          {children && (
            <div className="flex items-center gap-3">{children}</div>
          )}
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
        <div className="w-full h-full rounded-full bg-gradient-to-br from-primary-500 to-primary-600 blur-2xl" />
      </div>
      <div className="absolute bottom-0 left-0 w-24 h-24 opacity-10">
        <div className="w-full h-full rounded-full bg-gradient-to-tr from-secondary-500 to-secondary-600 blur-xl" />
      </div>
    </div>
  );
};
