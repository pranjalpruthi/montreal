import { Link } from '@tanstack/react-router'
import { Facebook, Youtube, Mail, MapPin } from 'lucide-react'

export function Footer() {
    return (
        <footer className="bg-muted/30 border-t">
            <div className="container mx-auto px-4 md:px-8 py-12 max-w-7xl">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand & Quote */}
                    <div className="md:col-span-2 space-y-4">
                        <h3 className="text-xl font-bold text-primary">ISKM Montreal</h3>
                        <p className="text-muted-foreground italic">
                            "Our aim is simple — to become the servant of the servant of Krishna."
                        </p>
                        <p className="text-sm text-muted-foreground">
                            - Srila Prabhupāda (CC Madhya 13.80)
                        </p>
                        <div className="pt-4">
                            <p className="font-semibold text-sm">Founder-Ācārya:</p>
                            <p className="text-sm text-muted-foreground">
                                His Divine Grace A.C. Bhaktivedanta Swami Prabhupāda
                            </p>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-4">
                        <h4 className="font-semibold">Quick Links</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link to="/" className="hover:text-primary">Home</Link></li>
                            <li><Link to="/" hash="about" className="hover:text-primary">About Us</Link></li>
                            <li><Link to="/" hash="programs" className="hover:text-primary">Programs</Link></li>
                            <li><Link to="/" hash="resources" className="hover:text-primary">Resources</Link></li>
                            <li><Link to="/" hash="contact" className="hover:text-primary">Contact</Link></li>
                        </ul>
                    </div>

                    {/* Contact & Social */}
                    <div className="space-y-4">
                        <h4 className="font-semibold">Connect</h4>
                        <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                            <a href="mailto:iskm.montreal@gmail.com" className="flex items-center gap-2 hover:text-primary">
                                <Mail className="h-4 w-4" /> iskm.montreal@gmail.com
                            </a>
                            <a href="https://maps.app.goo.gl/dRyY7aa3nnvndq5t6" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-primary">
                                <MapPin className="h-4 w-4" /> View on Map
                            </a>
                        </div>
                        <div className="flex gap-4 pt-2">
                            <a href="https://www.youtube.com/@iskmfrancais" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-red-600">
                                <Youtube className="h-5 w-5" />
                                <span className="sr-only">YouTube</span>
                            </a>
                            {/* Add other social icons as needed */}
                        </div>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
                    <p>&copy; {new Date().getFullYear()} International Sri Krishna Mandir Montreal. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}
