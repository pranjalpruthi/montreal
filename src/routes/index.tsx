import { createFileRoute } from '@tanstack/react-router'
import { Hero } from '@/components/homepage/Hero'
import { About } from '@/components/homepage/About'
import { Programs } from '@/components/homepage/Programs'
import { Resources } from '@/components/homepage/Resources'
import { Community } from '@/components/homepage/Community'
import { BlockQuote } from '@/components/ui/block-quote'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  return (
    <>
      {/* Skip to main content link for keyboard users */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md focus:shadow-lg"
      >
        Skip to main content
      </a>

      <Hero />
      
      <div className="container mx-auto px-4">
        <BlockQuote 
          quote="A Krishna temple is a spiritual school where anyone can come, take darshan, and learn the science of God." 
          author="Srila Prabhupada" 
        />
      </div>

      <About />

      <div className="container mx-auto px-4">
        <BlockQuote 
          quote="In the noisy heart of the city, the temple stands as an oasis of peace and spiritual wisdom." 
          author="Srila Prabhupada" 
        />
      </div>

      <Programs />

      <div className="container mx-auto px-4">
        <BlockQuote 
          quote="By stepping into the temple, we step out of anxiety and into Krishna’s protective shelter." 
          author="Srila Prabhupada" 
        />
      </div>

      <Resources />

      <div className="container mx-auto px-4">
        <BlockQuote 
          quote="Temple worship purifies our work, wealth, and relationships by reconnecting everything with Krishna." 
          author="Srila Prabhupada" 
        />
      </div>

      <Community />
    </>
  )
}
