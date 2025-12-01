/* eslint-disable @next/next/no-img-element */
import { Link } from "@tanstack/react-router";
import type { BlogPost } from "@/lib/blog";

const formatDate = (date: Date): string => {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

interface ReadMoreSectionProps {
  currentSlug: string;
  currentTags?: string[];
  posts: BlogPost[];
}

export function ReadMoreSection({
  currentSlug,
  currentTags = [],
  posts,
}: ReadMoreSectionProps) {
  const currentUrl = `/blog/${currentSlug}`;

  const otherPosts = posts
    .filter((post) => `/blog/${post.slug}` !== currentUrl)
    .map((post) => {
      const tagOverlap = currentTags.filter((tag) =>
        post.tags?.includes(tag)
      ).length;

      return {
        ...post,
        relevanceScore: tagOverlap,
        dateObj: new Date(post.date),
      };
    })
    .sort((a, b) => {
      if (a.relevanceScore !== b.relevanceScore) {
        return b.relevanceScore - a.relevanceScore;
      }
      return b.dateObj.getTime() - a.dateObj.getTime();
    })
    .slice(0, 3);

  if (otherPosts.length === 0) {
    return null;
  }

  return (
    <section className="border-t border-border p-0">
      <div className="p-6 lg:p-10">
        <h2 className="text-2xl font-medium mb-8">Read more</h2>

        <div className="flex flex-col gap-8">
          {otherPosts.map((post) => {
            const formattedDate = formatDate(post.dateObj);

            return (
              <Link
                key={post.slug}
                to={`/blog/${post.slug}`}
                className="group grid grid-cols-1 lg:grid-cols-12 items-center gap-4 cursor-pointer"
              >
                {post.thumbnail && (
                  <div className="flex-shrink-0 col-span-1 lg:col-span-4">
                    <div className="relative w-full h-full">
                      <img
                        src={post.thumbnail}
                        alt={post.title}
                        className="w-full h-full object-cover rounded-lg group-hover:opacity-80 transition-opacity"
                      />
                    </div>
                  </div>
                )}
                <div className="space-y-2 flex-1 col-span-1 lg:col-span-8">
                  <h3 className="text-lg group-hover:underline underline-offset-4 font-semibold text-card-foreground group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-muted-foreground text-sm line-clamp-3 group-hover:underline underline-offset-4">
                    {post.description}
                  </p>
                  <time className="block text-xs font-medium text-muted-foreground">
                    {formattedDate}
                  </time>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
