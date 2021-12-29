import React from 'react'
import { graphql } from 'gatsby'
import SiteMap from '../components/SiteMap'
import SEO from '../components/SEO'
import { groupPagesByTopic } from '../utils/pagePath'
import Layout from '../components/Layout/variations/LayoutDefault'

export default function SiteMapTemplate({ data }) {
  return (
    <Layout>
      <SiteMap
        groups={groupPagesByTopic(data.page.nodes)}
        languageCode=""
        siteMapPage={data.siteMapPage}
      />
    </Layout>
  )
}

export const Head = ({ data, location }) => (
  <SEO
    title={data.siteMapPage?.elements.title.value || 'Site map'}
    pathname={location.pathname}
  />
)

export const pageQuery = graphql`
  query SiteMapQuery($languageCode: String, $pageID: String) {
    siteMapPage: kontentItemPageTemplate(
      system: { id: { eq: $pageID }, language: { eq: $languageCode } }
    ) {
      system {
        id
        codename
      }
      elements {
        title {
          value
        }
        image {
          value {
            ...image
          }
        }
      }
    }
    page: allKontentItemPageTemplate(filter: {system: {language: {eq: $languageCode}}}) {
      nodes {
        system {
          id
          language
        }
        elements {
          title {
            value
          }
          slug {
            value
          }
          topics {
            value {
              name
            }
          }
        }
      }
    }
  }
`
