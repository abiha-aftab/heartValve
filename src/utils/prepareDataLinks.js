import { isExternalUrl, localisePath } from './links'

const childLinks = (links, baseURL) =>
  links.map((link) => {
    const slug = link.elements.url
      ? link.elements.url.value
      : link.elements.slug.value
    let url = ''
    if (slug) {
      url = isExternalUrl(slug)
        ? slug
        : baseURL === slug || baseURL === ''
          ? `/${slug}`
          : `/${baseURL}/${slug}`
    }
    return { name: link.elements.title.value, url }
  })

// Turns header/footer menu items from Kontent into { name, url, links }.
// Regional footers are a flat list of every menu's links under /<language>.
export const prepareDataLinks = (data, languageCode = null, linksType = '') => {
  if (languageCode && linksType === 'footer') {
    return data.flatMap((menu) =>
      childLinks(menu.elements.links?.value || [], languageCode)
    )
  }
  return data.map((link) => {
    const slug = link.elements.slug?.value || ''
    const baseURL = slug === 'home' ? '/' : slug
    return {
      name: link.elements.title.value,
      url: localisePath(baseURL === '/' ? '/' : `/${baseURL}`, languageCode),
      links: childLinks(link.elements.links?.value || [], baseURL).map(
        (child) => ({ ...child, url: localisePath(child.url, languageCode) })
      ),
    }
  })
}
