import { SITE_DESCRIPTION, SITE_TITLE } from "$lib/constants"

export const languages = {
  en: "English",
}

export const defaultLang = "en"
export const showDefaultLang = false

export const ui = {
  en: {
    "meta.title": SITE_TITLE,
    "meta.description": SITE_DESCRIPTION,
    "navbar.title": "BLOG",
    "footer.copyright": `Copyright © ${new Date().getFullYear()} • All Rights Reserved.`,
    "404.pageNotFound": "404 | Page Not Found",
  },
} as const
