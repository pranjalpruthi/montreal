import { Link, useLocation } from '@tanstack/react-router'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Youtube, Search, Heart } from 'lucide-react'
import { ModeToggle } from '@/components/mode-toggle'
import { cn } from '@/lib/utils'
import { MobileDock } from '@/components/layouts/mobile-dock'
import { motion, useScroll, useMotionValueEvent } from 'motion/react'

export function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false)
    const [isVisible, setIsVisible] = useState(true)
    const { scrollY } = useScroll()
    const location = useLocation()
    const isBlog = location.pathname.startsWith('/blog')

    useMotionValueEvent(scrollY, "change", (current) => {
        const previous = scrollY.getPrevious() || 0
        const diff = current - previous

        // Determine if scrolled (for styling)
        setIsScrolled(current > 20)

        // Determine visibility with hysteresis (Only for blog)
        if (!isBlog) {
            setIsVisible(true)
            return
        }

        if (current < 50) {
            setIsVisible(true)
        } else {
            if (diff > 0) {
                setIsVisible(false) // Scrolling down -> Hide
            } else if (diff < -2) {
                setIsVisible(true)  // Scroll up -> Show (more sensitive)
            }
        }
    })

    const navLinks = [
        { to: '/', label: 'Home' },
        { to: '/', hash: 'programs', label: 'Programs' },
        { to: '/resources', label: 'Resources' },
        { to: '/community', label: 'Community' },
        { to: '/blog', label: 'Blog' },
        { to: '/', hash: 'about', label: 'About' },
    ]

    return (
        <>
            {/* Top Navbar - Desktop */}
            <motion.div 
                variants={{
                    visible: { y: 0 },
                    hidden: { y: "-120%" },
                }}
                animate={isVisible ? "visible" : "hidden"}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className={cn(
                    "fixed z-50 left-0 right-0 hidden md:flex justify-center transition-all duration-300",
                    isScrolled ? "top-4" : "top-0"
                )}
            >
                <motion.header
                    initial={false}
                    animate={{
                        width: isScrolled ? "85%" : "100%",
                        borderRadius: isScrolled ? "9999px" : "0px",
                        backgroundColor: isScrolled ? "rgba(var(--background), 1)" : "transparent",
                        borderColor: isScrolled ? "rgba(255,255,255,0.1)" : "transparent",
                        paddingTop: isScrolled ? "0.5rem" : "0.75rem",
                        paddingBottom: isScrolled ? "0.5rem" : "0.75rem",
                        paddingLeft: isScrolled ? "0.5rem" : "2rem",
                        paddingRight: isScrolled ? "1.5rem" : "2rem",
                    }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    style={{
                        backdropFilter: isScrolled ? "blur(32px)" : "blur(0px)",
                        borderStyle: "solid",
                        borderWidth: isScrolled ? "1px" : "0px",
                        maxWidth: "1400px",
                    }}
                    className={cn(
                        "flex items-center justify-between shadow-sm",
                        isScrolled ? "shadow-black/5 dark:shadow-white/5" : "shadow-none"
                    )}
                >
                    {/* Logo/Mode Toggle (Left) */}
                    <div className="flex items-center gap-4">
                        <div className={cn(
                            "relative z-50 flex items-center justify-center transition-all duration-300",
                            isScrolled ? "scale-125 translate-y-2 -my-4" : "translate-y-1"
                        )}>
                            <ModeToggle className="origin-center" />
                        </div>
                        <Link 
                            to="/" 
                            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                            className={cn(
                            "font-serif font-bold text-xl transition-colors duration-300 hover:opacity-80",
                            isScrolled ? "text-foreground" : "text-foreground/90"
                        )}>
                            ISKM <span className="text-primary">Montreal</span>
                        </Link>
                    </div>

                    {/* Desktop Navigation (Center) */}
                    <nav className="hidden md:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.label}
                                to={link.to}
                                hash={link.hash}
                                className={cn(
                                    "text-sm font-medium transition-all px-4 py-2 rounded-full relative group",
                                    "text-foreground/80 hover:text-foreground"
                                )}
                                activeProps={{ className: "text-foreground" }}
                            >
                                {link.label}
                                <span className="absolute inset-0 rounded-full bg-foreground/5 scale-0 group-hover:scale-100 transition-transform duration-200" />
                            </Link>
                        ))}
                    </nav>

                    {/* Actions (Right) */}
                    <div className="flex items-center gap-2">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="rounded-full text-muted-foreground hover:text-foreground hover:bg-foreground/5"
                            onClick={() => (window as any).openCommandMenu?.()}
                            aria-label="Search"
                        >
                            <Search className="h-5 w-5" />
                        </Button>
                        <Button asChild variant="ghost" size="icon" className="rounded-full text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/30">
                            <a href="https://www.youtube.com/@iskmfrancais" target="_blank" rel="noopener noreferrer" aria-label="YouTube Channel">
                                <Youtube className="h-5 w-5" />
                            </a>
                        </Button>
                        <Button asChild size="sm" className="rounded-full px-4 font-medium bg-pink-600 hover:bg-pink-700 text-white shadow-lg hover:shadow-pink-600/25 transition-all hover:-translate-y-0.5">
                            <Link to="/donate">
                                <Heart className="h-4 w-4 mr-2 fill-current" />
                                Donate
                            </Link>
                        </Button>
                        <Button asChild size="sm" className="rounded-full px-6 font-medium bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-primary/25 transition-all hover:-translate-y-0.5">
                            <a href="https://maps.app.goo.gl/dRyY7aa3nnvndq5t6" target="_blank" rel="noopener noreferrer">
                                Visit
                            </a>
                        </Button>
                    </div>
                </motion.header>
            </motion.div>

            {/* Mobile Dock - Bottom Navigation */}
            <MobileDock />

            {/* Mobile Top Bar - Simple header for mobile */}
            <div className="fixed top-0 left-0 right-0 z-40 md:hidden bg-background/60 backdrop-blur-md border-b border-border">
                <div className="flex items-center justify-between px-4 py-2">
                    <div className="flex items-center gap-3">
                        <div className="scale-125 origin-left">
                            <ModeToggle />
                        </div>
                        <Link 
                            to="/" 
                            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                            className="font-serif font-bold text-xl text-foreground ml-2 hover:opacity-80 transition-opacity"
                        >
                            ISKM <span className="text-primary">Montreal</span>
                        </Link>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button asChild size="icon" className="rounded-full h-9 w-9 bg-red-600 text-white hover:bg-red-700 shadow-sm border border-red-700/20">
                            <a href="https://www.youtube.com/@iskmfrancais" target="_blank" rel="noopener noreferrer" aria-label="YouTube Channel">
                                <Youtube className="h-4 w-4" />
                            </a>
                        </Button>
                        <Button asChild size="sm" className="rounded-full shadow-sm">
                            <a href="https://maps.app.goo.gl/dRyY7aa3nnvndq5t6" target="_blank" rel="noopener noreferrer">
                                Visit
                            </a>
                        </Button>
                    </div>
                </div>
            </div>
        </>
    )
}
