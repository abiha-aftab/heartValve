import React from 'react'
import { graphql } from 'gatsby'
import HeroSmall from '../containers/Hero/variants/HeroSmall'
import SidebarDefault from '../components/Sidebar/variants/SidebarDefault'
import PaginationDefault from '../components/Pagination/variants/PaginationDefault'
import ContentsPageTemplate from '../containers/Contents/variants/ContentsPageTemplate'
import { prepareSidebarLinks } from '../utils/prepareSidebarLinks'
import Dropdown from '../components/Dropdown/variants/DropdownDefault'
import LayoutRegional from '../components/Layout/variations/LayoutRegional'
import SEO from '../components/SEO'
import { prepareDataLinks } from '../utils/prepareDataLinks'

export default function PageTemplateRegional({
  pageContext: { languageCode, pageID, item },
  data,
}) {
  const path = item.url.replace(/^\/+|\/+$/g, '')
  const {
    body,
    image,
    aside_menu: { value: menu },
    accordions: { value: accordions },
    modal: { value: modal },
    marketo_form: { value: marketo_form },
    dropdown: { value: dropdown },
    title: { value: title },
  } = data.page.elements
  if (title === 'Home') {
    console.log(data.page)
  }
  const { id, codename } = data.page.system
  const sidebarLinks = prepareSidebarLinks(menu, languageCode)
  let footerLinksTranslations = []
  let titleMapping = []
  if (data.footer) {
    footerLinksTranslations = prepareDataLinks(
      data.footer.elements.menu.value,
      languageCode,
      'footer'
    )
    titleMapping = footerLinksTranslations.filter(function (page) {
      return page.url === `/${languageCode}/${item.categorySlug}`
    })
  }

  let categoryPath = path.split('/')
  categoryPath[1] = `/${categoryPath[0]}/${categoryPath[1]}`
  return (
    <LayoutRegional
      languageCode={languageCode}
      header={data.header}
      footer={data.footer}
    >
      <SEO title={title} />
      <HeroSmall image={image.value ? image.value[0] : null} />
      <section className="section">
        <div className="container">
          {item.pageSlug !== '' && (
            <h2
              className="text-crimson category"
              data-kontent-item-id={id}
              data-kontent-element-codename={codename}
            >
              <a href={categoryPath[1]}>
                {item.category.toLowerCase() === 'regional'
                  ? item.name
                  : titleMapping.length > 0
                  ? titleMapping[0].name
                  : item.category}
              </a>
            </h2>
          )}
          <PaginationDefault
            path={path}
            languageCode={languageCode}
            pageId={id}
            pageCodename={codename}
            regionalMapping={sidebarLinks}
            footerLinksTranslations={footerLinksTranslations}
          />
          <div className="grid-1 grid-md-12 mt-2 gap-1 gap-md-2">
            {sidebarLinks && (
              <div className="col-md-3">
                <SidebarDefault sidebarLinks={sidebarLinks} />
              </div>
            )}
            <div className={sidebarLinks ? 'col-md-9' : 'col-md-12'}>
              <ContentsPageTemplate
                path={path}
                body={body}
                accordions={accordions}
                modal={modal}
                marketo_form={marketo_form}
                itemId={id}
                itemCodename={codename}
              />
              {dropdown.length > 0 && (
                <Dropdown
                  dropdown={dropdown[0]}
                  categorySlug={item.categorySlug}
                  languageCode={languageCode}
                />
              )}
            </div>
          </div>
        </div>
      </section>
    </LayoutRegional>
  )
}

export const pageQuery = graphql`
  query RegionalPageQuery($languageCode: String, $pageID: String) {
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
    page: kontentItemPageTemplate(
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
        aside_menu {
          value {
            ...menu_group
            ...nav_menu
          }
        }
        body {
          value
          images {
            url
            description
            height
            width
          }
          links {
            link_id
            url_slug
          }
          modular_content {
            id
            __typename
            system {
              codename
            }
            ... on kontent_item_summaries {
              elements {
                rich_text {
                  name
                  value {
                    id
                    ... on kontent_item_summary {
                      id
                      elements {
                        rich_text {
                          name
                          value
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
        accordions {
          value {
            ... on kontent_item_accordion {
              system {
                id
              }
              elements {
                accordion_items {
                  value {
                    ... on kontent_item_accordion_item {
                      system {
                        id
                        codename
                      }
                      elements {
                        title {
                          value
                        }
                        description {
                          value
                          modular_content {
                            id
                            __typename
                            system {
                              id
                              codename
                            }
                            ... on kontent_item_summaries {
                              elements {
                                rich_text {
                                  name
                                  value {
                                    id
                                    ... on kontent_item_summary {
                                      id
                                      elements {
                                        rich_text {
                                          name
                                          value
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
        modal {
          value {
            ...modal
          }
        }
        marketo_form {
          value {
            ...marketo_form
          }
        }
        dropdown {
          value {
            ...dropdown
          }
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
  }
`
