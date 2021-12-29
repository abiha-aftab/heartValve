export const prepareSidebarLinks = (data, languageCode = null) => {
  if(!data.length) return
  let sidebarLinks = []
  let links = []
  let baseURL = ''
  data.forEach((menu) => {
    const {
      title: { value: name },
    } = menu.elements
    if (menu.elements.menu_items) {
      const item = menu.elements.menu_items.value[0]
      links = item.elements.links.value
      baseURL = item.elements.slug.value === "regional-aside-menu" || item.elements.slug.value === "" ? "" : item.elements.slug.value
      sidebarLinks.push({
        name: name,
        url: ``,
      })
      sidebarLinks = prepareLinks(baseURL, links, sidebarLinks, languageCode)
    } else {
      links = menu.elements.links.value
      baseURL = menu.elements.slug.value === "regional-aside-menu" || menu.elements.slug.value === "" ? "" : menu.elements.slug.value
      sidebarLinks = prepareLinks(baseURL, links, sidebarLinks, languageCode)
    }
  })

  return sidebarLinks
}
const prepareLinks = (baseURL, links, sidebarLinks, languageCode = null) => {
  links.forEach((link) => {
    const {
      title: { value: name },
    } = link.elements
    let slug = link.elements.url
      ? link.elements.url.value
      : link.elements.slug.value.toLowerCase().replace('home', '')
    let url = slug
      ? slug.indexOf('https') !== -1
        ? slug
        : baseURL === slug || baseURL === ""
        ? `/${slug}`
        : `/${baseURL}/${slug.replace(/^\/+|\/+$/g, '')}`
      : ''
    if (baseURL === slug && !languageCode) return
    sidebarLinks.push({
      name: name,
      url: languageCode ? `/${languageCode}${url}` : url,
    })
  })
  return sidebarLinks
}
