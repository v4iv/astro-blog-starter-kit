import rss from '@astrojs/rss';
import { getCollection } from "astro:content";

import { SITE_DESCRIPTION, SITE_TITLE } from '$lib/constants';

export async function GET(context) {
  const articles = (await getCollection("blog"))
    .sort(
      (a, b) => b.data.published.valueOf() - a.data.published.valueOf(),
    )
  return rss({
    // `<title>` field in output xml
    title: SITE_TITLE,
    // `<description>` field in output xml
    description: SITE_DESCRIPTION,
    // Pull in your project "site" from the endpoint context
    // https://docs.astro.build/en/reference/api-reference/#site
    site: context.site,
    trailingSlash: false,
    // Array of `<item>`s in output xml
    // See "Generating items" section for examples using content collections and glob imports
    items: articles.map((article) => ({
        title: article.data.title,
        pubDate: article.data.published,
        link: `/article/${article.id}`,
        content: article.rendered?.html
    })),
    // (optional) inject custom xml
    // customData: `<language>en</language>`,
  });
}