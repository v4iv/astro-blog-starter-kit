import rss from "@astrojs/rss"
import type { APIRoute } from "astro"
import { getCollection } from "astro:content"
import sanitizeHtml from "sanitize-html"
import MarkdownIt from "markdown-it"

import { SITE_DESCRIPTION, SITE_TITLE } from "@/lib/constants"

const parser = new MarkdownIt()

export const GET: APIRoute = async (context) => {
  const siteUrl = context.site ?? new URL(import.meta.env.SITE)

  const articles = (await getCollection("articles")).sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
  )
  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: siteUrl,
    trailingSlash: false,
    items: articles.map((article) => ({
      title: article.data.title,
      description: article.data.description,
      pubDate: article.data.pubDate,
      author: article.data.author,
      link: `/articles/${article.data.slug}`,
      content: sanitizeHtml(parser.render(article.body ?? ""), {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img"]),
      }),
    })),
    // (optional) inject custom xml
    // customData: `<language>en</language>`,
  })
}
