import React, { useState, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { getYouTubeShorts, type YouTubeShort } from '@/server/youtube';
import { Play, ExternalLink, Sparkles } from 'lucide-react';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import gsap from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from '@gsap/react';
import { AnimatePresence, motion } from "motion/react";

gsap.registerPlugin(ScrollTrigger);

const LoadingGrid = () => (
  <div className="grid grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3">
    {[...Array(12)].map((_, i) => (
      <div key={i} className="aspect-[9/16] rounded-xl bg-muted animate-pulse" />
    ))}
  </div>
);

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

  if (isLoading) return <LoadingGrid />;
  if (error) return <ErrorState />;
  if (!shorts?.length) return null;

  return (
    <section ref={containerRef} className="relative py-16 md:py-24 overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
      
      {/* Hero Header */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={headerRef} className="text-center mb-10 md:mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-4">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">YouTube Shorts</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            Bite-sized Wisdom for Your
            <span className="block text-primary">Daily Inspiration</span>
          </h2>
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Discover quick insights and spiritual nuggets in our curated collection
          </p>
          
          <a 
            href="https://www.youtube.com/@ISKM108/shorts" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-primary/80 text-white rounded-lg font-medium hover:shadow-lg hover:scale-105 transition-all"
          >
            View All Shorts
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3 md:gap-4">
          {shorts.map((short, index) => (
            <ShortCard 
              key={short.id} 
              {...short} 
              index={index}
              onSelect={setSelectedShort} 
            />
          ))}
        </div>
      </div>

      {/* Video Player Modal */}
      <AnimatePresence>
        {selectedShort && (
          <Dialog open={!!selectedShort} onOpenChange={(open) => !open && setSelectedShort(null)}>
            <DialogContent className="sm:max-w-[400px] p-0 bg-black border-none overflow-hidden">
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

function ShortCard({ id, title, thumbnail, onSelect }: YouTubeShort & { index: number; onSelect: (id: string) => void }) {
  return (
    <div
      onClick={() => onSelect(id)}
      className="short-card group relative cursor-pointer"
    >
      <div className="relative aspect-[9/16] overflow-hidden rounded-xl border border-border/50 bg-muted shadow-sm transition-all duration-300 hover:shadow-xl hover:border-primary/30 hover:scale-[1.02]">
        {/* Thumbnail */}
        <img 
          src={thumbnail} 
          alt={title} 
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" 
        />
        
        {/* Play button overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/20 transition-colors duration-300">
          <div className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100">
            <Play className="w-5 h-5 text-black fill-black ml-0.5" />
          </div>
        </div>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        
        {/* Title */}
        <div className="absolute bottom-0 left-0 right-0 p-2 md:p-2.5 transform transition-transform duration-300">
          <p className="line-clamp-2 text-[9px] md:text-xs font-semibold text-white drop-shadow-lg leading-[1.1]">
            {title}
          </p>
        </div>
      </div>
    </div>
  );
}
