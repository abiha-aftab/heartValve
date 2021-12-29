import { prepareDataLinks } from '../../src/utils/prepareDataLinks'
import { prepareSidebarLinks } from '../../src/utils/prepareSidebarLinks'

const text = (value) => ({ value })
const page = (title, slug) => ({
  elements: { title: text(title), slug: text(slug) },
})
const link = (title, url) => ({
  elements: { title: text(title), url: text(url) },
})
const menu = (title, slug, links) => ({
  elements: { title: text(title), slug: text(slug), links: { value: links } },
})

const heartBasics = menu('Heart Basics', 'heart-basics', [
  page('Heart Basics', 'heart-basics'),
  page('Heart anatomy', 'heart-anatomy'),
  link('TAVR', 'https://newheartvalve.com/'),
])

describe('prepareDataLinks', () => {
  it('builds nested navigation for the default site', () => {
    expect(prepareDataLinks([page('Home', '/'), heartBasics])).toEqual([
      { name: 'Home', url: '/', links: [] },
      {
        name: 'Heart Basics',
        url: '/heart-basics',
        links: [
          { name: 'Heart Basics', url: '/heart-basics' },
          { name: 'Heart anatomy', url: '/heart-basics/heart-anatomy' },
          { name: 'TAVR', url: 'https://newheartvalve.com/' },
        ],
      },
    ])
  })

  it('keeps regional header links inside the language site', () => {
    const links = prepareDataLinks(
      [page('Startseite', 'home'), page('Herzklappen', 'herzklappen')],
      'de',
      'header'
    )
    expect(links.map((item) => item.url)).toEqual(['/de', '/de/herzklappen'])
  })

  it('collects links from every regional footer menu', () => {
    const footer = prepareDataLinks(
      [
        menu('A', 'de', [page('Herzklappen', 'herzklappen')]),
        menu('B', 'de', [page('Sitemap', 'site-map')]),
      ],
      'de',
      'footer'
    )
    expect(footer).toEqual([
      { name: 'Herzklappen', url: '/de/herzklappen' },
      { name: 'Sitemap', url: '/de/site-map' },
    ])
  })
})

describe('prepareSidebarLinks', () => {
  it('returns null for an empty menu', () => {
    expect(prepareSidebarLinks([])).toBeNull()
  })

  it('skips the section landing page on the default site', () => {
    expect(prepareSidebarLinks([heartBasics])).toEqual([
      { name: 'Heart anatomy', url: '/heart-basics/heart-anatomy' },
      { name: 'TAVR', url: 'https://newheartvalve.com/' },
    ])
  })

  it('adds a headline for menu groups', () => {
    const group = {
      elements: {
        title: text('Treatments'),
        menu_items: { value: [heartBasics] },
      },
    }
    expect(prepareSidebarLinks([group])[0]).toEqual({
      name: 'Treatments',
      url: '',
    })
  })

  it('prefixes regional links but not external ones', () => {
    const aside = menu('Herz', 'regional-aside-menu', [
      page('Startseite', 'home'),
      page('Homecare', 'homecare'),
      link('Extern', 'https://example.com'),
    ])
    expect(prepareSidebarLinks([aside], 'de').map((item) => item.url)).toEqual([
      '/de',
      '/de/homecare',
      'https://example.com',
    ])
  })
})
