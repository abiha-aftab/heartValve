import React from 'react'
import { graphql } from 'gatsby'
import HeroSmall from '../containers/Hero/variants/HeroSmall'
import SidebarDefault from '../components/Sidebar/variants/SidebarDefault'
import PaginationDefault from '../components/Pagination/variants/PaginationDefault'
import ContentsPageTemplate from '../containers/Contents/variants/ContentsPageTemplate'
import { prepareSidebarLinks } from '../utils/prepareSidebarLinks'
import Dropdown from '../components/Dropdown/variants/DropdownDefault'
import SEO from '../components/SEO'
import Layout from '../components/Layout/variations/LayoutDefault'

export default function PageTemplate({ pageContext: { pageID, item }, data }) {
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
  const { id, codename } = data.page.system
  const sidebarLinks = prepareSidebarLinks(menu)

  let categoryPath = path.split('/')
  categoryPath[0] = `/${categoryPath[0]}`
  return (
    <Layout>
      <SEO title={title} />
      <HeroSmall image={image.value ? image.value[0] : null} />
      <section className="section">
        <div className="container">
          <h2
            className="text-crimson category"
            data-kontent-item-id={id}
            data-kontent-element-codename={codename}
          >
            <a href={categoryPath[0]}>{item.category}</a>
          </h2>
          <PaginationDefault path={path} pageId={id} pageCodename={codename} />
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
                />
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export const pageQuery = graphql`
  query PageQuery($pageID: String) {
    page: kontentItemPageTemplate(system: { id: { eq: $pageID } }) {
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
  }
`
