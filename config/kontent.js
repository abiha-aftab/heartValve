// Builds the options for the Kontent source plugin from environment variables.
// Kept out of gatsby-config.js so the rules can be unit tested.

// Offline builds point the source plugin at a reserved `.invalid` host. The
// kontent-offline plugin answers those requests from local fixtures; if it were
// ever missing, the requests would fail DNS instead of reaching Kontent.
const FIXTURE_DOMAIN = 'kontent-fixtures.invalid'
const OFFLINE_PROJECT_ID = '00000000-0000-4000-8000-000000000000'
const FIXTURE_LANGUAGES = ['default', 'de']

const isOfflineMode = (env) => ['1', 'true'].includes(env.KONTENT_OFFLINE)

const parseLanguageCodenames = (raw) => {
  const codenames = (raw || '')
    .split(',')
    .map((codename) => codename.trim())
    .filter(Boolean)
  return codenames.length ? codenames : ['default']
}

const kontentSourceOptions = (env) => {
  if (isOfflineMode(env)) {
    return {
      projectId: OFFLINE_PROJECT_ID,
      languageCodenames: FIXTURE_LANGUAGES,
      proxy: { deliveryDomain: FIXTURE_DOMAIN },
    }
  }
  if (!env.GATSBY_KONTENT_PROJECT_ID) {
    throw new Error(
      'GATSBY_KONTENT_PROJECT_ID is not set. Copy .env.example to .env and ' +
        'fill it in, or set KONTENT_OFFLINE=1 to build from the bundled fixtures.'
    )
  }
  return {
    projectId: env.GATSBY_KONTENT_PROJECT_ID,
    languageCodenames: parseLanguageCodenames(
      env.GATSBY_KONTENT_LANGUAGE_CODENAMES
    ),
  }
}

module.exports = {
  FIXTURE_DOMAIN,
  FIXTURE_LANGUAGES,
  isOfflineMode,
  kontentSourceOptions,
  parseLanguageCodenames,
}
