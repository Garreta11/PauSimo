import { PortableText as SanityPortableText } from "next-sanity";
import type { PortableTextBlock } from "next-sanity";

export function PortableText({ value }: { value: PortableTextBlock[] }) {
  return (
    <SanityPortableText
      value={value}
      components={{
        block: {
          normal: ({ children }) => (
            <p className="font-mono text-base text-muted-foreground leading-relaxed mb-6">{children}</p>
          ),
          h2: ({ children }) => (
            <h2 className="font-serif text-2xl font-bold mt-12 mb-4">{children}</h2>
          ),
          h3: ({ children }) => (
            <h3 className="font-serif text-xl font-bold mt-10 mb-3">{children}</h3>
          ),
          blockquote: ({ children }) => (
            <blockquote className="font-serif text-xl border-l-2 border-foreground pl-6 my-8 text-foreground">
              {children}
            </blockquote>
          ),
        },
        list: {
          bullet: ({ children }) => (
            <ul className="font-mono text-base text-muted-foreground space-y-2 mb-6 ml-4">{children}</ul>
          ),
          number: ({ children }) => (
            <ol className="font-mono text-base text-muted-foreground space-y-2 mb-6 ml-4 list-decimal">{children}</ol>
          ),
        },
        listItem: {
          bullet: ({ children }) => (
            <li className="flex gap-3 items-start">
              <span className="mt-2 w-1 h-1 rounded-full bg-muted-foreground shrink-0" />
              {children}
            </li>
          ),
        },
        marks: {
          strong: ({ children }) => <strong className="font-bold text-foreground">{children}</strong>,
          em: ({ children }) => <em className="italic">{children}</em>,
        },
      }}
    />
  );
}
