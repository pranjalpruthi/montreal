import { createFileRoute, Link } from '@tanstack/react-router'
import { getBlogPosts, getBlogPost, type BlogPost } from '@/lib/blog'
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
import { ToggleGroup, ToggleGroupItem } from '@/components/animate-ui/radix/toggle-group'

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
  const { post: initialPost, posts, author } = Route.useLoaderData()
  const [post, setPost] = useState<BlogPost>(initialPost)
  const [MDXContent, setMDXContent] = useState<any>(null)
  const [language, setLanguage] = useState<'en' | 'fr'>('en')

  useEffect(() => {
    const loadContent = async () => {
      // Fetch the post for the selected language
      const fetchedPost = await getBlogPost(initialPost.slug, language)
      if (fetchedPost) {
        setPost(fetchedPost)
        
        const modules = import.meta.glob('/src/content/blog/**/*.mdx')
        const path = `/src/content/blog/${language}/${initialPost.slug}.mdx`
        
        if (modules[path]) {
          const mod: any = await modules[path]()
          setMDXContent(() => mod.default)
        } else {
            setMDXContent(null)
        }
      } else {
          setMDXContent(null)
      }
    }
    loadContent()
  }, [initialPost.slug, language])

  const formattedDate = new Date(post.date).toLocaleDateString(language === 'fr' ? 'fr-CA' : 'en-US', {
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
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
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
            <ToggleGroup
              type="single"
              value={language}
              onValueChange={(v) => { if (v) setLanguage(v as 'en' | 'fr') }}
              className="bg-muted/50 border border-border rounded-lg p-1"
            >
              <ToggleGroupItem
                value="en"
                className="px-3 py-1.5 text-sm text-muted-foreground data-[state=on]:bg-primary data-[state=on]:text-primary-foreground data-[state=on]:shadow-md hover:bg-muted transition-all duration-300"
              >
                English
              </ToggleGroupItem>
              <ToggleGroupItem
                value="fr"
                className="px-3 py-1.5 text-sm text-muted-foreground data-[state=on]:bg-primary data-[state=on]:text-primary-foreground data-[state=on]:shadow-md hover:bg-muted transition-all duration-300"
              >
                Français
              </ToggleGroupItem>
            </ToggleGroup>
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
            <div className="relative w-full h-[500px] overflow-hidden bg-muted/20 border-b border-border">
              {/* Blurred background for ambient effect */}
              <div 
                className="absolute inset-0 w-full h-full bg-cover bg-center blur-xl scale-110 opacity-50 dark:opacity-40"
                style={{ backgroundImage: `url("${post.thumbnail}")` }}
              />
              
              {/* Main contained image */}
              <img
                src={post.thumbnail}
                alt={post.title}
                className="relative z-10 w-full h-full object-contain"
              />
            </div>
          )}
          <div className="p-6 lg:p-10">
            <div className="prose dark:prose-invert max-w-none prose-headings:scroll-mt-8 prose-headings:font-semibold prose-a:no-underline prose-headings:tracking-tight prose-headings:text-balance prose-p:tracking-tight prose-p:text-balance prose-lg prose-pre:p-4 prose-pre:rounded-lg">
              {MDXContent ? (
                <MDXProvider components={useMDXComponents({})}>
                  <MDXContent />
                </MDXProvider>
              ) : (
                <div className="py-12 text-center text-muted-foreground">
                  This post is not available in {language === 'fr' ? 'French' : 'English'} yet.
                </div>
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

      <MobileTableOfContents language={language} setLanguage={setLanguage} />
    </div>
  )
}
