import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./src/sanity/schemas";

const languages = [
  { id: "en", title: "English" },
  { id: "ca", title: "Català" },
  { id: "es", title: "Español" },
  { id: "fr", title: "Français" },
];

const singletonTypes = new Set(["landing", "settings"]);

const isSingleton = (schemaType: string, documentId: string) =>
  languages.some(({ id }) => documentId === `${schemaType}-${id}`);

export default defineConfig({
  name: "pau-simo",
  title: "Pau Simó",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            // Settings singletons
            S.listItem()
              .title("Settings")
              .child(
                S.list()
                  .title("Language")
                  .items(
                    languages.map(({ id, title }) =>
                      S.listItem()
                        .title(title)
                        .id(`settings-${id}`)
                        .child(
                          S.document()
                            .title(`Settings — ${title}`)
                            .schemaType("settings")
                            .documentId(`settings-${id}`)
                        )
                    )
                  )
              ),

            S.divider(),

            // Landing Page singletons
            S.listItem()
              .title("Landing Page")
              .child(
                S.list()
                  .title("Language")
                  .items(
                    languages.map(({ id, title }) =>
                      S.listItem()
                        .title(title)
                        .id(`landing-${id}`)
                        .child(
                          S.document()
                            .title(`Landing Page — ${title}`)
                            .schemaType("landing")
                            .documentId(`landing-${id}`)
                        )
                    )
                  )
              ),

            S.divider(),

            // Case Studies per language
            S.listItem()
              .title("Case Studies")
              .child(
                S.list()
                  .title("Language")
                  .items(
                    languages.map(({ id, title }) =>
                      S.listItem()
                        .title(title)
                        .child(
                          S.documentTypeList("caseStudy")
                            .title(`Case Studies — ${title}`)
                            .filter('_type == "caseStudy" && language == $language')
                            .params({ language: id })
                        )
                    )
                  )
              ),
          ]),
    }),
    visionTool(),
  ],
  schema: {
    types: schemaTypes,
  },
  document: {
    actions: (prev, { schemaType, documentId }) => {
      if (singletonTypes.has(schemaType) && isSingleton(schemaType, documentId ?? "")) {
        return prev.filter(({ action }) => action !== "delete" && action !== "duplicate");
      }
      return prev;
    },
  },
});
