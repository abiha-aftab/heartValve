import { isExternalUrl, localisePath } from '../../src/utils/links'

describe('isExternalUrl', () => {
  it('only matches absolute http(s) URLs', () => {
    expect(isExternalUrl('https://newheartvalve.com/')).toBe(true)
    expect(isExternalUrl('http://example.com')).toBe(true)
    expect(isExternalUrl('/treatment-options/https-explained')).toBe(false)
    expect(isExternalUrl(undefined)).toBe(false)
  })
})

describe('localisePath', () => {
  it('prefixes internal paths for regional sites', () => {
    expect(localisePath('/herzklappen', 'de')).toBe('/de/herzklappen')
    expect(localisePath('/', 'de')).toBe('/de')
  })

  it('leaves default-language, external and already prefixed paths alone', () => {
    expect(localisePath('/heart-basics', null)).toBe('/heart-basics')
    expect(localisePath('/heart-basics', 'default')).toBe('/heart-basics')
    expect(localisePath('https://example.com', 'de')).toBe('https://example.com')
    expect(localisePath('/de/herzklappen', 'de')).toBe('/de/herzklappen')
  })
})
