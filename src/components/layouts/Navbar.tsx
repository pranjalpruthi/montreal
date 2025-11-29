import { Link } from '@tanstack/react-router'
import { Menu } from 'lucide-react'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'


export function Navbar() {
    const [isOpen, setIsOpen] = useState(false)
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
        { to: '/', hash: 'community', label: 'Community' },
        { to: '/', hash: 'contact', label: 'Contact' },
    ]

    return (
        <header
            className={`sticky top-0 z-50 w-full transition-all duration-300 ${isScrolled
                ? 'bg-white/80 backdrop-blur-md border-b shadow-sm'
                : 'bg-transparent border-transparent'
                }`}
        >
            <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-8 max-w-7xl">
                <div className="flex items-center gap-2">
                    <Link to="/" className="flex items-center gap-2 group">
                        <div className="bg-orange-100 p-2 rounded-full group-hover:bg-orange-200 transition-colors">
                            <img src="/iskm-montreal.png" alt="ISKM Logo" className="h-8 w-8" />
                        </div>
                        <span className="text-xl md:text-2xl font-bold text-primary font-serif tracking-tight">
                            ISKM <span className="text-orange-600">Montreal</span>
                        </span>
                    </Link>
                </div>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.label}
                            to={link.to}
                            hash={link.hash}
                            className="text-sm font-medium transition-all hover:text-orange-600 relative group"
                        >
                            {link.label}
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-600 transition-all group-hover:w-full"></span>
                        </Link>
                    ))}
                    <Button asChild className="bg-orange-600 hover:bg-orange-700 text-white shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5">
                        <a href="https://maps.app.goo.gl/dRyY7aa3nnvndq5t6" target="_blank" rel="noopener noreferrer">
                            Visit Us
                        </a>
                    </Button>
                </nav>

                {/* Mobile Navigation */}
                <div className="md:hidden">
                    <Sheet open={isOpen} onOpenChange={setIsOpen}>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="text-primary">
                                <Menu className="h-6 w-6" />
                                <span className="sr-only">Toggle menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                            <div className="flex flex-col gap-8 mt-8">
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="bg-orange-100 p-2 rounded-full">
                                        <img src="/iskm-montreal.png" alt="ISKM Logo" className="h-8 w-8" />
                                    </div>
                                    <span className="text-xl font-bold font-serif">ISKM Montreal</span>
                                </div>

                                <div className="flex flex-col gap-4">
                                    {navLinks.map((link) => (
                                        <Link
                                            key={link.label}
                                            to={link.to}
                                            hash={link.hash}
                                            className="text-lg font-medium hover:text-orange-600 transition-colors border-b border-gray-100 pb-2"
                                            onClick={() => setIsOpen(false)}
                                        >
                                            {link.label}
                                        </Link>
                                    ))}
                                </div>

                                <Button asChild className="w-full bg-orange-600 hover:bg-orange-700 text-white mt-4">
                                    <a href="https://maps.app.goo.gl/dRyY7aa3nnvndq5t6" target="_blank" rel="noopener noreferrer">
                                        Visit Us
                                    </a>
                                </Button>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    )
}
