const {
  buildPagePath,
  pageSlug,
  siteMapPath,
  topicSlug,
} = require('./src/utils/pagePath')

const templates = {
  page: require.resolve(`./src/templates/page-template.js`),
  pageRegional: require.resolve(`./src/templates/page-template-regional.js`),
  siteMap: require.resolve(`./src/templates/site-map-template.js`),
  siteMapRegional: require.resolve(
    `./src/templates/site-map-template-regional.js`
  ),
}

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions
  const { data, errors } = await graphql(`
    query {
      pages: allKontentItemPageTemplate {
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
  `)
  if (errors) {
    reporter.panicOnBuild('Could not load page templates from Kontent', errors)
    return
  }

  const languages = new Set()
  const siteMapPageIds = new Map()
  const createdPaths = new Set()

  for (const page of data.pages.nodes) {
    const {
      system: { id: pageID, language },
      elements: {
        title: { value: title },
        slug: { value: slug },
        topics,
      },
    } = page
    languages.add(language)

    // The site-map page only supplies the title and banner for its template.
    if (slug === 'site-map') {
      siteMapPageIds.set(language, pageID)
      continue
    }

    const category = topics.value[0]?.name || ''
    const path = buildPagePath({ slug, topic: category, language })
    // Kontent's language fallback returns untranslated items again for every
    // language; they resolve to a path that already exists.
    if (createdPaths.has(path)) continue
    createdPaths.add(path)

    createPage({
      path,
      component: language === 'default' ? templates.page : templates.pageRegional,
      context: {
        languageCode: language,
        pageID,
        item: {
          url: path,
          pageSlug: pageSlug(slug),
          name: title,
          category,
          categorySlug: topicSlug(category),
        },
      },
    })
  }

  for (const language of languages) {
    createPage({
      path: siteMapPath(language),
      component:
        language === 'default' ? templates.siteMap : templates.siteMapRegional,
      context: {
        languageCode: language,
        pageID: siteMapPageIds.get(language) || '',
      },
    })
  }
}
