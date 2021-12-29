const { createDeliveryAdapter } = require('../plugins/kontent-offline/delivery-adapter')
const fixtures = require('../fixtures/kontent/content')
const { FIXTURE_DOMAIN, FIXTURE_LANGUAGES } = require('../config/kontent')

const adapter = createDeliveryAdapter(fixtures)
const get = (url) => adapter({ url })

describe('offline Delivery API adapter', () => {
  it('refuses requests to any other host', async () => {
    await expect(get('https://deliver.kontent.ai/some-project/items-feed')).rejects.toThrow(
      'blocked a request to https://deliver.kontent.ai'
    )
  })

  it('serves content types', async () => {
    const { data } = await get(`https://${FIXTURE_DOMAIN}/p/types`)
    expect(data.types.map((type) => type.system.codename)).toContain('page_template')
  })

  it('falls back to default variants for untranslated items', async () => {
    const { data } = await get(`https://${FIXTURE_DOMAIN}/p/items-feed?language=de`)
    const header = data.items.find((item) => item.system.codename === 'header')
    const card = data.items.find((item) => item.system.codename === 'card_heart_basics')
    expect(header.system.language).toBe('de')
    expect(card.system.language).toBe('default')
  })

  it('returns copies so the source plugin can mutate them', async () => {
    const first = await get(`https://${FIXTURE_DOMAIN}/p/items-feed?language=default`)
    first.data.items[0].elements = null
    const second = await get(`https://${FIXTURE_DOMAIN}/p/items-feed?language=default`)
    expect(second.data.items[0].elements).not.toBeNull()
  })

  it('rejects endpoints it has no fixture for', async () => {
    await expect(get(`https://${FIXTURE_DOMAIN}/p/taxonomies`)).rejects.toThrow('no fixture')
  })
})

describe('fixture content', () => {
  it.each(FIXTURE_LANGUAGES)('links only to items that exist (%s)', (language) => {
    const items = fixtures.itemsForLanguage(language)
    const codenames = new Set(items.map((item) => item.system.codename))
    const missing = items.flatMap((item) =>
      Object.values(item.elements)
        .filter((element) => element.type === 'modular_content' || element.type === 'rich_text')
        .flatMap((element) => (element.type === 'rich_text' ? element.modular_content : element.value))
        .filter((codename) => !codenames.has(codename))
        .map((codename) => `${item.system.codename} -> ${codename}`)
    )
    expect(missing).toEqual([])
  })
})
