const {
  FIXTURE_DOMAIN,
  kontentSourceOptions,
  parseLanguageCodenames,
} = require('../config/kontent')

describe('parseLanguageCodenames', () => {
  it('splits and trims a comma separated list', () => {
    expect(parseLanguageCodenames(' default, de ,es,')).toEqual([
      'default',
      'de',
      'es',
    ])
  })

  it('falls back to the default language when unset or blank', () => {
    expect(parseLanguageCodenames(undefined)).toEqual(['default'])
    expect(parseLanguageCodenames(' , ')).toEqual(['default'])
  })
})

describe('kontentSourceOptions', () => {
  it('uses the project id and languages from the environment', () => {
    const options = kontentSourceOptions({
      GATSBY_KONTENT_PROJECT_ID: 'project-id',
      GATSBY_KONTENT_LANGUAGE_CODENAMES: 'default,de',
    })
    expect(options).toEqual({
      projectId: 'project-id',
      languageCodenames: ['default', 'de'],
    })
  })

  it('does not crash when the language list is unset', () => {
    expect(
      kontentSourceOptions({ GATSBY_KONTENT_PROJECT_ID: 'id' })
        .languageCodenames
    ).toEqual(['default'])
  })

  it('explains what to do when the project id is missing', () => {
    expect(() => kontentSourceOptions({})).toThrow(/KONTENT_OFFLINE=1/)
  })

  it('points offline builds at the fixture host and ignores real settings', () => {
    const options = kontentSourceOptions({
      KONTENT_OFFLINE: '1',
      GATSBY_KONTENT_PROJECT_ID: 'real',
    })
    expect(options.proxy).toEqual({ deliveryDomain: FIXTURE_DOMAIN })
    expect(options.projectId).not.toBe('real')
    expect(options.projectId).toHaveLength(36)
  })
})
