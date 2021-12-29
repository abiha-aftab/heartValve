import React from 'react'
import { graphql } from 'gatsby'
import SiteMap from '../components/SiteMap'
import SEO from '../components/SEO'
import { groupPagesByTopic } from '../utils/pagePath'
import LayoutRegional from '../components/Layout/variations/LayoutRegional'

export default function SiteMapTemplateRegional({
  pageContext: { languageCode },
  data,
}) {
  return (
    <LayoutRegional
      languageCode={languageCode}
      header={data.header}
      footer={data.footer}
    >
      <SiteMap
        groups={groupPagesByTopic(data.page.nodes, languageCode)}
        languageCode={languageCode}
        siteMapPage={data.siteMapPage}
      />
    </LayoutRegional>
  )
}

export const Head = ({ data, location, pageContext }) => (
  <SEO
    title={data.siteMapPage?.elements.title.value || 'Site map'}
    pathname={location.pathname}
    lang={pageContext.languageCode}
  />
)

export const pageQuery = graphql`
  query SiteMapRegionalQuery($languageCode: String, $pageID: String) {
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
    header: kontentItemHeader(system: { language: { eq: $languageCode } }) {
      system {
        id
        codename
      }
      elements {
        logo {
          value {
            ...image
          }
        }
        menu {
          value {
            ...nav_home
            ...nav_menu
            ...nav_page
          }
        }
        language_selector {
          value
        }
      }
    }
    footer: kontentItemFooter(system: { language: { eq: $languageCode } }) {
      system {
        id
        codename
      }
      elements {
        text {
          value
        }
        menu {
          value {
            ...nav_menu
          }
        }
      }
    }
    page: allKontentItemPageTemplate(
      filter: { system: { language: { eq: $languageCode } } }
    ) {
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
