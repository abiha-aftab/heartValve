// Helpers that turn compact fixture definitions into the JSON shapes the
// Kontent Delivery API returns from /types and /items-feed.
const crypto = require('crypto')

const ASSET_URL_PREFIX = '/kontent-fixtures'

const humanise = (codename) =>
  codename.charAt(0).toUpperCase() + codename.slice(1).replace(/_/g, ' ')

const toCodename = (name) =>
  name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_|_$/g, '')

// Kontent item ids are UUIDs shared by every language variant of an item.
const fixtureId = (codename) => {
  const hex = crypto.createHash('md5').update(codename).digest('hex')
  return [
    hex.slice(0, 8),
    hex.slice(8, 12),
    hex.slice(12, 16),
    hex.slice(16, 20),
    hex.slice(20, 32),
  ].join('-')
}

const linkedCodenames = (html) =>
  [...html.matchAll(/data-codename="([^"]+)"/g)].map((match) => match[1])

const elementValue = (type, value) => {
  switch (type) {
    case 'rich_text': {
      const html = value || '<p><br></p>'
      return {
        value: html,
        images: {},
        links: {},
        modular_content: linkedCodenames(html),
      }
    }
    case 'modular_content':
      return { value: value || [] }
    case 'taxonomy':
      return {
        taxonomy_group: 'topics',
        value: (value || []).map((name) => ({
          name,
          codename: toCodename(name),
        })),
      }
    case 'asset':
      return {
        value: (value || []).map((asset) => ({
          name: asset.file,
          description: asset.description || null,
          type: asset.mime,
          size: asset.size,
          url: `${ASSET_URL_PREFIX}/${asset.file}`,
          width: asset.width,
          height: asset.height,
          renditions: {},
        })),
      }
    default:
      return { value: value == null ? '' : value }
  }
}

const toDeliveryType = (codename, elements) => ({
  system: {
    id: fixtureId(`type:${codename}`),
    name: humanise(codename),
    codename,
    last_modified: '2026-01-01T00:00:00Z',
  },
  elements: Object.fromEntries(
    Object.entries(elements).map(([key, type]) => [
      key,
      { type, name: humanise(key) },
    ])
  ),
})

const toDeliveryItem = (types, { type, codename, language, values }) => {
  const elementTypes = types[type]
  if (!elementTypes) {
    throw new Error(`Fixture ${codename} uses unknown content type ${type}`)
  }
  const unknown = Object.keys(values).filter((key) => !(key in elementTypes))
  if (unknown.length) {
    throw new Error(`Fixture ${codename} sets unknown elements: ${unknown}`)
  }
  return {
    system: {
      id: fixtureId(codename),
      name: values.title || humanise(codename),
      codename,
      language,
      type,
      collection: 'default',
      sitemap_locations: [],
      last_modified: '2026-01-01T00:00:00Z',
      workflow_step: 'published',
    },
    elements: Object.fromEntries(
      Object.entries(elementTypes).map(([key, elementType]) => [
        key,
        {
          type: elementType,
          name: humanise(key),
          ...elementValue(elementType, values[key]),
        },
      ])
    ),
  }
}

module.exports = {
  ASSET_URL_PREFIX,
  fixtureId,
  linkedCodenames,
  toCodename,
  toDeliveryItem,
  toDeliveryType,
}
