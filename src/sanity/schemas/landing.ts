import { defineField, defineType } from "sanity";

// Reusable rich-text block — normal paragraphs only, bold + italic marks.
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
  name: "landing",
  title: "Landing Page",
  type: "document",
  groups: [
    { name: "hero",         title: "Hero",         default: true },
    { name: "problem",      title: "The Problem" },
    { name: "areas",        title: "Main Areas" },
    { name: "work",         title: "How I Work" },
    { name: "testimonials", title: "Testimonials" },
    { name: "seo",          title: "SEO" },
  ],
  fields: [
    // ── Hero ──────────────────────────────────────────────────────────────
    defineField({ name: "heroTitle",      title: "Title",          type: "string", group: "hero" }),
    defineField({ name: "heroDescription",title: "Description",    type: "array", of: richText, group: "hero" }),
    defineField({
      name: "heroLanguages",
      title: "Languages text",
      description: "e.g. «I work in Catalan, Spanish, English and French»",
      type: "string",
      group: "hero",
    }),
    defineField({ name: "heroCtaLabel", title: "CTA Label", type: "string", group: "hero" }),
    defineField({
      name: "heroImage",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Alt text", type: "string" })],
      group: "hero",
    }),

    // ── The Problem ───────────────────────────────────────────────────────
    defineField({ name: "problemTitle", title: "Title", type: "string", group: "problem" }),
    defineField({
      name: "problemBullets",
      title: "The Problem — bullet points",
      type: "array",
      of: [
        {
          type: "object",
          fields: [defineField({ name: "text", title: "Text", type: "string" })],
          preview: { select: { title: "text" } },
        },
      ],
      group: "problem",
    }),
    defineField({ name: "solutionText", title: "The Solution — text", type: "array", of: richText, group: "problem" }),

    // ── Main Areas ────────────────────────────────────────────────────────
    defineField({ name: "areasSubheader",   title: "Subheader",   type: "string",          group: "areas" }),
    defineField({ name: "areasDescription", title: "Description", type: "array", of: richText, group: "areas" }),
    defineField({
      name: "areas",
      title: "Areas",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "title",       title: "Title",        type: "string" }),
            defineField({ name: "description", title: "Description",  type: "array", of: richText }),
            defineField({
              name: "bulletPoints",
              title: "Bullet points",
              type: "array",
              of: [
                {
                  type: "object",
                  fields: [defineField({ name: "text", title: "Text", type: "string" })],
                  preview: { select: { title: "text" } },
                },
              ],
            }),
            defineField({ name: "subtext", title: "Subtext", type: "string" }),
          ],
          preview: { select: { title: "title" } },
        },
      ],
      group: "areas",
    }),

    // ── How I Work ────────────────────────────────────────────────────────
    defineField({ name: "workSubheader",    title: "Subheader",     type: "string",          group: "work" }),
    defineField({ name: "workTitle",        title: "Title",         type: "string",          group: "work" }),
    defineField({
      name: "workItems",
      title: "Items",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "text", title: "Text", type: "array", of: richText }),
          ],
          preview: { prepare: () => ({ title: "Step" }) },
        },
      ],
      group: "work",
    }),
    defineField({ name: "workMainSentence", title: "Main sentence", type: "array", of: richText, group: "work" }),

    // ── Testimonials ──────────────────────────────────────────────────────
    defineField({ name: "testimonialsDescription", title: "Section label", type: "string", group: "testimonials" }),
    defineField({
      name: "testimonials",
      title: "Testimonials",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "quote",  title: "Quote",      type: "array", of: richText }),
            defineField({ name: "person", title: "Person",     type: "string" }),
            defineField({ name: "job",    title: "Job / Role", type: "string" }),
          ],
          preview: { select: { title: "person", subtitle: "job" } },
        },
      ],
      group: "testimonials",
    }),

    // ── SEO ───────────────────────────────────────────────────────────────
    defineField({ name: "seoTitle",       title: "Meta Title",       type: "string", group: "seo" }),
    defineField({ name: "seoDescription", title: "Meta Description", type: "text", rows: 3, group: "seo" }),
    defineField({ name: "seoImage",       title: "OG Image",         type: "image", options: { hotspot: true }, group: "seo" }),
  ],
  preview: {
    prepare() {
      return { title: "Landing Page" };
    },
  },
});
