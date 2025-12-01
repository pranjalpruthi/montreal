"use client";

import * as React from "react";
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from "@/components/ui/command";
import { Search } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { getBlogPosts, type BlogPost } from "@/lib/blog";

export function CommandMenu() {
  const [open, setOpen] = React.useState(false);
  const [posts, setPosts] = React.useState<BlogPost[]>([]);
  const navigate = useNavigate();

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    
    // Fetch posts when component mounts
    getBlogPosts().then(setPosts);

    return () => document.removeEventListener("keydown", down);
  }, []);

  // Expose a global function to open the menu
  React.useEffect(() => {
    (window as any).openCommandMenu = () => setOpen(true);
    return () => {
      delete (window as any).openCommandMenu;
    };
  }, []);

  const runCommand = React.useCallback((command: () => unknown) => {
    setOpen(false);
    command();
  }, []);

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Blog Posts">
          {posts.map((post) => (
            <CommandItem
              key={post.slug}
              value={post.title}
              onSelect={() => {
                runCommand(() => navigate({ to: `/blog/${post.slug}` }));
              }}
            >
              <Search className="mr-2 h-4 w-4" />
              <span>{post.title}</span>
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Navigation">
          <CommandItem
            onSelect={() => {
              runCommand(() => navigate({ to: "/" }));
            }}
          >
            <Search className="mr-2 h-4 w-4" />
            <span>Home</span>
          </CommandItem>
          <CommandItem
            onSelect={() => {
              runCommand(() => navigate({ to: "/blog" }));
            }}
          >
            <Search className="mr-2 h-4 w-4" />
            <span>Blog</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
