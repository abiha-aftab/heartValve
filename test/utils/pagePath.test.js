import { buildPagePath, groupPagesByTopic } from '../../src/utils/pagePath'

const pageNode = (title, slug, topic) => ({
  elements: {
    title: { value: title },
    slug: { value: slug },
    topics: { value: topic ? [{ name: topic }] : [] },
  },
})

describe('buildPagePath', () => {
  it.each([
    [{ slug: 'heart-anatomy', topic: 'Heart Basics' }, '/heart-basics/heart-anatomy'],
    [{ slug: 'heart-basics', topic: 'Heart Basics' }, '/heart-basics'],
    [{ slug: '/Contact-Us/', topic: '' }, '/contact-us'],
    [{ slug: 'home', topic: 'Regional', language: 'de' }, '/de/'],
    [{ slug: 'herzklappen', topic: 'Regional', language: 'de' }, '/de/herzklappen'],
    [{ slug: 'faqs', topic: 'Heart Basics', language: 'nl' }, '/nl/heart-basics/faqs'],
  ])('%j -> %s', (input, expected) => {
    expect(buildPagePath(input)).toBe(expected)
  })
})

describe('groupPagesByTopic', () => {
  const nodes = [
    pageNode('Heart anatomy', 'heart-anatomy', 'Heart Basics'),
    pageNode('Heart anatomy', 'heart-anatomy', 'Heart Basics'),
    pageNode('Contact us', 'contact-us'),
    pageNode('Site map', 'site-map'),
  ]

  it('groups by topic, drops duplicates and the site map itself', () => {
    expect(groupPagesByTopic(nodes)).toEqual([
      { name: 'Heart Basics', links: [{ title: 'Heart anatomy', url: '/heart-basics/heart-anatomy' }] },
      { name: 'Miscellaneous', links: [{ title: 'Contact us', url: '/contact-us' }] },
    ])
  })

  it('uses the same paths as page creation for regional sites', () => {
    const [group] = groupPagesByTopic([pageNode('Startseite', 'home', 'Regional')], 'de')
    expect(group.links[0].url).toBe(buildPagePath({ slug: 'home', topic: 'Regional', language: 'de' }))
  })

  it('does not mutate the query result', () => {
    const before = JSON.stringify(nodes)
    groupPagesByTopic(nodes)
    groupPagesByTopic(nodes)
    expect(JSON.stringify(nodes)).toBe(before)
  })
})
