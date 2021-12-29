export const prepareDataLinks = (data, languageCode = null, linksType = '') => {
  let navLinks = []
  data.forEach((link) => {
    const {
      title: { value: title },
      slug,
    } = link.elements
    let links = link.elements.links ? link.elements.links.value : []
    if (languageCode && linksType === 'footer') {
      navLinks = links.length ? extractChillLinks(links, languageCode) : []
    } else {
      let baseURL = slug.value ? slug.value : ''
      navLinks.push({
        name: title,
        url: baseURL === '/' ? baseURL : `/${baseURL}`,
        links: links.length ? extractChillLinks(links, baseURL) : [],
      })
    }
  })
  return navLinks
}
const extractChillLinks = (data, baseURL) => {
  let childLinks = []
  data.forEach((link) => {
    const {
      title: { value: title },
    } = link.elements
    let slug = link.elements.url
      ? link.elements.url.value
      : link.elements.slug.value
    let url = slug
      ? slug.indexOf('https') !== -1
        ? slug
        : baseURL === slug || baseURL === ''
        ? `/${slug}`
        : `/${baseURL}/${slug}`
      : ''
    childLinks.push({
      name: title,
      url: url,
    })
  })
  return childLinks
}
