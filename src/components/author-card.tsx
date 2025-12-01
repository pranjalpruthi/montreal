import { type Author } from "@/lib/authors";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface AuthorCardProps {
  author: Author;
  className?: string;
}

export function AuthorCard({ author, className }: AuthorCardProps) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <Avatar className="h-10 w-10 border border-border">
        <AvatarImage src={author.avatar} alt={author.name} className="object-cover" />
        <AvatarFallback>{author.name.charAt(0)}</AvatarFallback>
      </Avatar>
      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-semibold tracking-tight text-foreground">
          {author.name}
        </h3>
        <p className="text-xs text-muted-foreground truncate">
          {author.position}
        </p>
      </div>
    </div>
  );
}
