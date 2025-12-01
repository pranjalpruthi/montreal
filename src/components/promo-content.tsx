import React from "react";
import { cn } from "@/lib/utils";

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
      <div className={cn("bg-muted/20 p-3", className)}>
        <div className="flex items-center gap-3">
          <div className="h-12 w-8 flex-shrink-0 shadow-sm rounded-sm overflow-hidden">
            <img
              src="/thumbnails/bg-fr-cover.jpg"
              alt="Bhagavad-Gita"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0 flex flex-col">
            <p className="text-xs font-semibold text-foreground truncate">
              Gītā Jayantī
            </p>
            <p className="text-[10px] text-muted-foreground truncate">
              Sponsor a Gītā today
            </p>
          </div>
          <a
            href="https://square.link/u/iLHo1ycl?src=sheet"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] font-semibold bg-primary text-primary-foreground hover:bg-primary/90 px-3 py-1.5 rounded-full transition-colors"
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
      className={cn("border border-border rounded-lg p-3 bg-card", className)}
    >
      <div className="flex flex-col gap-3 items-center">
        <div className="w-full flex justify-center py-1">
          <div className="h-32 w-20 shadow-md rounded-md overflow-hidden transform hover:scale-105 transition-transform duration-300">
            <img
              src="/thumbnails/bg-fr-cover.jpg"
              alt="Bhagavad-Gita"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        
        <div className="flex flex-col gap-1.5 w-full text-center">
          <h3 className="text-sm font-semibold tracking-tight">
            Gītā Jayantī
          </h3>
          <div className="text-[11px] text-muted-foreground space-y-1">
            <p className="italic line-clamp-2">
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
          className="inline-flex items-center justify-center rounded-md text-xs font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-8 px-3 w-full"
        >
          Donate Now
        </a>
      </div>
    </div>
  );
}
