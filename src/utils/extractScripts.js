// Returns the inline bodies of the <script> tags in a CMS-managed HTML
// snippet. Uses a regular expression rather than the DOM so it also works
// while Gatsby renders pages on the server.
export const extractScripts = (html) => {
  if (!html) return []
  return [...html.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/gi)]
    .map((match) => match[1].trim())
    .filter(Boolean)
}
