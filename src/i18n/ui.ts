import { APP_NAME, SITE_DESCRIPTION, SITE_TITLE } from "@/lib/constants"

export const languages = {
  en: "English",
}

export const defaultLang = "en"
export const showDefaultLang = false

export const ui = {
  en: {
    "meta.title": SITE_TITLE,
    "meta.description": SITE_DESCRIPTION,
    "navbar.title": APP_NAME,
    "footer.rss": "RSS",
    "footer.copyright": `Copyright © ${new Date().getFullYear()} • All Rights Reserved.`,
    "404.page-not-found": "404 | Page Not Found",
    "share.bluesky": "Share to Bluesky",
    "share.whatsapp": "Share to WhatsApp",
    "share.reddit": "Share to Reddit",
    "share.facebook": "Share to Facebook",
    "share.copy-url": "Copy URL",
    "share.sharesheet": "Open Sharesheet",
  },
} as const
