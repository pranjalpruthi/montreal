import { Quote } from "lucide-react";

interface BlockQuoteProps {
  quote: string;
  author: string;
}

export function BlockQuote({ quote, author }: BlockQuoteProps) {
  return (
    <blockquote className="rounded-xl border-amber-500/70 border-l-4 bg-amber-500/15 px-4 py-3 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400 my-8 mx-auto max-w-3xl shadow-sm">
      <p className="inline italic text-lg leading-relaxed">
        <Quote
          aria-hidden="true"
          className="-translate-y-1 mr-2 inline size-4 fill-amber-700 stroke-none opacity-80"
        />
        {quote}
        <Quote
          aria-hidden="true"
          className="ml-2 inline size-4 translate-y-1 fill-amber-700 stroke-none opacity-80"
        />
      </p>
      <p className="mt-2 text-end font-semibold text-sm italic tracking-wide opacity-90">
        — {author}
      </p>
    </blockquote>
  );
}
