require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})

require('dotenv').config()

const { isOfflineMode, kontentSourceOptions } = require('./config/kontent')

const KONTENT_SOURCE_PLUGIN = `@kontent-ai/gatsby-source`
const offline = isOfflineMode(process.env)

module.exports = {
  siteMetadata: {
    title: `YourHeartValve`,
    description: `The heart valve patient’s comprehensive resource for information from Edwards Lifesciences`,
    titleTemplate: `%s | YourHeartValve`,
    url: `https://yourheartvalve.com`,
    twitterUsername: `@EdwardsLifesci`,
    image: `/yhv-twitter.png`,
    // Offline fixture builds do not load the production consent manager.
    trustArc: offline
      ? ``
      : `https://consent.trustarc.com/notice?domain=edwards_ccpa.com&c=teconsent&js=nj&noticeType=bb&gtm=1`,
  },
  plugins: [
    ...(offline
      ? [
          {
            resolve: `kontent-offline`,
            options: { sourcePlugin: KONTENT_SOURCE_PLUGIN },
          },
        ]
      : []),
    {
      resolve: KONTENT_SOURCE_PLUGIN,
      options: kontentSourceOptions(process.env),
    },
    {
      resolve: `gatsby-plugin-sass`,
      options: {
        // The 7-1 partials still use @import and global colour functions, and
        // gatsby-plugin-sass drives Sass through its legacy JS API. Migrating
        // to @use is tracked separately; until then keep the build log readable.
        sassOptions: {
          silenceDeprecations: [
            'legacy-js-api',
            'import',
            'global-builtin',
            'color-functions',
          ],
        },
      },
    },
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
  ],
}
