import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { Calendar, Play, Youtube, Facebook, Clock, Globe } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Marquee } from '@/components/magicui/marquee'
import { FacebookFeed } from '@/components/community/facebook-feed'

// TypeScript declarations for Facebook SDK
declare global {
  interface Window {
    FB?: {
      XFBML: {
        parse: () => void
      }
    }
  }
}

interface Video {
  guid: string
  title: string
  pubDate: string
  link: string
  thumbnail: string
}

export function Feed() {
  const [videos, setVideos] = useState<Video[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        // ISKM TV Channel ID: UCA7bxZwd7dF3r8GWpShRqug
        const response = await fetch(
          'https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fwww.youtube.com%2Ffeeds%2Fvideos.xml%3Fchannel_id%3DUCA7bxZwd7dF3r8GWpShRqug'
        )
        const data = await response.json()
        if (data.items) {
          const formattedVideos = data.items.map((item: any) => {
            const videoId = item.guid.split(':').pop()
            return {
              guid: item.guid,
              title: item.title,
              pubDate: item.pubDate,
              link: item.link,
              thumbnail: `https://i.ytimg.com/vi/${videoId}/mqdefault.jpg`,
            }
          })
          setVideos(formattedVideos)
        }
      } catch (error) {
        console.error('Error fetching YouTube videos:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchVideos()
  }, [])



  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(date)
  }

  return (
    <section className="relative py-24 overflow-hidden bg-background">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-background to-background pointer-events-none" />
      
      <div className="container relative mx-auto px-4">
        {/* Header Section */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 border border-primary/20">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              ISKM TV International
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70">
              Bringing Krishna Consciousness to Every Home
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
              ISKM TV International is our global digital hub for spiritual education. Watch daily classes, kirtans, festivals, and temple broadcasts from ISKM centers around the world. Whether you’re in Montreal or anywhere else, you can stay connected with Krishna consciousness at all times.
            </p>

            <blockquote className="relative p-6 bg-muted/30 rounded-2xl border border-border/50 mb-10">
              <p className="text-xl font-serif italic text-foreground/90 mb-4">
                “This film, this television—use everything to broadcast Krishna consciousness.”
              </p>
              <footer className="text-sm font-medium text-muted-foreground">
                — Srila Prabhupāda, Morning Walk, Vrindavan, March 14, 1974
              </footer>
            </blockquote>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button size="lg" className="h-12 px-8 text-base gap-2 shadow-lg shadow-primary/20" asChild>
                <a href="https://www.youtube.com/@ISKM108" target="_blank" rel="noopener noreferrer">
                  <Play className="h-4 w-4 fill-current" />
                  Watch ISKM TV
                </a>
              </Button>
              <Button size="lg" variant="outline" className="h-12 px-8 text-base gap-2" asChild>
                <a href="https://www.youtube.com/@ISKM108?sub_confirmation=1" target="_blank" rel="noopener noreferrer">
                  <Youtube className="h-4 w-4" />
                  Subscribe on YouTube
                </a>
              </Button>
              <Button size="lg" variant="ghost" className="h-12 px-8 text-base gap-2" onClick={() => document.getElementById('timeline')?.scrollIntoView({ behavior: 'smooth' })}>
                <Clock className="h-4 w-4" />
                View Global Timeline
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Timeline Section */}
        <div id="timeline" className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Facebook Feed */}
          <motion.div 
            className="lg:col-span-7 flex flex-col gap-6"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <FacebookFeed />

            {/* Quote Card 1 */}
            <div className="p-6 rounded-xl bg-gradient-to-br from-amber-500/10 to-orange-500/5 border border-amber-500/20">
              <p className="font-serif italic text-lg mb-3 text-foreground/90">
                “Hearing about Krishna is the first step in spiritual life.”
              </p>
              <p className="text-xs font-bold uppercase tracking-wider text-amber-600/80">
                SB 1.2.17, Purport
              </p>
            </div>
          </motion.div>

          {/* Right Column: YouTube Feed */}
          <motion.div 
            className="lg:col-span-5 flex flex-col gap-6"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-red-500/10 text-red-600">
                <Youtube className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold">ISKM TV Feed</h3>
                <p className="text-sm text-muted-foreground">Daily Wisdom & Kirtans</p>
              </div>
            </div>

            <div className="relative flex h-[700px] w-full flex-row gap-4 items-start justify-center overflow-hidden rounded-xl border bg-card/30 shadow-sm p-4">
              {loading ? (
                <div className="flex gap-4 w-full h-full items-center justify-center p-4">
                  <div className="flex flex-col gap-4 w-full max-w-md">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <div key={i} className="w-full h-32 bg-muted rounded-xl animate-pulse" />
                    ))}
                  </div>
                </div>
              ) : (
                <>
                  <Marquee pauseOnHover vertical className="[--duration:40s] w-full h-full justify-start">
                    {videos.slice(0, Math.ceil(videos.length / 2)).map((video) => (
                      <a
                        key={video.guid}
                        href={video.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative flex flex-col gap-3 w-full p-4 cursor-pointer overflow-hidden rounded-xl border border-border/50 bg-background/80 hover:bg-muted/50 transition-all hover:border-primary/20 hover:shadow-md"
                      >
                        <div className="relative aspect-video w-full shrink-0 rounded-lg overflow-hidden bg-muted">
                          <img
                            src={video.thumbnail}
                            alt={video.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>
                        <div className="flex flex-col gap-2 min-w-0">
                          <h3 className="text-base font-semibold leading-tight line-clamp-2 group-hover:text-primary transition-colors">
                            {video.title}
                          </h3>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {formatDate(video.pubDate)}
                            </span>
                            <span className="flex items-center gap-1">
                              <Globe className="h-3 w-3" />
                              ISKM TV
                            </span>
                          </div>
                        </div>
                      </a>
                    ))}
                  </Marquee>
                  
                  <Marquee reverse pauseOnHover vertical className="[--duration:45s] w-full h-full justify-start">
                    {videos.slice(Math.ceil(videos.length / 2)).map((video) => (
                      <a
                        key={video.guid}
                        href={video.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative flex flex-col gap-3 w-full p-4 cursor-pointer overflow-hidden rounded-xl border border-border/50 bg-background/80 hover:bg-muted/50 transition-all hover:border-primary/20 hover:shadow-md"
                      >
                        <div className="relative aspect-video w-full shrink-0 rounded-lg overflow-hidden bg-muted">
                          <img
                            src={video.thumbnail}
                            alt={video.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>
                        <div className="flex flex-col gap-2 min-w-0">
                          <h3 className="text-base font-semibold leading-tight line-clamp-2 group-hover:text-primary transition-colors">
                            {video.title}
                          </h3>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {formatDate(video.pubDate)}
                            </span>
                            <span className="flex items-center gap-1">
                              <Globe className="h-3 w-3" />
                              ISKM TV
                            </span>
                          </div>
                        </div>
                      </a>
                    ))}
                  </Marquee>
                  
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-background to-transparent z-10"></div>
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent z-10"></div>
                </>
              )}
            </div>

            {/* Quote Card 2 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-6 rounded-xl bg-muted/50 border border-border/50">
                <p className="font-serif italic text-base mb-2 text-foreground/80">
                  “Broadcast this message everywhere.”
                </p>
                <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  Lecture on BG 9.31, London, 1973
                </p>
              </div>
              <div className="p-6 rounded-xl bg-muted/50 border border-border/50">
                <p className="font-serif italic text-base mb-2 text-foreground/80">
                  “Let everyone take advantage of this movement.”
                </p>
                <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  Lecture, New York, 1966
                </p>
              </div>
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  )
}
