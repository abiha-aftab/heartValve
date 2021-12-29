exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions
  const { data } = await graphql(`
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

  let languages = []
  let siteMapPageID = ''

  data.pages.nodes.forEach((page) => {
    const {
      system: { id: pageID, language },
      elements: {
        title: { value: title },
        slug: { value: slug },
      },
    } = page

    // for getting site map page id
    if (slug === 'site-map') {
      siteMapPageID = pageID
    }
    // maintain the languages
    languages.push(language)

    let category = page.elements.topics.value

    category = category.length > 0 ? category[0].name : ''
    const pageSlug =
      slug === 'home'
        ? ''
        : slug
            .replace(/^\/+|\/+$/g, '')
            .toLowerCase()
            .trim()
    const categorySlug = category
      .replace(/\s+/g, '-')
      .replace(/^\/+|\/+$/g, '')
      .toLowerCase()
    const regionalPath = language !== 'default' ? `/${language}` : ''
    const path =
      categorySlug === pageSlug ||
      categorySlug === 'regional' ||
      categorySlug === ''
        ? `${regionalPath}/${pageSlug}`
        : `${regionalPath}/${categorySlug}/${pageSlug}`

    const item = {
      url: path,
      pageSlug: pageSlug,
      name: title,
      category: category,
      categorySlug: categorySlug,
    }

    createPage({
      path: path,
      component:
        language !== 'default'
          ? require.resolve(`./src/templates/page-template-regional.js`)
          : require.resolve(`./src/templates/page-template.js`),
      context: { languageCode: language, pageID, item },
    })
  })

  if (languages && languages.length > 0) {
    // remove duplicates
    languages = languages.filter((a, b) => languages.indexOf(a) === b)
    languages.forEach((language) => {
      const path =
        language !== 'default' ? `/${language}/site-map` : '/site-map'
      createPage({
        path: path,
        component:
          language === 'default'
            ? require.resolve(`./src/templates/site-map-template.js`)
            : require.resolve(`./src/templates/site-map-template-regional.js`),
        context: { languageCode: language, path, pageID: siteMapPageID },
      })
    })
  }
}
