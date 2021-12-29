import React, { useEffect } from 'react'
import '../../../../assets/scss/main.scss'
import FooterDefault from '../../../../containers/Footer/variants/FooterDefault'
import NavbarDefault from '../../../../containers/Navbar/variants/NavbarDefault'
import { useStaticQuery, graphql } from 'gatsby'
import { prepareDataLinks } from '../../../../utils/prepareDataLinks'
import KontentSmartLink from '@kentico/kontent-smart-link'

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query NavigationQuery {
      header: kontentItemHeader {
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
        }
      }
      footer: kontentItemFooter {
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
  `)

  useEffect(() => {
    // This is just an example of SDK initialization inside ES6 module.
    // HTML markup should still contain all necessary data-attributes (e.g. .layout element).
    const kontentSmartLink = KontentSmartLink.initialize({
      queryParam: 'enable-ksl-sdk',
    })
    return () => {
      kontentSmartLink.destroy()
    }
  })

  const navLogo = data.header.elements.logo
  const navLinks = prepareDataLinks(data.header.elements.menu.value)
  const footerLinks = prepareDataLinks(data.footer.elements.menu.value)
  const footerText = data.footer.elements.text.value

  return (
    <div
      className="layout"
      data-kontent-project-id={process.env.GATSBY_KONTENT_PROJECT_ID}
      data-kontent-language-codename={process.env.GATSBY_KONTENT_LANGUAGE_CODENAMES}
    >
      <NavbarDefault navLogo={navLogo} navLinks={navLinks} />
      {children}
      <FooterDefault footerLinks={footerLinks} footerText={footerText} />
    </div>
  )
}

export default Layout
