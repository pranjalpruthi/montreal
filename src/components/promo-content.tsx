import React from "react";
import { cn } from "@/lib/utils";
import { ModernBookCover } from "@/components/cuicui/modern-book-cover";

interface PromoContentProps {
  variant?: "desktop" | "mobile";
  className?: string;
}

export function PromoContent({
  variant = "desktop",
  className,
}: PromoContentProps) {
  if (variant === "mobile") {
    return (
      <div className={cn("border-t border-border bg-muted/20 p-3", className)}>
        <div className="flex items-center gap-3">
          <div className="h-12 w-8 flex-shrink-0">
             <ModernBookCover size="sm" radius="sm" isStatic>
              <img
                src="/thumbnails/bg-fr-cover.jpg"
                alt="Bhagavad-Gita"
                className="w-full h-full object-cover"
              />
            </ModernBookCover>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-foreground/90 truncate">
              Gītā Jayantī
            </p>
            <p className="text-xs text-muted-foreground truncate">
              Sponsor a Gītā today
            </p>
          </div>
          <a
            href="https://square.link/u/iLHo1ycl?src=sheet"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-primary hover:text-primary/80 font-medium"
            onClick={(e) => e.stopPropagation()}
          >
            Donate
          </a>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn("border border-border rounded-lg p-4 bg-card", className)}
    >
      <div className="flex flex-col gap-4 items-center">
        <div className="w-full flex justify-center py-2">
          <ModernBookCover size="sm" radius="sm">
            <img
              src="/thumbnails/bg-fr-cover.jpg"
              alt="Bhagavad-Gita"
              className="w-full h-full object-cover"
            />
          </ModernBookCover>
        </div>
        
        <div className="flex flex-col gap-2 w-full text-center">
          <h3 className="text-base font-semibold tracking-tight">
            Gītā Jayantī
          </h3>
          <div className="text-xs text-muted-foreground space-y-2">
            <p className="italic">
              “There is no servant more dear to Me than he who explains this message of Mine.”
            </p>
            <p className="font-medium text-foreground">
              Sponsor a Gītā today.
            </p>
          </div>
        </div>
        <a
          href="https://square.link/u/iLHo1ycl?src=sheet"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center rounded-md text-xs font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-3 w-full"
        >
          Donate Now
        </a>
      </div>
    </div>
  );
}
