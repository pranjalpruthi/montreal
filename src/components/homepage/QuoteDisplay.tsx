"use client";

import { useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";

interface QuoteData {
  text: string;
  citation: string;
  category?: string;
}

interface QuoteDisplayProps {
  quotes: QuoteData[];
}

export function QuoteDisplay({ quotes }: QuoteDisplayProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLQuoteElement>(null);
  const citationRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<gsap.core.Tween | null>(null);

  const { contextSafe } = useGSAP({ scope: containerRef });

  const animateChange = contextSafe((direction: "next" | "prev") => {
    if (timerRef.current) timerRef.current.kill();
    
    const tl = gsap.timeline();

    tl.to([quoteRef.current, citationRef.current], {
      y: -20,
      opacity: 0,
      duration: 0.4,
      ease: "power3.in",
      onComplete: () => {
        setCurrentIndex((prev) => {
          if (direction === "next") {
            return (prev + 1) % quotes.length;
          } else {
            return (prev - 1 + quotes.length) % quotes.length;
          }
        });
        
        gsap.set([quoteRef.current, citationRef.current], { y: 20 });
      },
    });
  });

  const handleNext = () => animateChange("next");
  const handlePrev = () => animateChange("prev");

  useGSAP(() => {
    gsap.to([quoteRef.current, citationRef.current], {
      y: 0,
      opacity: 1,
      duration: 0.6,
      ease: "power3.out",
      stagger: 0.1
    });

    if (timerRef.current) timerRef.current.kill();

    gsap.set(progressRef.current, { width: "0%" });

    timerRef.current = gsap.to(progressRef.current, {
      width: "100%",
      duration: 6,
      ease: "linear",
      onComplete: () => {
        handleNext();
      }
    });

    return () => {
      if (timerRef.current) timerRef.current.kill();
    };
  }, { scope: containerRef, dependencies: [currentIndex] });

  const currentQuote = quotes[currentIndex];

  return (
    <div
      ref={containerRef}
      className="relative h-[500px] w-full flex flex-col justify-between p-8 md:p-12 rounded-3xl overflow-hidden bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/10 backdrop-blur-sm"
      onMouseEnter={() => timerRef.current?.pause()}
      onMouseLeave={() => timerRef.current?.play()}
    >
      {/* Background Icon */}
      <Quote className="absolute top-6 left-6 h-24 w-24 text-primary/5 -z-10 rotate-180" />

      {/* Content Container - Fixed Height/Flex to center */}
      <div className="flex-1 flex flex-col justify-center items-center text-center z-10 overflow-hidden">
        <blockquote
          ref={quoteRef}
          className="text-2xl md:text-3xl lg:text-4xl font-serif italic text-foreground leading-relaxed tracking-tight opacity-0 line-clamp-6"
        >
          "{currentQuote.text}"
        </blockquote>

        <div ref={citationRef} className="mt-8 space-y-2 opacity-0">
          <div className="h-1 w-12 bg-primary/50 mx-auto rounded-full" />
          <p className="text-sm md:text-base font-medium text-muted-foreground line-clamp-2">
            {currentQuote.citation}
          </p>
          {currentQuote.category && (
            <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-[10px] font-bold text-primary uppercase tracking-widest">
              {currentQuote.category}
            </span>
          )}
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between mt-8 z-10 shrink-0">
        <Button
          variant="ghost"
          size="icon"
          onClick={handlePrev}
          className="hover:bg-primary/10 hover:text-primary transition-colors"
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>

        <div className="flex-1 mx-6 h-1 bg-primary/10 rounded-full overflow-hidden">
          <div ref={progressRef} className="h-full bg-primary/50 rounded-full" />
        </div>

        <Button
          variant="ghost"
          size="icon"
          onClick={handleNext}
          className="hover:bg-primary/10 hover:text-primary transition-colors"
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
      </div>
    </div>
  );
}
