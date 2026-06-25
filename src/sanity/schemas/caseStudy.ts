import { defineField, defineType } from "sanity";

const richText = [
  {
    type: "block",
    styles: [{ title: "Normal", value: "normal" }],
    lists: [],
    marks: {
      decorators: [
        { title: "Bold",   value: "strong" },
        { title: "Italic", value: "em" },
      ],
      annotations: [],
    },
  },
];

export default defineType({
  name: "caseStudy",
  title: "Case Study",
  type: "document",
  groups: [
    { name: "meta", title: "Meta", default: true },
    { name: "content", title: "Content" },
    { name: "media", title: "Media & Tags" },
  ],
  fields: [
    // ── Meta ──────────────────────────────────────────────────────────────
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
      group: "meta",
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
        isUnique: async (slug, { document, getClient }) => {
          const client = getClient({ apiVersion: "2024-01-01" });
          const id = (document._id ?? "").replace(/^drafts\./, "");
          return client.fetch(
            `!defined(*[
              !(_id in [$draft, $published]) &&
              _type == "caseStudy" &&
              slug.current == $slug &&
              language == $language
            ][0]._id)`,
            {
              draft: `drafts.${id}`,
              published: id,
              slug,
              language: document.language,
            }
          );
        },
      },
      validation: (Rule) => Rule.required(),
      group: "meta",
    }),
    defineField({
      name: "client",
      title: "Client",
      type: "string",
      group: "meta",
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      group: "meta",
    }),
    defineField({
      name: "year",
      title: "Year",
      type: "string",
      group: "meta",
    }),
    defineField({
      name: "language",
      title: "Language",
      type: "string",
      options: {
        list: [
          { title: "English", value: "en" },
          { title: "Català", value: "ca" },
          { title: "Español", value: "es" },
          { title: "Français", value: "fr" },
        ],
      },
      validation: (Rule) => Rule.required(),
      group: "meta",
    }),
    defineField({
      name: "order",
      title: "Order",
      type: "number",
      group: "meta",
    }),

    // ── Content ───────────────────────────────────────────────────────────
    defineField({
      name: "description",
      title: "Description",
      description: "Short intro shown on the card and at the top of the case study.",
      type: "text",
      rows: 3,
      group: "content",
    }),
    defineField({
      name: "context",
      title: "Context",
      description: "Background and situation before the work began. Supports bold and italic.",
      type: "array",
      of: richText,
      group: "content",
    }),
    defineField({
      name: "intervention",
      title: "Intervention",
      description: "What was done — the translation/consulting work performed. Supports bold and italic.",
      type: "array",
      of: richText,
      group: "content",
    }),
    defineField({
      name: "criterion",
      title: "Criterion",
      description: "The standards, approach or methodology applied. Supports bold and italic.",
      type: "array",
      of: richText,
      group: "content",
    }),
    defineField({
      name: "result",
      title: "Result",
      description: "The outcome and impact of the work. Supports bold and italic.",
      type: "array",
      of: richText,
      group: "content",
    }),

    // ── Media & Tags ──────────────────────────────────────────────────────
    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({ name: "alt", title: "Alt Text", type: "string" }),
      ],
      group: "media",
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
      group: "media",
    }),
  ],
  orderings: [
    {
      title: "Manual Order",
      name: "manualOrder",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      client: "client",
      media: "coverImage",
    },
    prepare({ title, client, media }) {
      return { title, subtitle: client, media };
    },
  },
});
