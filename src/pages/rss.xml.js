import rss from '@astrojs/rss';
import { getCollection } from "astro:content";
import sanitizeHtml from 'sanitize-html';
import MarkdownIt from 'markdown-it';

import { SITE_DESCRIPTION, SITE_TITLE } from '$lib/constants';
import { getExcerpt } from '$lib/utils';

const parser = new MarkdownIt();

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
      description: getExcerpt(article.body, 200),
      pubDate: article.data.published,
      author: article.data.author,
      link: `/article/${article.id}`,
      content: sanitizeHtml(parser.render(article.body), {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img'])
      }),
    })),
    // (optional) inject custom xml
    // customData: `<language>en</language>`,
  });
}