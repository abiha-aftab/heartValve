import React from 'react'
import { graphql } from 'gatsby'
import SiteMap from '../components/SiteMap'
import LayoutRegional from '../components/Layout/variations/LayoutRegional'

export default function SiteMapTemplateRegional({ pageContext: { languageCode }, data }) {
    let result = data.page.nodes.reduce((page, curr) => {

        let value = ""; let found = false;
        const slugUrl = curr.elements.slug.value;

        if (curr.elements.topics.value && curr.elements.topics.value.length > 0) {
            value = curr.elements.topics.value[0].name;

            if (!page[value]) { page[value] = { name: value, links: [] } }
            found = page[value].links.find(link => link.elements.title.value === curr.elements.title.value);

            if (!found) {
                const topicUrl = value.replace(/\s+/g, '-').replace(/^\/+|\/+$/g, '').toLowerCase();

                if (topicUrl !== slugUrl && topicUrl !== "regional") {
                    curr.elements.slug.value = `/${languageCode}/${topicUrl}/${slugUrl}`;
                } else {
                    curr.elements.slug.value = `/${languageCode}/${slugUrl}`;
                }

                curr.elements.slug.value = curr.elements.slug.value.endsWith('//') ? curr.elements.slug.value.slice(0, -2) : curr.elements.slug.value;
            }
        } else {
            value = "Miscellaneous";
        }

        if (slugUrl !== "site-map") {
            if (!page[value]) { page[value] = { name: value, links: [] } }

            if (!found) {
                page[value].links.push(curr);
            }
        }

        return page;
    }, {});

    return (
        <LayoutRegional languageCode={languageCode} header={data.header} footer={data.footer}>
            <SiteMap result={result} languageCode={languageCode} siteMapPage={data.siteMapPage} />
        </LayoutRegional>
    )
}

export const pageQuery = graphql`
  query SiteMapRegionalQuery($languageCode: String, $pageID: String) {
    siteMapPage: kontentItemPageTemplate(system: { id: { eq: $pageID } }) {
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
    header: kontentItemHeader (
      system: {language: {eq: $languageCode}}
    )  {
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
    footer: kontentItemFooter (
      system: {language: {eq: $languageCode}}
    ) {
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