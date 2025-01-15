import { defineConfig, LocalAuthProvider } from "tinacms"
import {
  TinaUserCollection,
  UsernamePasswordAuthJSProvider,
} from "tinacms-authjs/dist/tinacms"

// Your hosting provider likely exposes this as an environment variable
const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main"

const isLocal = process.env.TINA_PUBLIC_IS_LOCAL === "true"

export default defineConfig({
  branch,
  // This is the url to your graphql endpoint
  contentApiUrlOverride: "/api/tina/gql",

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "media",
      publicFolder: "public",
    },
  },
  // When isLocal is true, the CMS will not require authentication
  authProvider: isLocal
    ? new LocalAuthProvider()
    : new UsernamePasswordAuthJSProvider(),
  // See docs on content modeling for more info on how to setup new content models: https://tina.io/docs/schema/
  schema: {
    collections: [
      { ...TinaUserCollection, path: "src/content/users" },
      {
        name: "articles",
        label: "Articles",
        path: "src/content/articles",
        ui: {
          filename: {
            showFirst: true,
          },
        },
        defaultItem: () => {
          return {
            author: "Vaibhav Sharma",
          }
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "datetime",
            name: "published",
            label: "Published",
            required: true,
          },
          {
            type: "string",
            name: "author",
            label: "Author",
            required: true,
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
        ],
      },
    ],
  },
})
