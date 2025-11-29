import * as React from "react"
import { useTheme } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "motion/react"
import { flushSync } from "react-dom";
import { cn } from "@/lib/utils";

interface ModeToggleProps {
  className?: string;
}

const ModeToggleComponent = ({ className }: ModeToggleProps) => {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)
  const [isPressed, setIsPressed] = React.useState(false)
  const buttonRef = React.useRef<HTMLButtonElement | null>(null);

  React.useEffect(() => setMounted(true), [])

  const toggleTheme = React.useCallback(async () => {
    if (!buttonRef.current) return;

    // Use view transition API for smooth animation
    if (document.startViewTransition) {
        await document.startViewTransition(() => {
            flushSync(() => {
                setTheme(theme === "dark" ? "light" : "dark")
            });
        }).ready;

        const { top, left, width, height } = buttonRef.current.getBoundingClientRect();
        const y = top + height / 2;
        const x = left + width / 2;

        const right = window.innerWidth - left;
        const bottom = window.innerHeight - top;
        const maxRad = Math.hypot(Math.max(left, right), Math.max(top, bottom));

        document.documentElement.animate(
            {
                clipPath: [
                    `circle(0px at ${x}px ${y}px)`,
                    `circle(${maxRad}px at ${x}px ${y}px)`,
                ],
            },
            {
                duration: 700,
                easing: "ease-in-out",
                pseudoElement: "::view-transition-new(root)",
            },
        );
    } else {
        setTheme(theme === "dark" ? "light" : "dark")
    }
  }, [theme, setTheme])

  const handlePointerDown = React.useCallback(() => setIsPressed(true), [])
  const handlePointerUp = React.useCallback(() => setIsPressed(false), [])
  const handlePointerLeave = React.useCallback(() => setIsPressed(false), [])

  if (!mounted) return null

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
      className={cn("relative z-50", className)}
    >
      <div className="absolute inset-0 pointer-events-none z-30">
        {/* Simplified Glow Effect (2 layers for performance) */}
        {/* Outer Glow Layer */}
        <div className={`
          absolute -inset-5 rounded-full blur-lg
          animate-pulse
          ${theme === "dark"
            ? "bg-amber-400/20" // Adjusted color/opacity
            : "bg-yellow-200/30" // Adjusted color/opacity
          }
        `} />
        {/* Inner Glow Layer */}
        <div className={`
          absolute -inset-3 rounded-full blur-lg
          animate-pulse
          ${theme === "dark"
            ? "bg-amber-300/40" // Adjusted color/opacity
            : "bg-yellow-100/50" // Adjusted color/opacity
          }
        `} />
      </div>
      <Button
        ref={buttonRef}
        variant="ghost"
        onClick={toggleTheme}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerLeave}
        className={`
          rounded-full p-0 overflow-hidden
          transition-all duration-300
          w-16 h-16 md:w-20 md:h-20
          active:scale-95 relative z-40
          bg-transparent border-0
        `}
      >
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 80, damping: 8 }}
          className="relative flex items-center justify-center w-full h-full"
        >
          <img
            src="/iskm-montreal.png"
            alt="ISKM Logo"
            className="rounded-full object-contain w-full h-full p-1"
          />

          {/* Text Overlay on Press */}
          <AnimatePresence>
            {isPressed && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
                className={`
                  absolute inset-0 flex items-center justify-center
                  rounded-full backdrop-blur-sm
                  ${theme === "dark"
                    ? "bg-zinc-900/80"
                    : "bg-white/80"
                  }
                `}
              >
                <span className={`
                  text-[10px] font-medium text-center leading-tight
                  ${theme === "dark"
                    ? "text-zinc-200"
                    : "text-zinc-800"
                  }
                `}>
                  Toggle
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
        <span className="sr-only">
          Switch to {theme === "dark" ? "light" : "dark"} mode
        </span>
      </Button>
    </motion.div>
  )
}

export const ModeToggle = React.memo(ModeToggleComponent)
