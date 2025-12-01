import { Link } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Youtube } from 'lucide-react'
import { ModeToggle } from '@/components/mode-toggle'
import { cn } from '@/lib/utils'
import { MobileDock } from '@/components/layouts/mobile-dock'

export function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false)

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
        { to: '/community', label: 'Community' },
        { to: '/blog', label: 'Blog' },
        { to: '/', hash: 'contact', label: 'Contact' },
    ]



    return (
        <>
            {/* Top Navbar - Desktop */}
            <div className="fixed top-4 left-0 right-0 z-50 justify-center px-4 hidden md:flex">
                <header
                    className={cn(
                        "w-full max-w-5xl rounded-full transition-all duration-300 overflow-visible",
                        isScrolled 
                            ? 'bg-background/80 backdrop-blur-md border border-border shadow-lg py-3' 
                            : 'bg-background/50 backdrop-blur-sm border border-transparent py-5'
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
                            <Button asChild variant="secondary" size="icon" className="rounded-full bg-red-50 text-red-600 hover:bg-red-100 dark:bg-red-950/30 dark:text-red-400 dark:hover:bg-red-900/50 shadow-sm">
                                <a href="https://www.youtube.com/@iskmfrancais" target="_blank" rel="noopener noreferrer" aria-label="YouTube Channel">
                                    <Youtube className="h-5 w-5" />
                                </a>
                            </Button>
                            <Button asChild size="sm" className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all hover:scale-105">
                                <a href="https://maps.app.goo.gl/dRyY7aa3nnvndq5t6" target="_blank" rel="noopener noreferrer">
                                    Visit
                                </a>
                            </Button>
                        </div>
                    </div>
                </header>
            </div>

            {/* Mobile Dock - Bottom Navigation */}
            <MobileDock />

            {/* Mobile Top Bar - Simple header for mobile */}
            <div className="fixed top-0 left-0 right-0 z-40 md:hidden bg-background/80 backdrop-blur-md border-b border-border">
                <div className="flex items-center justify-between px-4 py-2">
                    <div className="flex items-center gap-3">
                        <div className="scale-125 origin-left">
                            <ModeToggle />
                        </div>
                        <span className="font-serif font-bold text-xl text-foreground ml-2">
                            ISKM <span className="text-primary">Montreal</span>
                        </span>
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
