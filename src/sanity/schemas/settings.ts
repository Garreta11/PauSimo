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
  name: "settings",
  title: "Settings",
  type: "document",
  groups: [
    { name: "header", title: "Header", default: true },
    { name: "footer", title: "Footer" },
  ],
  fields: [
    // ── Header ────────────────────────────────────────────────────────────
    defineField({
      name: "logo",
      title: "Logo",
      description: "Upload a logo image. If empty, the «PS» monogram is shown instead.",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({ name: "alt", title: "Alt text", type: "string" }),
      ],
      group: "header",
    }),
    defineField({
      name: "siteName",
      title: "Site name",
      description: "Displayed next to the logo in the header (e.g. «Pau Simó Parés»).",
      type: "string",
      group: "header",
    }),
    defineField({
      name: "navLabels",
      title: "Navigation labels",
      type: "object",
      group: "header",
      fields: [
        defineField({ name: "problem",      title: "The Problem",  type: "string" }),
        defineField({ name: "areas",        title: "Areas",        type: "string" }),
        defineField({ name: "howIWork",     title: "How I Work",   type: "string" }),
        defineField({ name: "work",         title: "Work",         type: "string" }),
        defineField({ name: "testimonials", title: "Testimonials", type: "string" }),
      ],
    }),

    // ── Footer / Contact ──────────────────────────────────────────────────
    defineField({
      name: "contactSubtitle",
      title: "Contact subtitle",
      description: "Small label above the title (e.g. «Let's work together»).",
      type: "string",
      group: "footer",
    }),
    defineField({
      name: "contactTitle",
      title: "Contact title",
      description: "Main heading of the footer (e.g. «Ready to reach new audiences?»).",
      type: "string",
      group: "footer",
    }),
    defineField({
      name: "contactDescription",
      title: "Contact description",
      description: "Short paragraph below the title. Supports bold and italic.",
      type: "array",
      of: richText,
      group: "footer",
    }),
    defineField({
      name: "contactEmail",
      title: "Contact email",
      type: "string",
      group: "footer",
    }),
    defineField({
      name: "linkedinUrl",
      title: "LinkedIn URL",
      type: "url",
      group: "footer",
    }),
    defineField({
      name: "footerNote",
      title: "Footer note",
      description: "Copyright / bottom line (e.g. «All rights reserved»).",
      type: "string",
      group: "footer",
    }),
  ],
  preview: {
    prepare() {
      return { title: "Settings" };
    },
  },
});
