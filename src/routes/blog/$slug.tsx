import { createFileRoute, Link } from '@tanstack/react-router'
import { getBlogPosts, type BlogPost } from '@/lib/blog'
import { useMDXComponents } from '@/components/mdx-components'
import { MDXProvider } from '@mdx-js/react'
import { useEffect, useState } from 'react'
import { AuthorCard } from '@/components/author-card'
import { getAuthor } from '@/lib/authors'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { FlickeringGrid } from '@/components/magicui/flickering-grid'
import { HashScrollHandler } from '@/components/hash-scroll-handler'
import { TableOfContents } from '@/components/table-of-contents'
import { MobileTableOfContents } from '@/components/mobile-toc'
import { PromoContent } from '@/components/promo-content'
import { ReadMoreSection } from '@/components/read-more-section'

export const Route = createFileRoute('/blog/$slug')({
  component: BlogPostPage,
  loader: async ({ params }) => {
    const posts = await getBlogPosts()
    const post = posts.find((p) => p.slug === params.slug)
    if (!post) {
      throw new Error('Post not found')
    }
    const author = post.author ? await getAuthor(post.author) : null
    return { post, posts, author }
  },
})

function BlogPostPage() {
  const { post, posts, author } = Route.useLoaderData()
  const [MDXContent, setMDXContent] = useState<any>(null)

  useEffect(() => {
    const loadContent = async () => {
      const modules = import.meta.glob('/src/content/blog/en/*.mdx')
      const path = `/src/content/blog/en/${post.slug}.mdx`
      
      if (modules[path]) {
        const mod: any = await modules[path]()
        setMDXContent(() => mod.default)
      }
    }
    loadContent()
  }, [post.slug])

  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <div className="min-h-screen bg-background relative">
      <HashScrollHandler />
      <div className="absolute top-0 left-0 z-0 w-full h-[400px] [mask-image:linear-gradient(to_top,transparent_30%,black_100%)]">
        <FlickeringGrid
          className="absolute top-0 left-0 size-full"
          squareSize={4}
          gridGap={6}
          color="#6B7280"
          maxOpacity={0.2}
          flickerChance={0.05}
        />
      </div>

      <div className="space-y-4 border-b border-border relative z-10 pt-24">
        <div className="max-w-7xl mx-auto flex flex-col gap-6 p-6">
          <div className="flex flex-wrap items-center gap-3 gap-y-5 text-sm text-muted-foreground">
            <Button variant="outline" asChild className="h-6 w-6">
              <Link to="/blog">
                <ArrowLeft className="w-4 h-4" />
                <span className="sr-only">Back to all articles</span>
              </Link>
            </Button>
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-3 text-muted-foreground">
                {post.tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="h-6 w-fit px-3 text-sm font-medium bg-muted text-muted-foreground rounded-md border flex items-center justify-center"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
            <time className="font-medium text-muted-foreground">
              {formattedDate}
            </time>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tighter text-balance">
            {post.title}
          </h1>

          {post.description && (
            <p className="text-muted-foreground max-w-4xl md:text-lg md:text-balance">
              {post.description}
            </p>
          )}
        </div>
      </div>
      <div className="flex divide-x divide-border relative max-w-7xl mx-auto px-4 md:px-0 z-10">
        <div className="absolute max-w-7xl mx-auto left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] lg:w-full h-full border-x border-border p-0 pointer-events-none" />
        <main className="w-full p-0 overflow-hidden">
          {post.thumbnail && (
            <div className="relative w-full h-[500px] overflow-hidden object-cover border border-transparent">
              <img
                src={post.thumbnail}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <div className="p-6 lg:p-10">
            <div className="prose dark:prose-invert max-w-none prose-headings:scroll-mt-8 prose-headings:font-semibold prose-a:no-underline prose-headings:tracking-tight prose-headings:text-balance prose-p:tracking-tight prose-p:text-balance prose-lg prose-pre:p-4 prose-pre:rounded-lg">
              {MDXContent && (
                <MDXProvider components={useMDXComponents({})}>
                  <MDXContent />
                </MDXProvider>
              )}
            </div>
          </div>
          <div className="mt-10">
            <ReadMoreSection
              currentSlug={post.slug}
              currentTags={post.tags}
              posts={posts}
            />
          </div>
        </main>

        <aside className="hidden lg:block w-[350px] flex-shrink-0 p-6 lg:p-10 bg-muted/60 dark:bg-muted/20">
          <div className="sticky top-24 space-y-8">
            {author && (
              <AuthorCard author={author} />
            )}
            <div className="border border-border rounded-lg p-6 bg-card">
              <TableOfContents />
            </div>
            <PromoContent variant="desktop" />
          </div>
        </aside>
      </div>

      <MobileTableOfContents />
    </div>
  )
}
