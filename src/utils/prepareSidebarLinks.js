import { isExternalUrl } from './links'

const REGIONAL_ASIDE_MENU = 'regional-aside-menu'

const menuBaseURL = (slug) => (slug === REGIONAL_ASIDE_MENU ? '' : slug)

const prepareLinks = (baseURL, links, languageCode) =>
  links.flatMap((link) => {
    const rawSlug = link.elements.url
      ? link.elements.url.value
      : link.elements.slug.value.toLowerCase()
    const slug = rawSlug === 'home' ? '' : rawSlug
    if (baseURL === slug && !languageCode) return []
    let url = ''
    if (slug) {
      url = isExternalUrl(slug)
        ? slug
        : baseURL === slug || baseURL === ''
          ? `/${slug}`
          : `/${baseURL}/${slug.replace(/^\/+|\/+$/g, '')}`
    }
    return [
      {
        name: link.elements.title.value,
        url:
          languageCode && !isExternalUrl(url) ? `/${languageCode}${url}` : url,
      },
    ]
  })

// Builds the aside menu. A menu group adds a headline entry (empty url)
// followed by the links of its first menu.
export const prepareSidebarLinks = (data, languageCode = null) => {
  if (!data.length) return null
  return data.flatMap((menu) => {
    if (menu.elements.menu_items) {
      const item = menu.elements.menu_items.value[0]
      if (!item) return []
      return [
        { name: menu.elements.title.value, url: '' },
        ...prepareLinks(
          menuBaseURL(item.elements.slug.value),
          item.elements.links.value,
          languageCode
        ),
      ]
    }
    return prepareLinks(
      menuBaseURL(menu.elements.slug.value),
      menu.elements.links.value,
      languageCode
    )
  })
}
