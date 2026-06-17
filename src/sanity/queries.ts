import { groq } from "next-sanity";

export const settingsQuery = groq`*[_type == "settings" && _id == $documentId][0]{
  logo,
  siteName,
  navLabels{
    problem,
    areas,
    howIWork,
    work,
    testimonials
  },
  contactSubtitle,
  contactTitle,
  contactDescription,
  contactEmail,
  linkedinUrl,
  footerNote
}`;

export const landingQuery = groq`*[_type == "landing" && _id == $documentId][0]{
  heroTitle,
  heroDescription,
  heroLanguages,
  heroCtaLabel,
  heroImage,
  problemTitle,
  problemBullets,
  solutionText,
  areasSubheader,
  areasDescription,
  areas[]{
    title,
    description,
    bulletPoints,
    subtext
  },
  workSubheader,
  workTitle,
  workItems,
  workMainSentence,
  testimonialsDescription,
  testimonials[]{
    quote,
    person,
    job
  },
  seoTitle,
  seoDescription,
  seoImage
}`;

export const caseStudiesQuery = groq`*[_type == "caseStudy" && language == $language] | order(order asc){
  _id,
  title,
  slug,
  client,
  category,
  year,
  description,
  coverImage,
  tags
}`;

export const caseStudyBySlugQuery = groq`*[_type == "caseStudy" && slug.current == $slug && language == $language][0]{
  _id,
  title,
  slug,
  client,
  category,
  year,
  description,
  context,
  intervention,
  criterion,
  result,
  coverImage,
  tags
}`;
