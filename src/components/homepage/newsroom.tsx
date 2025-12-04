import { useEffect, useState } from 'react'
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { AnimatedGradientText } from "@/components/ui/animated-gradient-text"
import { ChevronRight, ChevronLeft } from "lucide-react"
import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { getBlogPosts, type BlogPost } from '@/lib/blog'
import { Link } from '@tanstack/react-router'

const gradients = [
  "from-purple-500 to-pink-500",
  "from-blue-500 to-cyan-500",
  "from-green-500 to-emerald-500",
  "from-orange-500 to-red-500",
  "from-indigo-500 to-purple-500",
  "from-teal-500 to-blue-500",
  "from-pink-500 to-rose-500",
]

export function NewsroomUpdates() {
  const [newsPosts, setNewsPosts] = useState<BlogPost[]>([])
  const [eventPosts, setEventPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const posts = await getBlogPosts('en') // Default to English for homepage
        
        const events = posts.filter(post => post.tags?.some(tag => tag.toLowerCase() === 'event'))
        const news = posts.filter(post => post.tags?.some(tag => tag.toLowerCase() === 'news'))

        setEventPosts(events)
        setNewsPosts(news)
      } catch (error) {
        console.error("Failed to fetch blog posts:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  if (loading) {
    return <div className="w-full max-w-7xl mx-auto px-4 py-12 text-center">Loading updates...</div>
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-12">
      <div className="flex justify-center mb-8">
        <div className="group relative inline-block rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 p-[1px] shadow-lg">
          <div className="relative flex h-full w-full items-center justify-center rounded-full bg-white/90 dark:bg-black/90 px-6 py-2 backdrop-blur-xl transition-all hover:bg-white/80 dark:hover:bg-black/80">
            <span className="mr-2 text-xl">📰</span>
            <div className="mx-2 h-5 w-px bg-black/20 dark:bg-white/20" />
            <AnimatedGradientText className="text-xl font-bold">
              Newsroom Updates
            </AnimatedGradientText>
            <ChevronRight className="ml-1 size-5 text-gray-400 transition-transform duration-300 group-hover:translate-x-0.5" />
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/2">
          <Accordion type="single" collapsible className="w-full">
            {newsPosts.map((post) => (
              <AccordionItem key={post.slug} value={post.slug}>
                <AccordionTrigger className="text-left">
                  <span className="flex items-center">
                    📰 <span className="mx-2 text-gray-400">|</span> {post.title}
                    {post.tags && post.tags.length > 0 && (
                        <Badge variant="outline" className="ml-2">
                        {post.tags[0]}
                        </Badge>
                    )}
                  </span>
                </AccordionTrigger>
                <AccordionContent>
                  <p className="mb-4">{post.description}</p>
                  <div className="flex justify-between items-center">
                    <Button variant="outline" asChild>
                        <Link to="/blog/$slug" params={{ slug: post.slug }}>Read More</Link>
                    </Button>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="ghost">Share</Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-80">
                        <div className="grid gap-4">
                          <h4 className="font-medium leading-none">Share this update</h4>
                          <div className="grid grid-cols-2 gap-2">
                            <Button variant="outline">Facebook</Button>
                            <Button variant="outline">Twitter</Button>
                            <Button variant="outline">WhatsApp</Button>
                            <Button variant="outline">Email</Button>
                          </div>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
            {newsPosts.length === 0 && (
                <div className="text-center text-muted-foreground p-4">No news updates at the moment.</div>
            )}
          </Accordion>
        </div>
        <div className="w-full md:w-1/2">
          <Carousel className="w-full">
            <div className="flex justify-between items-center mb-4">
              <div className="flex space-x-2">
                <CarouselPrevious className="relative inset-0 translate-x-0 translate-y-0 h-8 w-8 dark:bg-none text-gray-700 dark:text-gray-300">
                  <ChevronLeft className="h-4 w-4" />
                </CarouselPrevious>
                <CarouselNext className="relative inset-0 translate-x-0 translate-y-0 h-8 w-8 dark:bg-none text-gray-700 dark:text-gray-300">
                  <ChevronRight className="h-4 w-4" />
                </CarouselNext>
              </div>
            </div>
            <CarouselContent className="cursor-grab active:cursor-grabbing">
              {eventPosts.map((post, index) => (
                <CarouselItem key={post.slug} className="sm:basis-1/2 md:basis-1/2 lg:basis-1/3 pl-4">
                    <Link to="/blog/$slug" params={{ slug: post.slug }} className="block h-full">
                        <Card className={cn(
                            "overflow-hidden rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 h-64 border-0 text-white p-0 bg-gradient-to-br",
                            gradients[index % gradients.length]
                        )}>
                            <CardContent className="p-6 flex flex-col justify-between h-full">
                            <div>
                                <Badge variant="secondary" className="mb-2 text-xs">
                                {post.tags?.find(t => t !== 'event') || 'Event'}
                                </Badge>
                                <h3 className="text-lg font-semibold line-clamp-2 mb-2">{post.title}</h3>
                                <p className="text-sm line-clamp-3">{post.description}</p>
                            </div>
                            <Badge variant="outline" className="self-start mt-4 text-xs bg-white/10 text-white border-white/20">
                                {new Date(post.date).toLocaleDateString()}
                            </Badge>
                            </CardContent>
                        </Card>
                    </Link>
                </CarouselItem>
              ))}
               {eventPosts.length === 0 && (
                <CarouselItem className="basis-full">
                    <div className="text-center text-muted-foreground p-4">No upcoming events.</div>
                </CarouselItem>
            )}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </div>
  )
}
