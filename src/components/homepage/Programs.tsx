"use client";

import { useRef } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Clock, Music, Users, Sparkles, ArrowRight } from 'lucide-react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function Programs() {
  const containerRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    // Header Animation
    gsap.from(headerRef.current?.children || [], {
      y: 30,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: headerRef.current,
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      }
    })

    // Cards Animation
    const cards = cardsRef.current?.children
    if (cards) {
      gsap.from(cards, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: cardsRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse'
        }
      })
    }
  }, { scope: containerRef })

  return (
    <section id="programs" ref={containerRef} className="py-20 md:py-32 bg-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/5 blur-[100px] rounded-full pointer-events-none" />
      
      <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10">
        <div ref={headerRef} className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
            Programs & Schedule
          </h2>
          <p className="text-lg text-muted-foreground">
            Immerse yourself in daily devotion, community gatherings, and joyous celebrations.
          </p>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Daily Worship - Tall Card */}
          <div className="md:col-span-1 md:row-span-2 h-full">
            <Card className="h-full border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/20 transition-all duration-300 overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/50 to-transparent" />
              <CardHeader>
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-2xl">Daily Worship</CardTitle>
                <p className="text-muted-foreground">Morning & Evening Programs</p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  {[
                    { time: '4:30 AM', event: 'Mangala Arati' },
                    { time: '7:15 AM', event: 'Guru Puja' },
                    { time: '7:45 AM', event: 'Bhagavatam Class' },
                    { time: '6:30 PM', event: 'Gaura Arati' },
                    { time: '7:00 PM', event: 'Bhagavad-gita Class' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-lg hover:bg-accent/5 transition-colors border border-transparent hover:border-border/50">
                      <span className="font-medium">{item.event}</span>
                      <Badge variant="secondary" className="font-mono text-xs">{item.time}</Badge>
                    </div>
                  ))}
                </div>
                <div className="pt-4 border-t border-border/50">
                  <p className="text-sm text-muted-foreground italic">
                    "The early morning hours are the best time for spiritual practice."
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Weekly Programs - Wide Card */}
          <div className="md:col-span-2">
            <Card className="h-full border-border/50 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm hover:shadow-lg transition-all duration-300 overflow-hidden group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-2xl flex items-center gap-2">
                      <Users className="w-6 h-6 text-accent" />
                      Weekly Gatherings
                    </CardTitle>
                    <p className="text-muted-foreground">Connect with the community</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="grid md:grid-cols-2 gap-6 relative z-10">
                <div className="p-5 rounded-xl bg-background/50 border border-border/50 hover:border-accent/30 transition-colors group/sunday">
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="font-bold text-lg group-hover/sunday:text-accent transition-colors">Sunday Feast</h4>
                    <Badge className="bg-accent text-white hover:bg-accent/90">Weekly</Badge>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                    <Clock className="w-4 h-4" />
                    <span>Every Sunday @ 5:00 PM</span>
                  </div>
                  <p className="text-sm leading-relaxed">
                    Kirtan, spiritual discourse, and a free vegetarian feast. The perfect way to recharge for the week.
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-background/50 border border-border/50 hover:border-accent/30 transition-colors group/friday">
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="font-bold text-lg group-hover/friday:text-accent transition-colors">Friday Harinam</h4>
                    <Badge variant="outline">Outreach</Badge>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                    <Music className="w-4 h-4" />
                    <span>City Streets</span>
                  </div>
                  <p className="text-sm leading-relaxed">
                    Join us for outdoor chanting and dancing in the city streets. Spread the joy of the Holy Names!
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Festivals - Wide Card (Bottom) */}
          <div className="md:col-span-2">
            <Card className="h-full border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/20 transition-all duration-300 overflow-hidden">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <Sparkles className="w-6 h-6 text-yellow-500" />
                  Major Festivals
                </CardTitle>
                <p className="text-muted-foreground">Celebrate with us throughout the year</p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {['Janmashtami', 'Gaura Purnima', 'Govardhan Puja', 'Ratha Yatra', 'Rama Navami', 'Diwali'].map((festival, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-accent/5 hover:bg-accent/10 transition-colors group cursor-default">
                      <div className="w-2 h-2 rounded-full bg-accent group-hover:scale-150 transition-transform" />
                      <span className="font-medium text-sm">{festival}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 flex justify-end">
                  <a href="#" className="text-sm font-medium text-primary hover:text-primary/80 flex items-center gap-1 transition-colors">
                    View Full Calendar <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
