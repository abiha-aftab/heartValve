require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})

require('dotenv').config()
module.exports = {
  siteMetadata: {
    title: `YourHeartValve`,
    description: `The heart valve patient’s comprehensive resource for information from Edwards Lifesciences`,
    titleTemplate: `%s | YourHeartValve`,
    url: `https://yourheartvalve.com`,
    twitterUsername: `@EdwardsLifesci`,
    image: `/yhv-twitter.png`,
    trustArc: `https://consent.trustarc.com/notice?domain=edwards_ccpa.com&c=teconsent&js=nj&noticeType=bb&gtm=1`
  },
  plugins: [
    {
      resolve: `@kentico/gatsby-source-kontent`,
      options: {
        projectId: process.env.GATSBY_KONTENT_PROJECT_ID,
        languageCodenames: process.env.GATSBY_KONTENT_LANGUAGE_CODENAMES.split(
          ','
        ).map((lang) => lang.trim()),
      },
    },
    `gatsby-plugin-sass`,
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
  ],
}
