import { graphql } from 'gatsby'

export const query = graphql`
  fragment nav_home on kontent_item_home_template {
    system {
      id
      codename
    }
    elements {
      title {
        value
      }
      slug {
        value
      }
    }
  }
  fragment nav_page on kontent_item_page_template {
    system {
      id
      codename
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
  fragment nav_link on kontent_item_link {
    system {
      id
      codename
    }
    elements {
      title {
        value
      }
      url {
        value
      }
    }
  }
  fragment nav_menu on kontent_item_menu_items {
    system {
      id
      codename
    }
    elements {
      title {
        value
      }
      slug {
        value
      }
      links {
        value {
          ...nav_page
          ...nav_link
        }
      }
    }
  }
  fragment menu_group on kontent_item_menu_group {
    system {
      id
      codename
    }
    elements {
      title {
        value
      }
      menu_items {
        value {
          ...nav_menu
        }
      }
    }
  }
  fragment image on kontent_item_image {
    system {
      id
      codename
    }
    elements {
      alt {
        value
      }
      asset {
        value {
          url
          description
          width
          height
        }
      }
    }
  }
  fragment anchor on kontent_item_anchor {
    system {
      id
      codename
    }
    elements {
      name {
        value
      }
      url {
        value
      }
      aria_label {
        value
      }
    }
  }
  fragment card on kontent_item_card {
    system {
      id
      codename
    }
    elements {
      name {
        value
      }
      description {
        value
      }
      image {
        value {
          ...image
        }
      }
      anchor {
        value {
          ...anchor
        }
      }
    }
  }
  fragment section on kontent_item_section {
    system {
      id
      codename
    }
    elements {
      body {
        value
        images {
          description
          height
          width
        }
        links {
          link_id
          url_slug
          type
        }
        modular_content {
          id
        }
      }
      cards {
        value {
          system {
            id
            codename
          }
          ...card
        }
      }
      anchors {
        value {
          ...anchor
        }
      }
      images {
        value {
          ...image
        }
      }
    }
  }
  fragment accordion_item on kontent_item_accordion_item {
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
      }
    }
  }
  fragment accordions on kontent_item_accordion {
    system {
      id
      codename
    }
    elements {
      accordion_items {
        value {
          ...accordion_item
        }
      }
    }
  }
  fragment modal on kontent_item_modal {
    system {
      id
      codename
    }
    elements {
      toggle_text {
        value
      }
      title {
        value
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
        }
      }
    }
  }
  fragment marketo_form on kontent_item_marketo_form {
    system {
      id
      codename
    }
    elements {
      id {
        value
      }
      url {
        value
      }
      success_message {
        value
      }
      error_message {
        value
      }
      footnotes {
        value
      }
    }
  }
  fragment dropdown on kontent_item_dropdown {
    system {
      id
      codename
    }
    elements {
      title {
        value
      }
      items {
        value {
          ... on kontent_item_dropdown_item {
            system {
              id
              codename
            }
            elements {
              title {
                value
              }
              url {
                value
              }
            }
          }
        }
      }
    }
  }
`
