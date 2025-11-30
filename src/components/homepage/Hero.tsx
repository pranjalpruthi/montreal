import { Button } from '@/components/ui/button'
import { useState, useEffect } from 'react'
import { Facebook, Instagram, Youtube, Mail, MapPin, Calendar, ChevronDown } from 'lucide-react'
import { TypingText } from '@/components/animate-ui/text/typing'
import LightRays from '@/components/animate-ui/backgrounds/light-rays'
import spTeaching from '@/assets/sp-teaching.png'


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
  const [currentDate, setCurrentDate] = useState('')

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % quotes.length)
    }, 10000)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const date = new Date()
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
    setCurrentDate(date.toLocaleDateString('en-US', options))
  }, [])

  const quote = quotes[currentIndex]

  return (
    <section id="main-content" className="relative min-h-[90vh] flex items-center bg-background py-20 lg:py-32 overflow-hidden">

      {/* Light Rays - Dark Mode Only */}
      <div className="absolute inset-0 w-full h-full pointer-events-none hidden dark:block z-0">
        <LightRays
          raysOrigin="top-center"
          raysColor="#FFD700"
          raysSpeed={1.5}
          lightSpread={0.8}
          rayLength={1.2}
          followMouse={true}
          mouseInfluence={0.1}
          noiseAmount={0.1}
          distortion={0.05}
          className="opacity-40"
        />
      </div>

      {/* Abstract Background Pattern */}
      <div className="absolute inset-0 w-full h-full bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none opacity-20 dark:opacity-10" />
      
      {/* Light Mode Gradient Overlay */}
      <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-orange-50/40 via-white/0 to-white/0 dark:hidden pointer-events-none" />
      
      {/* Dark Mode Glow Effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-accent/20 blur-[120px] rounded-full pointer-events-none opacity-0 dark:opacity-30 mix-blend-screen" />

      <div className="container mx-auto px-4 md:px-8 relative z-10 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Content & Buttons */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-6 md:space-y-8 order-2 lg:order-1">
            <div className="inline-flex items-center rounded-full border border-accent/20 bg-accent/5 px-3 py-1 text-sm text-accent backdrop-blur-sm">
              <span className="flex h-2 w-2 rounded-full bg-accent mr-2 animate-pulse"></span>
              {currentDate}
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground leading-tight drop-shadow-sm dark:drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">
              International <br className="block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF1493] via-[#FFD700] to-[#FF8C00] animate-gradient-x bg-[length:200%_auto] whitespace-nowrap">
                Sri Krishna Mandir
              </span>
              <br className="block md:hidden" />
              <span className="hidden md:inline"> </span>
              Montreal
            </h1>

            <div className="space-y-4 max-w-2xl lg:max-w-none">
              <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground leading-relaxed">
                Dedicated to the teachings of His Divine Grace <br className="hidden md:block" />
                <span className="font-semibold text-foreground">A.C. Bhaktivedanta Swami Prabhupāda</span>
              </p>
              
              <p className="text-sm md:text-base text-muted-foreground/80">
                Temple President: <span className="font-medium text-foreground">HG Nimai Nitai Prabhu</span>
              </p>
            </div>

            <div className="flex flex-row gap-2 sm:gap-4 pt-4 w-full sm:w-auto max-w-md sm:max-w-none mx-auto lg:mx-0">
              <Button asChild size="lg" className="flex-1 sm:flex-none h-10 sm:h-11 px-2 sm:px-8 text-sm sm:text-base group hover:scale-105 transition-transform duration-300 shadow-lg hover:shadow-xl">
                <a href="https://maps.app.goo.gl/dRyY7aa3nnvndq5t6" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                  <MapPin className="h-3.5 w-3.5 sm:h-4 sm:w-4 transition-transform group-hover:animate-bounce" />
                  Visit Temple
                </a>
              </Button>
              <Button asChild variant="secondary" size="lg" className="flex-1 sm:flex-none h-10 sm:h-11 px-2 sm:px-8 text-sm sm:text-base group hover:scale-105 transition-transform duration-300 shadow-md hover:shadow-lg">
                <a href="#programs" className="flex items-center justify-center gap-2">
                  <Calendar className="h-3.5 w-3.5 sm:h-4 sm:w-4 transition-transform group-hover:rotate-12" />
                  Join Program
                </a>
              </Button>
            </div>

            {/* Social Icons - Floating Dock Style */}
            <div className="pt-4 flex justify-center lg:justify-start w-full">
              <div className="flex items-center gap-3 p-2 rounded-full bg-background/40 backdrop-blur-md border border-border/40 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <SocialLink href="https://www.facebook.com/profile.php?id=61580147803495" icon={<Facebook className="h-5 w-5" />} label="Facebook" color="border-[#1877F2] text-[#1877F2] hover:bg-[#1877F2]/10" />
                <SocialLink href="https://www.instagram.com/iskmmontreal/" icon={<Instagram className="h-5 w-5" />} label="Instagram" color="border-[#E4405F] text-[#E4405F] hover:bg-[#E4405F]/10" />
                <SocialLink href="https://www.youtube.com/@iskmfrancais" icon={<Youtube className="h-5 w-5" />} label="YouTube" color="border-[#FF0000] text-[#FF0000] hover:bg-[#FF0000]/10" />
                <SocialLink href="mailto:admin@iskm.ca" icon={<Mail className="h-5 w-5" />} label="Email" color="border-accent text-accent hover:bg-accent/10" />
              </div>
            </div>
          </div>

          {/* Right Column: Quote "Paper" with Glance View - Desktop Only */}
          <div className="hidden lg:flex justify-end order-2 w-full">
            <div className="relative w-full max-w-md aspect-[3/4] bg-[#fdfbf7] dark:bg-[#1c1c1c] rounded-sm shadow-[0_20px_50px_rgba(0,0,0,0.15)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.4)] rotate-1 hover:rotate-0 transition-transform duration-500 ease-out border border-border/20 p-12 flex flex-col items-center justify-center text-center overflow-hidden group">
              
              {/* Glance View Image - Watermark style */}
              <div className="absolute inset-0 z-0">
                <img 
                  src={spTeaching} 
                  alt="Srila Prabhupada" 
                  className="w-full h-full object-cover opacity-10 dark:opacity-20 grayscale sepia-[0.2] transition-transform duration-700 group-hover:scale-105" 
                />
              </div>

              {/* Paper texture/lines effect */}
              <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_29px,rgba(0,0,0,0.05)_30px)] bg-[size:100%_30px] pointer-events-none z-0" />
              <div className="absolute left-8 top-0 bottom-0 w-[2px] bg-red-500/20 pointer-events-none z-0" /> {/* Margin line */}
              
              {/* Pin or Tape effect */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-32 h-8 bg-yellow-200/80 dark:bg-yellow-900/30 rotate-[-2deg] shadow-sm backdrop-blur-[1px] z-10" />

              <div className="relative z-10 flex flex-col items-center justify-center h-full">
                <div key={currentIndex} className="space-y-6">
                  <div className="text-4xl text-primary/20 font-serif leading-none">“</div>
                  <p className="text-2xl font-serif leading-relaxed text-foreground/90 italic">
                    <TypingText 
                      text={quote.text}
                      duration={30}
                      cursor={true}
                    />
                  </p>
                  {quote.source && (
                    <div className="mt-6 w-full">
                      <div className="w-16 h-px bg-border/40 mx-auto mb-4" />
                      <span className="block text-sm uppercase tracking-widest font-sans text-muted-foreground/80 opacity-0 animate-[fadeIn_0.5s_ease-in_1.5s_forwards]">
                        {quote.source}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Mobile Quote Slider - Bottom of Hero */}
        <div className="lg:hidden mt-16 w-full max-w-lg mx-auto">
          <div className="relative bg-background/40 backdrop-blur-md border border-border/50 rounded-xl p-6 shadow-lg overflow-hidden">
             {/* Background Image Watermark */}
             <div className="absolute inset-0 z-0 opacity-10 dark:opacity-20 pointer-events-none">
                <img 
                  src={spTeaching} 
                  alt="Srila Prabhupada" 
                  className="w-full h-full object-cover grayscale sepia-[0.2]" 
                />
              </div>
              
            <div className="relative z-10 flex flex-col items-center text-center space-y-3">
              <div className="text-2xl text-primary/40 font-serif leading-none">“</div>
              <p className="text-lg font-serif leading-relaxed text-foreground/90 italic min-h-[80px] flex items-center justify-center">
                <TypingText 
                  text={quote.text}
                  duration={20}
                  cursor={true}
                />
              </p>
              {quote.source && (
                <div className="mt-3 w-full">
                  <div className="w-12 h-px bg-border/30 mx-auto mb-2" />
                  <span className="block text-xs uppercase tracking-widest font-sans text-muted-foreground/90">
                    {quote.source}
                  </span>
                </div>
              )}
            </div>
            
            {/* Progress Bar */}
            <div className="absolute bottom-0 left-0 h-1 bg-primary/20 w-full">
              <div 
                key={currentIndex}
                className="h-full bg-primary/50 animate-[progress_10s_linear]"
              />
            </div>
          </div>
        </div>

      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce hidden md:flex flex-col items-center gap-2 opacity-50 hover:opacity-100 transition-opacity cursor-pointer z-20" onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}>
        <span className="text-xs uppercase tracking-widest text-muted-foreground">Scroll</span>
        <ChevronDown className="w-6 h-6 text-muted-foreground" />
      </div>
    </section>
  )
}

function SocialLink({ href, icon, label, color }: { href: string; icon: React.ReactNode; label: string; color: string }) {
  return (
    <a 
      href={href} 
      target={href.startsWith('mailto') ? undefined : "_blank"} 
      rel={href.startsWith('mailto') ? undefined : "noopener noreferrer"} 
      className={`p-3 rounded-full border-2 transition-all duration-300 transform hover:scale-110 ${color}`}
      aria-label={label}
    >
      {icon}
    </a>
  )
}
