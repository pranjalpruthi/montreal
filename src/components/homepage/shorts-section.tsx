import { useState, useRef, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getYouTubeShorts, type YouTubeShort } from '@/server/youtube';
import { Play, ExternalLink, Sparkles, Pause, ChevronDown } from 'lucide-react';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import gsap from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from '@gsap/react';
import { AnimatePresence, motion } from "motion/react";

gsap.registerPlugin(ScrollTrigger);

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Marquee } from "@/components/magicui/marquee";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@/components/animate-ui/headless/disclosure";



const ErrorState = () => (
  <div className="flex flex-col items-center justify-center py-20 px-4">
    <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mb-4">
      <Play className="w-8 h-8 text-red-500" />
    </div>
    <p className="text-lg font-medium text-foreground mb-2">Failed to load shorts</p>
    <p className="text-sm text-muted-foreground">Please try again later</p>
  </div>
);

export function ShortsSection() {
  const [selectedShort, setSelectedShort] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const [columns, setColumns] = useState(3);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const checkColumns = () => {
      if (window.matchMedia('(min-width: 1024px)').matches) {
        setColumns(3);
      } else {
        setColumns(2);
      }
    };
    
    // Initial check
    checkColumns();

    // Listener
    const mediaLg = window.matchMedia('(min-width: 1024px)');
    const listener = () => checkColumns();
    
    mediaLg.addEventListener('change', listener);
    
    return () => {
        mediaLg.removeEventListener('change', listener);
    };
  }, []);
  
  const { data: shorts = [], isLoading, error } = useQuery<YouTubeShort[]>({
    queryKey: ['youtube-shorts'],
    queryFn: getYouTubeShorts,
    staleTime: 1000 * 60 * 60 * 24,
  });

  useGSAP(() => {
    if (isLoading || !shorts.length) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
      }
    });

    tl.from(headerRef.current, {
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out"
    })
    .from(".short-card", {
      y: 30,
      opacity: 0,
      duration: 0.6,
      stagger: 0.05,
      ease: "power2.out"
    }, "-=0.4");

  }, { scope: containerRef, dependencies: [isLoading, shorts.length] });

  if (isLoading) return <div className="h-[600px] w-full bg-muted/10 animate-pulse rounded-xl" />;
  if (error) return <ErrorState />;
  if (!shorts?.length) return null;

  return (
    <section ref={containerRef} className="relative py-16 md:py-24 overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Left Column: Hero Text */}
        <div ref={headerRef} className="text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">YouTube Shorts</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
            Bite-sized Wisdom for Your
            <span className="block text-primary mt-2">Daily Inspiration</span>
          </h2>
          
          <p className="text-lg text-muted-foreground mr-auto mb-8 max-w-lg">
            Discover quick insights and spiritual nuggets in our curated collection. Watch, learn, and be inspired in less than a minute.
          </p>
          
          
          <div className="flex flex-wrap gap-4 items-center justify-center md:justify-start">
            <a 
                href="https://www.youtube.com/@ISKM108/shorts" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-primary/80 text-white rounded-lg font-medium hover:shadow-lg hover:scale-105 transition-all"
            >
                View Channel
                <ExternalLink className="w-4 h-4" />
            </a>

            <Drawer>
                <DrawerTrigger asChild>
                    <button className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-lg font-medium hover:shadow-lg hover:scale-105 hover:from-violet-500 hover:to-indigo-500 transition-all">
                        <span className="relative flex h-2 w-2 mr-1">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                        </span>
                        Recent Shorts
                    </button>
                </DrawerTrigger>
                <DrawerContent className="max-h-[85vh]">
                    <DrawerHeader>
                        <DrawerTitle>Recent Shorts</DrawerTitle>
                        <DrawerDescription>
                            Browse our collection of bite-sized wisdom.
                        </DrawerDescription>
                    </DrawerHeader>
                    <div className="p-4 overflow-y-auto">
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 md:gap-4">
                            {shorts.map((short) => (
                                <div
                                    key={`drawer-${short.id}`}
                                    onClick={() => setSelectedShort(short.id)}
                                    className="group/drawer-card relative cursor-pointer aspect-[9/16] overflow-hidden rounded-lg border border-border/50 bg-muted shadow-sm hover:shadow-md transition-all"
                                >
                                    <img 
                                      src={short.thumbnail} 
                                      alt={short.title} 
                                      loading="lazy"
                                      className="h-full w-full object-cover transition-opacity duration-300 opacity-90 group-hover/drawer-card:opacity-100" 
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover/drawer-card:opacity-100 transition-opacity duration-300">
                                      <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/90 flex items-center justify-center shadow-md">
                                        <Play className="w-4 h-4 md:w-5 md:h-5 text-black fill-black ml-0.5" />
                                      </div>
                                    </div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                                    <div className="absolute bottom-0 left-0 right-0 p-2">
                                      <p className="line-clamp-2 text-[10px] md:text-xs font-medium text-white leading-tight">
                                        {short.title}
                                      </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </DrawerContent>
            </Drawer>

            <button
                onClick={() => setIsPaused(!isPaused)}
                className="inline-flex hidden lg:flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white hover:shadow-lg hover:scale-105 hover:from-violet-500 hover:to-indigo-500 transition-all"
                title={isPaused ? "Play Animation" : "Pause Animation"}
            >
                {isPaused ? <Play className="w-5 h-5 ml-0.5 fill-current" /> : <Pause className="w-5 h-5 fill-current" />}
            </button>
          </div>

          <div className="mt-12 w-full max-w-lg">
            <Disclosure className="border border-border/50 rounded-lg overflow-hidden bg-card/30 backdrop-blur-sm">
                {({ open }) => (
                    <>
                        <DisclosureButton className="flex w-full items-center justify-between p-4 text-left font-medium transition-all hover:bg-muted/50 data-[open]:bg-muted/30">
                            <span className="flex items-center gap-2 text-primary">
                                <Sparkles className="h-4 w-4" />
                                Why We Offer Short, Powerful ISKM Videos
                            </span>
                            <ChevronDown
                                className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${
                                    open ? 'rotate-180' : ''
                                }`}
                            />
                        </DisclosureButton>
                        <DisclosurePanel>
                            <div className="p-4 pt-0 space-y-4 text-sm text-muted-foreground">
                                <div className="space-y-1 italic text-foreground/90 font-medium">
                                    <p>prāyeṇālpāyuṣaḥ sabhya</p>
                                    <p>kalāv asmin yuge janāḥ</p>
                                    <p>mandāḥ sumanda-matayo</p>
                                    <p>mandā-bhāgyā hy upadrutāḥ</p>
                                </div>
                                <div className="pl-3 border-l-2 border-primary/30">
                                    <p className="font-semibold text-foreground mb-1">Translation (Śrīla Prabhupāda)</p>
                                    <p>“O learned one, in this iron age of Kali men generally have short lives. They are quarrelsome, lazy, misguided, unlucky, and above all, always disturbed.”</p>
                                    <p className="text-xs mt-1 opacity-70">— Śrīmad-Bhāgavatam 1.1.10</p>
                                </div>
                                <div className="bg-primary/5 p-3 rounded-md">
                                    <p className="font-semibold text-primary mb-1">Purport Highlight</p>
                                    <p>“People of this age are always disturbed in mind, very short-living and slow in spiritual realization. Therefore one cannot concentrate for long nor understand spiritual matters deeply.”</p>
                                </div>
                            </div>
                        </DisclosurePanel>
                    </>
                )}
            </Disclosure>
          </div>
        </div>

        {/* Right Column: Vertical Marquee Columns (Hidden on Mobile) */}
        <div 
            className="hidden lg:flex relative h-[600px] w-full gap-4 lg:gap-6 overflow-hidden"
            style={{
                maskImage: 'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)',
                WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)'
            }}
        >
             {Array.from({ length: columns }).map((_, colIndex) => {
                 const columnShorts = shorts.filter((_, index) => index % columns === colIndex);
                 
                 return (
                     <div key={colIndex} className="flex-1 h-full relative">
                         <Marquee 
                            vertical
                            className="h-full [--duration:120s]"
                            reverse={colIndex % 2 === 1} // Alternate direction
                            pauseOnHover={true}
                            paused={isPaused}
                         >
                            {columnShorts.map((short) => (
                                <div
                                    key={short.id}
                                    onClick={() => setSelectedShort(short.id)}
                                    // Removed expensive shadows and hover scales that cause layout shifts/repaints
                                    className="group/card relative cursor-pointer aspect-[9/16] overflow-hidden rounded-xl border border-white/10 bg-black/40 mb-4 transition-opacity hover:opacity-100"
                                >
                                    <img 
                                      src={short.thumbnail} 
                                      alt={short.title} 
                                      loading="lazy"
                                      className="h-full w-full object-cover opacity-80 transition-opacity duration-300 group-hover/card:opacity-100" 
                                    />
                                    
                                    {/* Simplified overlay - no blur, simple opacity trigger */}
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300">
                                      <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center shadow-lg transform scale-90 transition-transform duration-300 group-hover/card:scale-100">
                                        <Play className="w-5 h-5 text-black fill-black ml-0.5" />
                                      </div>
                                    </div>

                                    {/* Simplified gradient */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-90" />
                                    
                                    <div className="absolute bottom-0 left-0 right-0 p-4">
                                      <p className="line-clamp-2 text-sm font-bold text-white leading-snug">
                                        {short.title}
                                      </p>
                                    </div>
                                </div>
                            ))}
                         </Marquee>
                     </div>
                 );
             })}
        </div>
      </div>

      {/* Video Player Modal */}
      <AnimatePresence>
        {selectedShort && (
          <Dialog open={!!selectedShort} onOpenChange={(open) => !open && setSelectedShort(null)}>
            <DialogContent className="sm:max-w-[400px] p-0 bg-black border-none overflow-hidden block">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="aspect-[9/16] w-full"
              >
                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/${selectedShort}?autoplay=1&rel=0`}
                  title="YouTube Short"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </motion.div>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>
    </section>
  );
}


