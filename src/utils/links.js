export const isExternalUrl = (url = '') => /^https?:\/\//i.test(url)

// Prefixes an internal path with a regional language code ("/de/..."),
// leaving external URLs and already-prefixed paths alone.
export const localisePath = (url, languageCode) => {
  if (!url || !languageCode || languageCode === 'default' || isExternalUrl(url))
    return url
  const prefix = `/${languageCode}`
  if (url === prefix || url.startsWith(`${prefix}/`)) return url
  return url === '/' ? prefix : `${prefix}${url}`
}
