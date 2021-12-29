import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { extractScripts } from '../../utils/extractScripts'

// Kontent language codenames that are not valid BCP 47 tags ("eu" is the
// European English site, not Basque).
const HTML_LANG = { default: 'en', eu: 'en' }

// Rendered from each page's `Head` export (Gatsby Head API), so the tags are
// part of the server-rendered HTML.
const SEO = ({ title, description, image, pathname = '', lang = 'en' }) => {
  const { site, header } = useStaticQuery(query)

  const {
    defaultTitle,
    titleTemplate,
    defaultDescription,
    siteUrl,
    defaultImage,
    twitterUsername,
    trustArc,
  } = site.siteMetadata

  const seo = {
    title: title || defaultTitle,
    description: description || defaultDescription,
    image: `${siteUrl}${image || defaultImage}`,
    url: `${siteUrl}${pathname}`,
  }
  const headScripts = extractScripts(header?.elements.head_scripts.value)

  return (
    <>
      <html lang={HTML_LANG[lang] || lang} />
      <title>{titleTemplate.replace('%s', seo.title)}</title>
      <meta name="description" content={seo.description} />
      <meta name="image" content={seo.image} />
      <meta property="og:url" content={seo.url} />
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:image" content={seo.image} />
      <meta name="twitter:card" content="summary_large_image" />
      {twitterUsername && (
        <meta name="twitter:creator" content={twitterUsername} />
      )}
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={seo.image} />
      {trustArc && <script src={trustArc} async />}
      {headScripts.map((script, index) => (
        <script key={index} dangerouslySetInnerHTML={{ __html: script }} />
      ))}
    </>
  )
}

export default SEO

const query = graphql`
  query SEO {
    site {
      siteMetadata {
        defaultTitle: title
        titleTemplate
        defaultDescription: description
        siteUrl: url
        defaultImage: image
        twitterUsername
        trustArc
      }
    }
    header: kontentItemHeader(system: { language: { eq: "default" } }) {
      elements {
        head_scripts {
          value
        }
      }
    }
  }
`
