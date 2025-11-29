import { Link, useLocation } from '@tanstack/react-router'
import { Home, Info, Calendar, ShoppingBag, MapPin, Heart } from 'lucide-react'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { motion, MotionConfig, AnimatePresence, type Transition } from 'motion/react'
import { ModeToggle } from '@/components/mode-toggle'
import { cn } from '@/lib/utils'

export function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false)
    const location = useLocation()

    // Add scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const navLinks = [
        { to: '/', label: 'Home' },
        { to: '/', hash: 'about', label: 'About' },
        { to: '/', hash: 'programs', label: 'Programs' },
        { to: '/', hash: 'resources', label: 'Resources' },
        { to: '/', hash: 'community', label: 'Community' },
        { to: '/', hash: 'contact', label: 'Contact' },
    ]

    // Mobile dock items
    const dockItems = [
        { to: '/', label: 'Home', icon: Home },
        { to: '/about', label: 'About', icon: Info },
        { to: '/calendar', label: 'Calendar', icon: Calendar },
        { to: '/shop', label: 'Shop', icon: ShoppingBag },
        { to: '/centers', label: 'Centers', icon: MapPin },
        { to: '/donate', label: 'Donate', icon: Heart },
    ]

    const isActive = (path: string) => {
        if (path === '/') {
            return location.pathname === '/'
        }
        return location.pathname.startsWith(path)
    }

    // Spring transition configuration matching the provided code
    const dockSpringTransition: Transition = {
        type: "spring",
        stiffness: 400,
        damping: 30,
        mass: 0.8,
    }

    const mainDockAppearanceTransition: Transition = {
        type: "spring",
        stiffness: 250,
        damping: 30,
        delay: 0.2,
    }

    return (
        <MotionConfig transition={{ layout: { duration: 0.35, type: 'spring', bounce: 0.1 } }}>
            {/* Top Navbar - Desktop */}
            <div className="fixed top-4 left-0 right-0 z-50 justify-center px-4 hidden md:flex">
                <motion.header
                    initial={{ y: -100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
                    className={cn(
                        "w-full max-w-5xl rounded-full transition-all duration-300 overflow-visible",
                        isScrolled 
                            ? 'bg-background/80 backdrop-blur-md border border-border shadow-lg py-1' 
                            : 'bg-background/50 backdrop-blur-sm border border-transparent py-2'
                    )}
                >
                    <div className="px-4 md:px-6 flex items-center justify-between relative">
                        {/* Logo/Mode Toggle (Left) */}
                        <div className="flex items-center gap-2">
                            <div className="-my-6 z-50 relative">
                                <ModeToggle className="scale-125 origin-left" />
                            </div>
                            <span className="font-serif font-bold text-lg text-foreground hidden sm:block ml-4">
                                ISKM <span className="text-primary">Montreal</span>
                            </span>
                        </div>

                        {/* Desktop Navigation (Center) */}
                        <nav className="hidden md:flex items-center gap-1 bg-muted/50 rounded-full px-2 py-1 border border-border/50">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.label}
                                    to={link.to}
                                    hash={link.hash}
                                    className="text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-background transition-all px-4 py-1.5 rounded-full"
                                    activeProps={{ className: "text-foreground bg-background shadow-sm" }}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </nav>

                        {/* Actions (Right) */}
                        <div className="flex items-center gap-2">
                            <Button asChild size="sm" className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-md">
                                <a href="https://maps.app.goo.gl/dRyY7aa3nnvndq5t6" target="_blank" rel="noopener noreferrer">
                                    Visit
                                </a>
                            </Button>
                        </div>
                    </div>
                </motion.header>
            </div>

            {/* Mobile Dock - Bottom Navigation */}
            <motion.nav
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={mainDockAppearanceTransition}
                className="fixed bottom-0 left-0 right-0 z-50 md:hidden pb-safe pointer-events-none"
            >
                <motion.div
                    layout
                    className="mx-4 mb-4 pointer-events-auto"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={mainDockAppearanceTransition}
                        className="bg-background/80 backdrop-blur-xl border border-border rounded-2xl shadow-lg px-2 py-2 transform-gpu"
                    >
                        <div className="flex items-center justify-around">
                            <AnimatePresence mode="sync">
                                {dockItems.map((item) => {
                                    const Icon = item.icon
                                    const active = isActive(item.to)
                                    
                                    return (
                                        <motion.div
                                            key={item.to}
                                            layout
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.8 }}
                                            transition={dockSpringTransition}
                                        >
                                            <Link
                                                to={item.to}
                                                className={cn(
                                                    "relative flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-xl min-w-[60px] transition-colors duration-200",
                                                    active
                                                        ? "bg-primary/10 text-primary"
                                                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                                                )}
                                            >
                                                <motion.div
                                                    layout
                                                    animate={{ 
                                                        scale: active ? 1.15 : 1,
                                                        y: active ? -2 : 0
                                                    }}
                                                    transition={{ 
                                                        type: "spring", 
                                                        stiffness: 400, 
                                                        damping: 17 
                                                    }}
                                                    whileTap={{ scale: 0.9 }}
                                                >
                                                    <Icon className={cn("h-5 w-5", active && "text-primary")} />
                                                </motion.div>
                                                <motion.span
                                                    layout
                                                    className={cn(
                                                        "text-[10px] font-medium leading-tight",
                                                        active ? "text-primary" : "text-muted-foreground"
                                                    )}
                                                    animate={{
                                                        opacity: active ? 1 : 0.7
                                                    }}
                                                    transition={{ duration: 0.2 }}
                                                >
                                                    {item.label}
                                                </motion.span>
                                                <AnimatePresence>
                                                    {active && (
                                                        <motion.div
                                                            layoutId="activeIndicator"
                                                            className="absolute bottom-0 left-1/2 -translate-x-1/2 h-1 w-8 bg-primary rounded-full"
                                                            initial={{ scaleX: 0, opacity: 0 }}
                                                            animate={{ scaleX: 1, opacity: 1 }}
                                                            exit={{ scaleX: 0, opacity: 0 }}
                                                            transition={{ 
                                                                type: "spring", 
                                                                stiffness: 300, 
                                                                damping: 30 
                                                            }}
                                                        />
                                                    )}
                                                </AnimatePresence>
                                            </Link>
                                        </motion.div>
                                    )
                                })}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                </motion.div>
            </motion.nav>

            {/* Mobile Top Bar - Simple header for mobile */}
            <motion.div
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
                className="fixed top-0 left-0 right-0 z-40 md:hidden bg-background/80 backdrop-blur-md border-b border-border"
            >
                <div className="flex items-center justify-between px-4 py-3">
                    <div className="flex items-center gap-2">
                        <ModeToggle />
                        <span className="font-serif font-bold text-base text-foreground">
                            ISKM <span className="text-primary">Montreal</span>
                        </span>
                    </div>
                    <Button asChild size="sm" variant="ghost" className="rounded-full">
                        <a href="https://maps.app.goo.gl/dRyY7aa3nnvndq5t6" target="_blank" rel="noopener noreferrer">
                            Visit
                        </a>
                    </Button>
                </div>
            </motion.div>
        </MotionConfig>
    )
}
