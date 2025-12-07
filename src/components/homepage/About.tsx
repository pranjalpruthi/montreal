import { useState, useCallback, useEffect } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { ChevronLeft, ChevronRight } from 'lucide-react'

// Dynamically import all deity images
const deityImages = import.meta.glob('../../assets/deity/*.{jpg,png}', { eager: true, import: 'default' }) as Record<string, string>

// Image metadata with captions
const imageMetadata: Record<string, { caption: string; alt: string; order: number }> = {
  'gaura-nitai.jpg': { caption: 'Sri Sri Gaura Nitai', alt: 'Gaura Nitai Deities', order: 0 },
  'radha-krsna-deity.jpg': { caption: 'Sri Sri Radha Krishna', alt: 'Radha Krishna Deities', order: 1 },
  'narashima.jpg': { caption: 'Lord Narasimhadeva', alt: 'Lord Narasimha Deity', order: 2 },
  'puri-deity.jpg': { caption: 'Lord Jagannatha, Baladeva, Mother Subhadra & Sudarshana', alt: 'Jagannatha Puri Deities', order: 3 },
  'prabhupada-deity.jpg': { caption: 'Srila Prabhupada', alt: 'Srila Prabhupada Deity', order: 4 },
  'acharaya.jpg': { caption: 'Sri Acharya', alt: 'Acharya Deity', order: 5 },
  'saligram.jpg': { caption: 'Sacred Saligram', alt: 'Saligram Shila', order: 6 },
  'tulsi-plant.jpg': { caption: 'Sacred Tulsi', alt: 'Tulsi Plant', order: 7 },
}

// Build carousel images array
const carouselImages = Object.entries(deityImages)
  .map(([path, src]) => {
    const filename = path.split('/').pop() || ''
    const metadata = imageMetadata[filename]
    return metadata ? { src: src as string, ...metadata } : null
  })
  .filter((img): img is { src: string; alt: string; caption: string; order: number } => img !== null)
  .sort((a, b) => a.order - b.order)

export function About() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 4000, stopOnInteraction: false })
  ])
  const [selectedIndex, setSelectedIndex] = useState(0)

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    emblaApi.on('select', onSelect)
    return () => {
      emblaApi.off('select', onSelect)
    }
  }, [emblaApi, onSelect])

  const scrollTo = useCallback(
    (index: number) => emblaApi?.scrollTo(index),
    [emblaApi]
  )

  const scrollPrev = useCallback(() => {
    emblaApi?.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    emblaApi?.scrollNext()
  }, [emblaApi])

  return (
    <section id="about" className="py-12 md:py-20 lg:py-24 bg-muted/30 dark:bg-muted/10 relative">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
          <div className="space-y-6 md:space-y-8">
            <div className="space-y-3 md:space-y-4">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground tracking-tight">
                Preserving the Original Teachings
              </h2>
              <div className="h-1 w-16 md:w-20 bg-accent rounded-full"></div>
            </div>

            <div className="space-y-4 md:space-y-6 text-base md:text-lg text-muted-foreground leading-relaxed">
              <p>
                At ISKM Montreal, we are dedicated to strictly following the instructions and mood of our Founder-Ācārya, <span className="font-semibold text-foreground">Srila Prabhupāda</span>.
              </p>
              <p>
                Our mission is to propagate the spiritual science of Bhakti Yoga as presented in the Bhagavad-gītā and Śrīmad-Bhāgavatam. Under the guidance of <span className="font-semibold text-foreground">HG Nimai Nitai Prabhu</span>, we strive to create a community based on love, service, and spiritual education.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
              <div className="flex-1 p-4 md:p-6 bg-background dark:bg-card rounded-xl border border-border shadow-sm hover:shadow-md transition-shadow">
                <h3 className="font-bold text-foreground mb-1 md:mb-2">Authentic</h3>
                <p className="text-sm text-muted-foreground">Strict adherence to the parampara system.</p>
              </div>
              <div className="flex-1 p-4 md:p-6 bg-background dark:bg-card rounded-xl border border-border shadow-sm hover:shadow-md transition-shadow">
                <h3 className="font-bold text-foreground mb-1 md:mb-2">Welcoming</h3>
                <p className="text-sm text-muted-foreground">A spiritual home for everyone.</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-2 md:-inset-4 bg-accent/10 rounded-3xl transform rotate-3 opacity-50 blur-sm"></div>
            <div className="relative group">
              <div className="overflow-hidden rounded-2xl" ref={emblaRef}>
                <div className="flex">
                  {carouselImages.map((image, index) => (
                    <div key={index} className="flex-[0_0_100%] min-w-0">
                      <div className="relative aspect-square bg-black overflow-hidden shadow-2xl border-4 md:border-8 border-background dark:border-card">
                        {/* Blurred background */}
                        <img 
                          src={image.src} 
                          alt="" 
                          className="absolute inset-0 w-full h-full object-cover blur-2xl scale-110 opacity-50"
                          aria-hidden="true"
                        />
                        {/* Main image with object-contain */}
                        <img 
                          src={image.src} 
                          alt={image.alt} 
                          className="relative w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                          <p className="text-white p-4 md:p-6 font-medium text-sm md:text-base">{image.caption}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Navigation Arrows */}
              <button
                onClick={scrollPrev}
                className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 rounded-full bg-background/80 dark:bg-card/80 backdrop-blur-sm border border-border shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-background dark:hover:bg-card"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-foreground" />
              </button>
              <button
                onClick={scrollNext}
                className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 rounded-full bg-background/80 dark:bg-card/80 backdrop-blur-sm border border-border shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-background dark:hover:bg-card"
                aria-label="Next image"
              >
                <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-foreground" />
              </button>
              
              {/* Carousel Dots */}
              <div className="flex justify-center gap-2 mt-4">
                {carouselImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => scrollTo(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === selectedIndex 
                        ? 'bg-accent w-6' 
                        : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
