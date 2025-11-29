import { Button } from '@/components/ui/button'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Facebook, Instagram, Youtube, Mail } from 'lucide-react'

const quotes = [
  {
    text: "Chant Hare Krishna and your life will be sublime.",
    source: "Srila Prabhupāda"
  },
  {
    text: "Simply chant and hear. That’s all. Everything will be revealed.",
    source: "Lecture, Los Angeles, 1972"
  },
  {
    text: "This chanting Hare Krishna is not a material sound vibration. It is directly from the spiritual world.",
    source: "Lecture, Montreal, June 16, 1968"
  },
  {
    text: "Chant Hare Krishna and be happy.",
    source: "Srila Prabhupāda"
  },
  {
    text: "Wherever we open a center, that is Vrindavana.",
    source: "Lecture, London, July 30, 1972"
  },
  {
    text: "A temple means a chance for everyone to hear about Krishna.",
    source: "Lecture on SB 1.2.17, Vrindavan, 1972"
  },
  {
    text: "Make this temple a place where people can come, learn about Krishna, and perfect their lives.",
    source: "Conversation, Los Angeles, 1973"
  },
  {
    text: "Simply by hearing the Bhagavatam, one becomes purified.",
    source: "Lecture, SB 1.2.17, Los Angeles, 1972"
  },
  {
    text: "If you simply read my books carefully, everything will be revealed.",
    source: "Srila Prabhupāda Letter, November 22, 1974"
  },
  {
    text: "Association means hearing. Spiritual life begins by hearing.",
    source: "Morning Walk, Los Angeles, 1973"
  },
  {
    text: "Devotional service begins with the tongue—chanting and eating Krishna prasadam.",
    source: "Lecture, London, 1973"
  },
  {
    text: "Service to the devotees is the open door to liberation.",
    source: "Lecture on SB 1.2.16, Vrindavan, 1972"
  },
  {
    text: "Engage in Krishna’s service and you will feel practical spiritual happiness.",
    source: "Lecture, New York, 1966"
  },
  {
    text: "Everyone is welcome. Krishna consciousness is not sectarian.",
    source: "Lecture, Hawaii, 1969"
  },
  {
    text: "Come, chant, dance, take prasadam, and be happy.",
    source: "Public Lecture, 1973"
  },
  {
    text: "We are inviting everyone: please come, chant with us, dance with us, take prasadam.",
    source: "Lecture, 1975"
  },
  {
    text: "Krishna consciousness is the joyful process.",
    source: "Bhagavad-gītā Introduction Lecture"
  },
  {
    text: "Krishna is your best friend.",
    source: "Conversation, Mayapur, 1976"
  },
  {
    text: "Human life is meant for self-realization.",
    source: "Lecture, Bhagavad-gītā 2.13, New York, 1966"
  },
  {
    text: "Take shelter of Krishna wholeheartedly.",
    source: "Morning Walk, Vrindavan, 1975"
  },
  {
    text: "Krishna is so kind that even if you take one step toward Him, He takes ten steps toward you.",
    source: "Lecture, India, 1974"
  },
  {
    text: "Krishna consciousness means to awaken our dormant love for Krishna.",
    source: "Lecture, Los Angeles, 1974"
  }
];

export function Hero() {
  const [currentIndex, setCurrentIndex] = useState(() => Math.floor(Math.random() * quotes.length))

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % quotes.length)
    }, 6000)

    return () => clearInterval(timer)
  }, [])

  const quote = quotes[currentIndex]

  return (
    <section id="main-content" className="relative min-h-[90vh] flex items-center justify-center bg-background py-32 overflow-visible">
      {/* Abstract Background Pattern */}
      <div className="absolute inset-0 w-full h-full bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none opacity-20 dark:opacity-10" />
      
      {/* Dark Mode Glow Effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-accent/20 blur-[120px] rounded-full pointer-events-none opacity-0 dark:opacity-30 mix-blend-screen" />

      <div className="container mx-auto px-4 md:px-8 relative z-10 max-w-7xl">
        <div className="max-w-4xl mx-auto text-center space-y-6 md:space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <div className="inline-flex items-center rounded-full border border-accent/20 bg-accent/5 px-3 py-1 text-sm text-accent mb-4 backdrop-blur-sm">
            <span className="flex h-2 w-2 rounded-full bg-accent mr-2 animate-pulse"></span>
            Welcome to Your Spiritual Home
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground leading-tight drop-shadow-sm dark:drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">
            International <br className="hidden md:block" />
            <span className="text-primary bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">Sri Krishna Mandir</span> Montreal
          </h1>

          <div className="space-y-4">
            <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Dedicated to the teachings of His Divine Grace <br className="hidden md:block" />
              <span className="font-semibold text-foreground">A.C. Bhaktivedanta Swami Prabhupāda</span>
            </p>
            
            <p className="text-sm md:text-base text-muted-foreground/80">
              Temple President: <span className="font-medium text-foreground">HG Nimai Nitai Prabhu</span>
            </p>
          </div>

          <div className="p-6 bg-white/60 dark:bg-black/20 backdrop-blur-sm rounded-2xl border border-accent/10 shadow-sm max-w-xl mx-auto transition-colors min-h-[140px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="flex flex-col items-center text-center w-full"
              >
                <p className="text-lg md:text-xl italic font-serif mb-2 leading-relaxed text-foreground/80">
                  "{quote.text}"
                </p>
                {quote.source && (
                  <span className="text-xs uppercase tracking-widest font-sans mt-1 text-muted-foreground/80">
                    {quote.source}
                  </span>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center pt-4">
            <Button asChild size="lg" className="h-12 px-8 text-base bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:scale-105 hover:shadow-primary/40">
              <a href="https://maps.app.goo.gl/dRyY7aa3nnvndq5t6" target="_blank" rel="noopener noreferrer">
                Visit Temple
              </a>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-12 px-8 text-base border-accent/20 hover:bg-accent/5 hover:text-accent backdrop-blur-sm bg-background/50">
              <a href="#programs">Join a Program</a>
            </Button>
          </div>

          <div className="flex items-center justify-center gap-6 pt-6 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200">
            <a href="https://www.facebook.com/profile.php?id=61580147803495" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-[#1877F2] transition-colors transform hover:scale-110">
              <Facebook className="h-6 w-6" />
              <span className="sr-only">Facebook</span>
            </a>
            <a href="https://www.instagram.com/iskmmontreal/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-[#E4405F] transition-colors transform hover:scale-110">
              <Instagram className="h-6 w-6" />
              <span className="sr-only">Instagram</span>
            </a>
            <a href="https://www.youtube.com/@iskmfrancais" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-[#FF0000] transition-colors transform hover:scale-110">
              <Youtube className="h-6 w-6" />
              <span className="sr-only">YouTube</span>
            </a>
             <a href="mailto:admin@iskm.ca" className="text-muted-foreground hover:text-foreground transition-colors transform hover:scale-110">
              <Mail className="h-6 w-6" />
              <span className="sr-only">Email</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
