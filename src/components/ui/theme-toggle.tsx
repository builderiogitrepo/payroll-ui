import React from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/contexts/ThemeContext";
import { cn } from "@/lib/utils";

interface ThemeToggleProps {
  className?: string;
  variant?: "default" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  className,
  variant = "ghost",
  size = "md",
}) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant={variant}
      size={size}
      onClick={toggleTheme}
      className={cn(
        "relative overflow-hidden transition-all duration-300 hover:scale-105",
        "bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700",
        "text-white border-0 shadow-lg hover:shadow-xl",
        "backdrop-blur-sm bg-opacity-90",
        className,
      )}
      style={{
        background:
          theme === "dark"
            ? "linear-gradient(135deg, #6C5CE7 0%, #FF7675 100%)"
            : "linear-gradient(135deg, #1E90FF 0%, #00C9A7 100%)",
      }}
    >
      <div className="relative flex items-center justify-center">
        <Sun
          className={cn(
            "h-4 w-4 transition-all duration-300",
            theme === "light"
              ? "rotate-0 scale-100 opacity-100"
              : "rotate-90 scale-0 opacity-0",
          )}
        />
        <Moon
          className={cn(
            "absolute h-4 w-4 transition-all duration-300",
            theme === "dark"
              ? "rotate-0 scale-100 opacity-100"
              : "-rotate-90 scale-0 opacity-0",
          )}
        />
      </div>

      {/* Animated background gradient */}
      <div
        className={cn(
          "absolute inset-0 opacity-0 transition-opacity duration-300",
          "bg-gradient-to-r from-primary-600 to-primary-700",
          "hover:opacity-100",
        )}
      />

      {/* Glow effect */}
      <div
        className={cn(
          "absolute inset-0 rounded-md transition-all duration-300",
          "bg-gradient-to-r from-primary-400/20 to-primary-600/20",
          "blur-sm scale-110 opacity-0",
          "hover:opacity-100 hover:scale-125",
        )}
      />
    </Button>
  );
};

// Compact version for headers
export const ThemeToggleCompact: React.FC<{ className?: string }> = ({
  className,
}) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        "relative p-2 rounded-lg transition-all duration-300",
        "hover:scale-110 hover:shadow-lg",
        "bg-gradient-to-r from-primary-500/10 to-primary-600/10",
        "hover:from-primary-500/20 hover:to-primary-600/20",
        "border border-primary-500/20 hover:border-primary-500/40",
        "backdrop-blur-sm",
        className,
      )}
      style={{
        background:
          theme === "dark"
            ? "linear-gradient(135deg, rgba(108, 92, 231, 0.1) 0%, rgba(255, 118, 117, 0.1) 100%)"
            : "linear-gradient(135deg, rgba(30, 144, 255, 0.1) 0%, rgba(0, 201, 167, 0.1) 100%)",
      }}
    >
      <div className="relative">
        <Sun
          className={cn(
            "h-4 w-4 transition-all duration-300",
            theme === "light"
              ? "rotate-0 scale-100 opacity-100 text-primary-600"
              : "rotate-90 scale-0 opacity-0",
          )}
        />
        <Moon
          className={cn(
            "absolute top-0 left-0 h-4 w-4 transition-all duration-300",
            theme === "dark"
              ? "rotate-0 scale-100 opacity-100 text-primary-600"
              : "-rotate-90 scale-0 opacity-0",
          )}
        />
      </div>
    </button>
  );
};
