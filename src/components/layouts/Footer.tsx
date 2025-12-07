import { Link } from '@tanstack/react-router'
import { Youtube, Mail, MapPin, Facebook, Instagram, Phone, ShoppingBag, Heart, Video, Mic, Music } from 'lucide-react'
import { motion } from 'motion/react'
import CurvedLoop from '@/components/reactbits/CurvedLoop'

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
        <footer className="bg-muted/30 dark:bg-background border-t border-border relative overflow-hidden">
            {/* Decorative background element */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-accent to-secondary" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none opacity-[0.03] dark:opacity-[0.05]" />
            
            <motion.div 
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="container mx-auto px-4 md:px-8 pt-16 pb-8 max-w-7xl relative z-10"
            >
                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-8">
                    {/* Brand & Quote */}
                    <motion.div variants={itemVariants} className="col-span-2 md:col-span-1 lg:col-span-2 space-y-6">
                        <div className="flex items-center gap-3 mb-2">
                             <img src="/iskm-montreal.png" alt="ISKM Logo" className="h-12 w-12 object-contain" />
                             <h3 className="text-2xl font-bold text-foreground font-serif">ISKM Montreal</h3>
                        </div>
                        <p className="text-muted-foreground italic border-l-4 border-primary pl-4 py-2 leading-relaxed">
                            "Our aim is simple — to become the servant of the servant of Krishna."
                        </p>
                        <p className="text-sm text-muted-foreground/80 pl-5 font-medium">
                            - Srila Prabhupāda (CC Madhya 13.80)
                        </p>
                        <div className="pt-4">
                            <p className="font-semibold text-sm text-foreground uppercase tracking-wide opacity-80">Founder-Ācārya:</p>
                            <p className="text-sm text-muted-foreground mt-1">
                                His Divine Grace A.C. Bhaktivedanta Swami Prabhupāda
                            </p>
                        </div>
                    </motion.div>

                    {/* Quick Links */}
                    <motion.div variants={itemVariants} className="space-y-6">
                        <h4 className="font-bold text-foreground uppercase tracking-wider text-sm border-b border-border pb-2 inline-block">Quick Links</h4>
                        <ul className="space-y-3 text-sm text-muted-foreground">
                            <li><Link to="/" className="hover:text-primary transition-colors flex items-center gap-2 group"><span className="h-1.5 w-1.5 rounded-full bg-accent group-hover:scale-125 transition-transform"></span>Home</Link></li>
                            <li><Link to="/" hash="about" className="hover:text-primary transition-colors flex items-center gap-2 group"><span className="h-1.5 w-1.5 rounded-full bg-accent group-hover:scale-125 transition-transform"></span>About Us</Link></li>
                            <li><Link to="/" hash="programs" className="hover:text-primary transition-colors flex items-center gap-2 group"><span className="h-1.5 w-1.5 rounded-full bg-accent group-hover:scale-125 transition-transform"></span>Programs</Link></li>
                            <li><Link to="/" hash="resources" className="hover:text-primary transition-colors flex items-center gap-2 group"><span className="h-1.5 w-1.5 rounded-full bg-accent group-hover:scale-125 transition-transform"></span>Resources</Link></li>
                            <li><Link to="/" hash="contact" className="hover:text-primary transition-colors flex items-center gap-2 group"><span className="h-1.5 w-1.5 rounded-full bg-accent group-hover:scale-125 transition-transform"></span>Contact</Link></li>
                        </ul>
                    </motion.div>

                    {/* Explore / Resources */}
                    <motion.div variants={itemVariants} className="space-y-6">
                        <h4 className="font-bold text-foreground uppercase tracking-wider text-sm border-b border-border pb-2 inline-block">Explore</h4>
                        <ul className="space-y-3 text-sm text-muted-foreground">
                            <li><a href="https://www.vinted.fr/member/79720087-haribol108" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors flex items-center gap-2 group"><ShoppingBag className="h-4 w-4" /> Book Shop</a></li>
                            <li><a href="http://patreon.com/cw/Nitai" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors flex items-center gap-2 group"><Heart className="h-4 w-4" /> Patreon</a></li>
                            <li><a href="https://www.youtube.com/@iskmkids" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors flex items-center gap-2 group"><Video className="h-4 w-4" /> ISKM Kids</a></li>
                            <li><a href="http://www.youtube.com/@NimaiNitaiDasa" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors flex items-center gap-2 group"><Video className="h-4 w-4" /> Personal Vlogs</a></li>
                            <li><a href="https://www.youtube.com/watch?v=NYG4bryqMXg&t=160s" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors flex items-center gap-2 group"><Mic className="h-4 w-4" /> Podcasts</a></li>
                            <li><a href="https://youtu.be/BRmvpb3gczE?si=2kKziMXEsyl0uKwM" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors flex items-center gap-2 group"><Music className="h-4 w-4" /> Kirtans</a></li>
                        </ul>
                    </motion.div>

                    {/* Contact & Social */}
                    <motion.div variants={itemVariants} className="col-span-2 md:col-span-1 space-y-6">
                        <h4 className="font-bold text-foreground uppercase tracking-wider text-sm border-b border-border pb-2 inline-block">Connect</h4>
                        <div className="flex flex-col gap-4 text-sm text-muted-foreground">
                            <a href="mailto:admin@iskm.ca" className="flex items-center gap-3 hover:text-primary transition-colors group p-2 -ml-2 rounded-lg hover:bg-accent/5">
                                <div className="p-2 bg-background dark:bg-card rounded-full shadow-sm group-hover:shadow-md transition-all border border-border">
                                    <Mail className="h-4 w-4 text-primary" />
                                </div>
                                admin@iskm.ca
                            </a>
                            <a href="tel:+12633807303" className="flex items-center gap-3 hover:text-primary transition-colors group p-2 -ml-2 rounded-lg hover:bg-accent/5">
                                <div className="p-2 bg-background dark:bg-card rounded-full shadow-sm group-hover:shadow-md transition-all border border-border">
                                    <Phone className="h-4 w-4 text-primary" />
                                </div>
                                +1 (263) 380-7303
                            </a>
                            <a href="https://maps.app.goo.gl/dRyY7aa3nnvndq5t6" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-primary transition-colors group p-2 -ml-2 rounded-lg hover:bg-accent/5">
                                <div className="p-2 bg-background dark:bg-card rounded-full shadow-sm group-hover:shadow-md transition-all border border-border">
                                    <MapPin className="h-4 w-4 text-primary" />
                                </div>
                                View on Map
                            </a>
                        </div>
                        <div className="flex gap-3 pt-2">
                            <motion.a 
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                href="https://www.youtube.com/@iskmfrancais" 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="text-muted-foreground hover:text-[#FF0000] bg-background dark:bg-card p-2.5 rounded-full shadow-sm hover:shadow-md transition-all border border-border"
                            >
                                <Youtube className="h-5 w-5" />
                                <span className="sr-only">YouTube</span>
                            </motion.a>
                            <motion.a 
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                href="https://www.facebook.com/profile.php?id=61580147803495" 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="text-muted-foreground hover:text-[#1877F2] bg-background dark:bg-card p-2.5 rounded-full shadow-sm hover:shadow-md transition-all border border-border"
                            >
                                <Facebook className="h-5 w-5" />
                                <span className="sr-only">Facebook</span>
                            </motion.a>
                            <motion.a 
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                href="https://www.instagram.com/iskmmontreal/" 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="text-muted-foreground hover:text-[#E4405F] bg-background dark:bg-card p-2.5 rounded-full shadow-sm hover:shadow-md transition-all border border-border"
                            >
                                <Instagram className="h-5 w-5" />
                                <span className="sr-only">Instagram</span>
                            </motion.a>
                        </div>
                    </motion.div>
                </div>

            </motion.div>

            {/* Curved Loop Mantra */}
            <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="w-full overflow-hidden my-4 relative z-10"
            >
                <CurvedLoop 
                    marqueeText="Hare ✦ Krṣṇa ✦ Hare ✦ Krṣṇa ✦ Krṣṇa ✦ Krṣṇa ✦ Hare ✦ Hare ✦ Hare ✦ Rāma ✦ Hare ✦ Rāma ✦ Rāma ✦ Rāma ✦ Hare ✦ Hare ✦ "
                    speed={3}
                    curveAmount={230}
                    direction="right"
                    interactive={true}
                />
            </motion.div>

            <motion.div 
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="container mx-auto px-4 md:px-8 pb-16 max-w-7xl relative z-10"
            >
                <motion.div 
                    variants={itemVariants}
                    className="pt-8 border-t border-border text-center text-sm text-muted-foreground/60 flex flex-col md:flex-row justify-between items-center gap-4"
                >
                    <p>&copy; {new Date().getFullYear()} International Sri Krishna Mandir Montreal. All rights reserved.</p>
                    <div className="flex gap-6">
                         <Link to="/legal/terms" className="hover:text-foreground transition-colors">Terms</Link>
                         <Link to="/legal/privacy" className="hover:text-foreground transition-colors">Privacy</Link>
                         <Link to="/legal/returns" className="hover:text-foreground transition-colors">Returns</Link>
                    </div>
                </motion.div>
            </motion.div>
        </footer>
    )
}
