// URL rules shared by gatsby-node (page creation) and the site-map templates,
// so the site map always links to the paths that were actually built.
// CommonJS because gatsby-node.js requires it.

const trimSlashes = (value) => value.replace(/^\/+|\/+$/g, '')

const topicSlug = (topic = '') =>
  trimSlashes(topic.replace(/\s+/g, '-')).toLowerCase()

const pageSlug = (slug = '') =>
  slug === 'home' ? '' : trimSlashes(slug).toLowerCase().trim()

// A page lives under its first topic, except when the topic is the page
// itself, is missing, or is the "Regional" bucket used by language sites.
const buildPagePath = ({ slug, topic = '', language = 'default' }) => {
  const page = pageSlug(slug)
  const category = topicSlug(topic)
  const prefix = language === 'default' ? '' : `/${language}`
  const segments =
    category === page || category === 'regional' || category === ''
      ? [page]
      : [category, page]
  return `${prefix}/${segments.filter(Boolean).join('/')}`
}

const siteMapPath = (language = 'default') =>
  language === 'default' ? '/site-map' : `/${language}/site-map`

// Groups page_template nodes by their first topic for the site-map page.
const groupPagesByTopic = (nodes, language = 'default') => {
  const groups = new Map()
  for (const node of nodes) {
    const slug = node.elements.slug.value
    if (slug === 'site-map') continue
    const topic = node.elements.topics.value[0]?.name || ''
    const name = topic || 'Miscellaneous'
    if (!groups.has(name)) groups.set(name, { name, links: [] })
    const group = groups.get(name)
    const title = node.elements.title.value
    if (group.links.some((link) => link.title === title)) continue
    group.links.push({ title, url: buildPagePath({ slug, topic, language }) })
  }
  return [...groups.values()]
}

module.exports = {
  buildPagePath,
  groupPagesByTopic,
  pageSlug,
  siteMapPath,
  topicSlug,
}
