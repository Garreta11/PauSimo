import { PortableText } from "next-sanity";
import type { PortableTextBlock } from "next-sanity";

interface RichTextProps {
  value: PortableTextBlock[];
  // Class applied to every <p> block
  paragraphClass?: string;
}

export function RichText({ value, paragraphClass }: RichTextProps) {
  return (
    <PortableText
      value={value}
      components={{
        block: {
          normal: ({ children }) => (
            <p className={paragraphClass}>{children}</p>
          ),
        },
        marks: {
          strong: ({ children }) => (
            <strong className="font-bold">{children}</strong>
          ),
          em: ({ children }) => (
            <em className="italic">{children}</em>
          ),
        },
      }}
    />
  );
}
