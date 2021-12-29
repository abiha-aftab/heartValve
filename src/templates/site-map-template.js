import React from 'react'
import { graphql } from 'gatsby'
import SiteMap from '../components/SiteMap'
import Layout from '../components/Layout/variations/LayoutDefault'

export default function SiteMapTemplate({ pageContext: { languageCode, pageID }, data }) {
    let result = data.page.nodes.reduce((page, curr) => {

        let value = ""; let found = false;
        const slugUrl = curr.elements.slug.value;

        if (curr.elements.topics.value && curr.elements.topics.value.length > 0) {
            value = curr.elements.topics.value[0].name;

            if (!page[value]) { page[value] = { name: value, links: [] } }
            found = page[value].links.find(link => link.elements.title.value === curr.elements.title.value);

            if (!found) {
                const topicUrl = value.replace(/\s+/g, '-').replace(/^\/+|\/+$/g, '').toLowerCase();

                if (topicUrl !== slugUrl) {
                    curr.elements.slug.value = `/${topicUrl}/${slugUrl}`;
                } else {
                    curr.elements.slug.value = `/${slugUrl}`;
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
        <Layout>
            <SiteMap result={result} languageCode={""} siteMapPage={data.siteMapPage} />
        </Layout>
    )
}

export const pageQuery = graphql`
  query SiteMapQuery($languageCode: String, $pageID: String) {
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
