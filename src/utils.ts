import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { fromMarkdown } from "mdast-util-from-markdown"
import { toString } from "mdast-util-to-string"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getExcerpt(markdown: any, length: number) {
  const tree = fromMarkdown(markdown)
  const text = toString(tree)
  return text.trim().slice(0, length)
}
