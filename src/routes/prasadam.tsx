import { createFileRoute, Link } from '@tanstack/react-router'
import { motion } from 'motion/react'
import { Heart, Utensils, Users, Info, Quote as QuoteIcon, ArrowRight, HeartHandshake } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { SlidingNumber } from '@/components/animate-ui/primitives/texts/sliding-number'
import { InView } from '@/components/motion-primitives/in-view'
import { FacebookFeed } from '@/components/community/facebook-feed'

export const Route = createFileRoute('/prasadam')({
  component: PrasadamPage,
})

const galleryImages = [
  { url: '/temple-inout/1.jpg', alt: 'Serving Prasadam' },
  { url: '/temple-inout/2.jpg', alt: 'Joyous Distribution' },
  { url: '/temple-inout/3.jpg', alt: 'Community Nourishment' },
  { url: '/temple-inout/4.jpg', alt: 'Volunteers in Action' }
];

const testimonials = [
  {
    quote: "This meal completely changed my day. The food is so fresh and peaceful.",
    author: "Local Student"
  },
  {
    quote: "I always feel so satisfied after eating here. There is something truly special about this food.",
    author: "Community Member"
  },
  {
    quote: "Thank you for the warm smiles and the incredible food. It gives me hope.",
    author: "Recipient"
  }
];

