
import { z } from 'zod';

const blogPostSchema = z.object({
  title: z.string(),
  description: z.string(),
  date: z.string(),
  author: z.string().optional(),
  thumbnail: z.string().optional(),
  tags: z.array(z.string()).optional(),
  featured: z.boolean().optional(),
});

export type BlogPost = z.infer<typeof blogPostSchema> & {
  slug: string;
  content: string;
};

export async function getBlogPosts(): Promise<BlogPost[]> {
  const modules = import.meta.glob('/src/content/blog/*.mdx', { eager: true });
  
  const posts = Object.entries(modules).map(([path, mod]: [string, any]) => {
    const slug = path.split('/').pop()?.replace('.mdx', '') || '';
    const frontmatter = mod.frontmatter || {};
    
    return {
      slug,
      content: '', // Content is handled by the component import in the route
      ...blogPostSchema.parse(frontmatter),
    };
  });

  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getBlogPost(slug: string): Promise<BlogPost | undefined> {
  const posts = await getBlogPosts();
  return posts.find((post) => post.slug === slug);
}
