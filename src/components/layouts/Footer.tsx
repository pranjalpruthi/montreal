import { Link } from '@tanstack/react-router'
import { Youtube, Mail, MapPin } from 'lucide-react'
import { motion } from 'motion/react'

export function Footer() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0
        }
    }

    return (
        <footer className="bg-[#F5F5F5] border-t border-[#FFD700]/20 relative overflow-hidden">
            {/* Decorative background element */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#FF1493] via-[#FF8C00] to-[#191970]" />
            
            <motion.div 
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="container mx-auto px-4 md:px-8 py-12 max-w-7xl relative z-10"
            >
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand & Quote */}
                    <motion.div variants={itemVariants} className="md:col-span-2 space-y-4">
                        <div className="flex items-center gap-2 mb-2">
                             <img src="/iskm-montreal.png" alt="ISKM Logo" className="h-10 w-10 object-contain" />
                             <h3 className="text-xl font-bold text-[#191970] font-serif">ISKM Montreal</h3>
                        </div>
                        <p className="text-[#191970]/80 italic border-l-4 border-[#FF1493] pl-4 py-1">
                            "Our aim is simple — to become the servant of the servant of Krishna."
                        </p>
                        <p className="text-sm text-[#191970]/60 pl-5">
                            - Srila Prabhupāda (CC Madhya 13.80)
                        </p>
                        <div className="pt-4">
                            <p className="font-semibold text-sm text-[#191970]">Founder-Ācārya:</p>
                            <p className="text-sm text-[#191970]/70">
                                His Divine Grace A.C. Bhaktivedanta Swami Prabhupāda
                            </p>
                        </div>
                    </motion.div>

                    {/* Quick Links */}
                    <motion.div variants={itemVariants} className="space-y-4">
                        <h4 className="font-semibold text-[#FF1493] uppercase tracking-wider text-sm">Quick Links</h4>
                        <ul className="space-y-2 text-sm text-[#191970]/70">
                            <li><Link to="/" className="hover:text-[#FF8C00] transition-colors flex items-center gap-2"><span className="h-1 w-1 rounded-full bg-[#FF8C00]"></span>Home</Link></li>
                            <li><Link to="/" hash="about" className="hover:text-[#FF8C00] transition-colors flex items-center gap-2"><span className="h-1 w-1 rounded-full bg-[#FF8C00]"></span>About Us</Link></li>
                            <li><Link to="/" hash="programs" className="hover:text-[#FF8C00] transition-colors flex items-center gap-2"><span className="h-1 w-1 rounded-full bg-[#FF8C00]"></span>Programs</Link></li>
                            <li><Link to="/" hash="resources" className="hover:text-[#FF8C00] transition-colors flex items-center gap-2"><span className="h-1 w-1 rounded-full bg-[#FF8C00]"></span>Resources</Link></li>
                            <li><Link to="/" hash="contact" className="hover:text-[#FF8C00] transition-colors flex items-center gap-2"><span className="h-1 w-1 rounded-full bg-[#FF8C00]"></span>Contact</Link></li>
                        </ul>
                    </motion.div>

                    {/* Contact & Social */}
                    <motion.div variants={itemVariants} className="space-y-4">
                        <h4 className="font-semibold text-[#FF1493] uppercase tracking-wider text-sm">Connect</h4>
                        <div className="flex flex-col gap-3 text-sm text-[#191970]/70">
                            <a href="mailto:iskm.montreal@gmail.com" className="flex items-center gap-2 hover:text-[#FF8C00] transition-colors group">
                                <div className="p-2 bg-white rounded-full shadow-sm group-hover:shadow-md transition-all">
                                    <Mail className="h-4 w-4 text-[#FF1493]" />
                                </div>
                                iskm.montreal@gmail.com
                            </a>
                            <a href="https://maps.app.goo.gl/dRyY7aa3nnvndq5t6" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-[#FF8C00] transition-colors group">
                                <div className="p-2 bg-white rounded-full shadow-sm group-hover:shadow-md transition-all">
                                    <MapPin className="h-4 w-4 text-[#FF1493]" />
                                </div>
                                View on Map
                            </a>
                        </div>
                        <div className="flex gap-4 pt-2">
                            <motion.a 
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                href="https://www.youtube.com/@iskmfrancais" 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="text-[#191970]/70 hover:text-[#FF0000] bg-white p-2 rounded-full shadow-sm hover:shadow-md transition-all"
                            >
                                <Youtube className="h-5 w-5" />
                                <span className="sr-only">YouTube</span>
                            </motion.a>
                            {/* Add other social icons as needed */}
                        </div>
                    </motion.div>
                </div>

                <motion.div 
                    variants={itemVariants}
                    className="mt-12 pt-8 border-t border-[#191970]/10 text-center text-sm text-[#191970]/50"
                >
                    <p>&copy; {new Date().getFullYear()} International Sri Krishna Mandir Montreal. All rights reserved.</p>
                </motion.div>
            </motion.div>
        </footer>
    )
}
