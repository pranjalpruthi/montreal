export interface Author {
  name: string;
  position: string;
  avatar: string;
}

export type AuthorKey = string;

export async function getAuthors(): Promise<Record<string, Author>> {
  const modules = import.meta.glob('/src/content/authors/*.json', { eager: true });
  const authors: Record<string, Author> = {};

  for (const path in modules) {
    const slug = path.split('/').pop()?.replace('.json', '') || '';
    const authorData = (modules[path] as any).default || modules[path];
    authors[slug] = authorData as Author;
  }

  return authors;
}

export async function getAuthor(key: AuthorKey): Promise<Author | undefined> {
  const authors = await getAuthors();
  return authors[key];
}

export async function isValidAuthor(key: string): Promise<boolean> {
  const authors = await getAuthors();
  return key in authors;
}
