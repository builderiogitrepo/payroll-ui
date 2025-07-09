import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PageHeaderProps {
  title: string;
  description?: string;
  icon?: ReactNode;
  children?: ReactNode;
  className?: string;
}

export function PageHeader({
  title,
  description,
  icon,
  children,
  className,
}: PageHeaderProps) {
  return (
    <div
      className={cn(
        "border-b border-slate-200 bg-white px-6 py-6 shadow-sm",
        className,
      )}
    >
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-3">
            {icon && icon}
            {title}
          </h1>
          {description && (
            <p className="text-slate-600 text-base leading-relaxed">
              {description}
            </p>
          )}
        </div>
        {children && <div className="flex items-center gap-3">{children}</div>}
      </div>
    </div>
  );
}
