import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PageHeaderProps {
  title: string;
  description?: string;
  children?: ReactNode;
  className?: string;
}

export function PageHeader({
  title,
  description,
  children,
  className,
}: PageHeaderProps) {
  return (
    <div
      className={cn("border-b border-slate-200 bg-white px-4 py-4", className)}
    >
      <div
        className="flex items-center justify-between"
        style={{ fontFamily: "Montserrat, sans-serif" }}
      >
        <div className="space-y-1">
          <h1
            className="text-slate-900"
            style={{ font: "700 17.5px/24.5px Manrope, sans-serif" }}
          >
            {title}
          </h1>
          {description && (
            <p className="text-sm text-slate-600">{description}</p>
          )}
        </div>
        {children && <div className="flex items-center gap-2">{children}</div>}
      </div>
    </div>
  );
}
