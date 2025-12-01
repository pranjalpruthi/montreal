import { createFileRoute, useSearch } from '@tanstack/react-router'
import { getBlogPosts, type BlogPost } from '@/lib/blog'
import { BlogCard } from '@/components/blog-card'
import { useEffect, useState } from 'react'
import { FlickeringGrid } from '@/components/magicui/flickering-grid'
import { TagFilter } from '@/components/tag-filter'
import { z } from 'zod'

const blogSearchSchema = z.object({
  tag: z.string().optional(),
})

export const Route = createFileRoute('/blog/')({
  component: BlogIndex,
  validateSearch: blogSearchSchema,
})

function BlogIndex() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const search = useSearch({ from: '/blog/' })
  const selectedTag = search.tag || 'All'

  useEffect(() => {
    getBlogPosts().then((fetchedPosts) => {
      setPosts(fetchedPosts)
      setLoading(false)
    }).catch((err) => {
      console.error(err)
      setLoading(false)
    })
  }, [])

  const allTags = [
    "All",
    ...Array.from(
      new Set(posts.flatMap((post) => post.tags || []))
    ).sort(),
  ];

  const filteredPosts =
    selectedTag === "All"
      ? posts
      : posts.filter((post) => post.tags?.includes(selectedTag));

  const tagCounts = allTags.reduce((acc, tag) => {
    if (tag === "All") {
      acc[tag] = posts.length;
    } else {
      acc[tag] = posts.filter((post) =>
        post.tags?.includes(tag)
      ).length;
    }
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="min-h-screen bg-background relative">
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
      <div className="p-6 pt-24 border-b border-border flex flex-col gap-6 min-h-[400px] justify-center relative z-10">
        <div className="max-w-7xl mx-auto w-full">
          <div className="flex flex-col gap-2">
            <h1 className="font-medium text-4xl md:text-5xl tracking-tighter">
              Magic UI Blog
            </h1>
            <p className="text-muted-foreground text-sm md:text-base lg:text-lg">
              Latest news and updates from Magic UI.
            </p>
          </div>
        </div>
        {allTags.length > 0 && (
          <div className="max-w-7xl mx-auto w-full">
            <TagFilter
              tags={allTags}
              selectedTag={selectedTag}
              tagCounts={tagCounts}
            />
          </div>
        )}
      </div>

      <div className="max-w-7xl mx-auto w-full px-6 lg:px-0">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-12">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-[400px] rounded-xl bg-muted/50 animate-pulse" />
            ))}
          </div>
        ) : (
          <div
            className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 relative overflow-hidden border-x border-border ${
              filteredPosts.length < 4 ? "border-b" : "border-b-0"
            }`}
          >
            {filteredPosts.map((post) => (
              <BlogCard
                key={post.slug}
                url={`/blog/${post.slug}`}
                title={post.title}
                description={post.description}
                date={new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
                thumbnail={post.thumbnail}
                showRightBorder={filteredPosts.length < 3}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
