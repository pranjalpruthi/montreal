import { createFileRoute } from '@tanstack/react-router'
import { Hero } from '@/components/homepage/Hero'
import { About } from '@/components/homepage/About'
import { Programs } from '@/components/homepage/Programs'
import { Resources } from '@/components/homepage/Resources'
import { Community } from '@/components/homepage/Community'
import { FeaturedSection } from '@/components/homepage/featured-section'
import { FeaturedBooksSection } from '@/components/homepage/featured-books-section'

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
      <FeaturedSection />
      <FeaturedBooksSection />
      <About />
      <Programs />
      <Resources />
      <Community />
    </>
  )
}