function PrasadamPage() {
  return (
    <div className="min-h-screen bg-background font-sans">
      {/* 🟡 HERO SECTION */}
      <section className="relative min-h-[500px] flex items-center justify-center overflow-hidden pt-32 pb-16 bg-gradient-to-b from-orange-100/50 to-transparent dark:from-orange-900/10">
        <div className="relative z-20 container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-6 max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-700 dark:text-orange-400 text-sm font-semibold mb-4 uppercase tracking-wider">
              <Utensils className="w-4 h-4" />
              Food for the Soul
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-foreground tracking-tight">
              Sanctified Food <br /> Distribution
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground font-medium leading-relaxed">
              Sharing spiritual nourishment through Krishna prasādam in the heart of Montreal.
            </p>
            <div className="pt-8 flex flex-wrap items-center justify-center gap-4">
              <Button size="lg" className="bg-orange-600 hover:bg-orange-700 text-white border-none shadow-xl shadow-orange-500/20 px-8 h-14 text-lg font-bold" onClick={() => document.getElementById('get-involved')?.scrollIntoView({ behavior: 'smooth' })}>
                <Heart className="w-5 h-5 mr-2" /> Support Our Mission
              </Button>
              <Button size="lg" variant="outline" className="px-8 h-14 text-lg" onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}>
                Learn More
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 🟢 ABOUT PRASĀDAM */}
      <section id="about" className="py-24 bg-orange-50 dark:bg-zinc-950 relative">
        <div className="container mx-auto px-4 max-w-5xl">
          <InView
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-white dark:bg-zinc-900 rounded-3xl p-8 md:p-12 shadow-2xl border border-orange-100 dark:border-white/5 relative overflow-hidden">
              <QuoteIcon className="absolute top-8 right-8 w-32 h-32 text-orange-500/5 rotate-12" />
              
              <div className="grid md:grid-cols-5 gap-12 items-center relative z-10">
                <div className="md:col-span-3 space-y-6">
                  <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white">
                    What is Prasādam?
                  </h2>
                  <p className="text-lg text-zinc-600 dark:text-zinc-300 leading-relaxed">
                    At Sri Krishna Mandir Montreal, we distribute sanctified food (prasādam) prepared with devotion and offered to Lord Krishna. 
                  </p>
                  <p className="text-lg text-zinc-600 dark:text-zinc-300 leading-relaxed">
                    This prasādam is not ordinary food—it carries spiritual potency that purifies the heart and uplifts consciousness. Through our weekly outreach programs, we strive to nourish both the body and the soul, sharing compassion, dignity, and spiritual joy with everyone.
                  </p>
                  <ul className="space-y-3 pt-4">
                    <li className="flex items-center gap-3 text-orange-700 dark:text-orange-400 font-medium">
                      <HeartHandshake className="w-5 h-5" /> Prasādam is not ordinary food—it is the mercy of Krishna.
                    </li>
                    <li className="flex items-center gap-3 text-orange-700 dark:text-orange-400 font-medium">
                      <HeartHandshake className="w-5 h-5" /> By honoring prasādam, one becomes spiritually purified.
                    </li>
                    <li className="flex items-center gap-3 text-orange-700 dark:text-orange-400 font-medium">
                      <HeartHandshake className="w-5 h-5" /> Food offered with devotion becomes transcendental.
                    </li>
                  </ul>
                </div>
                
                <div className="md:col-span-2 space-y-6">
                  <Card className="bg-orange-500 text-white border-none shadow-xl transform md:rotate-2 hover:rotate-0 transition-transform duration-500">
                    <CardContent className="p-8">
                      <QuoteIcon className="w-10 h-10 text-white/30 mb-4" />
                      <blockquote className="text-xl font-serif leading-snug mb-4">
                        "The devotees of the Lord are released from all kinds of sins because they eat food which is offered first for sacrifice."
                      </blockquote>
                      <p className="font-bold tracking-wider text-sm text-orange-100 uppercase">— Bhagavad-gītā 3.13</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </InView>
        </div>
      </section>

      {/* 🔵 IMPACT SECTION */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Our Real-World Impact</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Food connects everyone. By distributing sanctified meals, we nourish communities, uplift spirits, and share unconditional love.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div 
              className="bg-card border border-border/50 rounded-2xl p-8 text-center shadow-lg"
              whileHover={{ y: -5 }}
            >
              <div className="w-16 h-16 bg-blue-500/10 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Utensils className="w-8 h-8" />
              </div>
              <div className="text-5xl font-black text-foreground mb-2 flex items-center justify-center font-mono">
                <SlidingNumber number={500} minimumIntegerDigits={3} />+
              </div>
              <h3 className="text-xl font-bold mb-2">Meals Served</h3>
              <p className="text-muted-foreground">Distributed weekly to students, families, and those in need.</p>
            </motion.div>

            <motion.div 
              className="bg-card border border-border/50 rounded-2xl p-8 text-center shadow-lg"
              whileHover={{ y: -5 }}
            >
              <div className="w-16 h-16 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8" />
              </div>
              <div className="text-5xl font-black text-foreground mb-2 flex items-center justify-center font-mono">
                <SlidingNumber number={5} minimumIntegerDigits={1} />
              </div>
              <h3 className="text-xl font-bold mb-2">Locations</h3>
              <p className="text-muted-foreground">Operating in local parks, street corners, and special events.</p>
            </motion.div>

            <motion.div 
              className="bg-card border border-border/50 rounded-2xl p-8 text-center shadow-lg"
              whileHover={{ y: -5 }}
            >
              <div className="w-16 h-16 bg-purple-500/10 text-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="w-8 h-8" />
              </div>
              <div className="text-5xl font-black text-foreground mb-2 flex items-center justify-center font-mono">
                Infinite
              </div>
              <h3 className="text-xl font-bold mb-2">Spiritual Joy</h3>
              <p className="text-muted-foreground">Prasādam transforms consciousness and brings inner peace.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 🟣 PHOTO GALLERY & UPDATES */}
      <section className="py-24 bg-zinc-50 dark:bg-zinc-900/30 border-y border-border/50">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Joy in Action & Community Updates</h2>
            <p className="text-lg text-muted-foreground">Glimpses of our distribution programs and the latest news from Facebook.</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left Column: Facebook Feed */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              <FacebookFeed />
            </div>

            {/* Right Column: Photo Gallery */}
            <div className="lg:col-span-7">
              <div className="grid grid-cols-2 gap-4">
                {galleryImages.map((img, i) => (
                  <InView
                    key={i}
                    variants={{
                      hidden: { opacity: 0, scale: 0.95 },
                      visible: { opacity: 1, scale: 1 },
                    }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                  >
                    <div className="relative rounded-xl overflow-hidden group bg-muted aspect-square">
                      <img 
                        src={img.url} 
                        alt={img.alt} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute bottom-4 left-4 text-white font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">
                        {img.alt}
                      </div>
                    </div>
                  </InView>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 🔹 TESTIMONIALS */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <Card key={i} className="bg-card border-none shadow-lg hover:shadow-xl transition-shadow relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4">
                  <QuoteIcon className="w-8 h-8 text-orange-500/10" />
                </div>
                <CardContent className="p-8 pt-10">
                  <p className="italic text-lg text-muted-foreground mb-6 relative z-10">"{t.quote}"</p>
                  <p className="font-bold text-foreground">— {t.author}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 🟠 GET INVOLVED & CALL TO ACTION */}
      <section id="get-involved" className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-orange-600 dark:bg-orange-900" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-yellow-400/20 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1596484552834-6a58f850d0a1?q=80&w=2070&auto=format&fit=crop')] opacity-10 bg-cover bg-center mix-blend-overlay" />
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Help us serve Krishna <br className="hidden md:block" /> by serving others.
          </h2>
          <p className="text-xl md:text-2xl text-orange-100 max-w-2xl mx-auto mb-12 font-medium">
            No one should go hungry—physically or spiritually. Join our mission today.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Button size="lg" className="bg-white text-orange-600 hover:bg-orange-50 h-16 px-10 text-lg font-bold w-full sm:w-auto rounded-xl shadow-2xl" asChild>
              <Link to="/donate">Donate Meals</Link>
            </Button>
            <Button size="lg" className="bg-transparent border-2 border-white text-white hover:bg-white/10 hover:text-white h-16 px-10 text-lg font-bold w-full sm:w-auto rounded-xl backdrop-blur-sm shadow-none" asChild>
              <a href="mailto:iskm.montreal@gmail.com">Volunteer With Us</a>
            </Button>
          </div>
          

        </div>
      </section>
    </div>
  )
}
