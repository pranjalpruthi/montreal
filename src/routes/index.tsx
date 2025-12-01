import { createFileRoute } from '@tanstack/react-router'
import { Hero } from '@/components/homepage/Hero'
import { FeaturedSection } from '@/components/homepage/featured-section'
import { FeaturedBooksSection } from '@/components/homepage/featured-books-section'
import { About } from '@/components/homepage/About'
import { Programs } from '@/components/homepage/Programs'
import { Resources } from '@/components/homepage/Resources'


export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  return (
    <>
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-background focus:text-foreground">
        Skip to main content
      </a>
      <Hero />
      <FeaturedSection />
      <FeaturedBooksSection />
      <About />
      <Programs />
      <Resources />
    </>
  )
}
