import React, { useEffect } from 'react'
import '../../../../assets/scss/main.scss'
import FooterDefault from '../../../../containers/Footer/variants/FooterDefault'
import NavbarDefault from '../../../../containers/Navbar/variants/NavbarDefault'
import { useStaticQuery, graphql } from 'gatsby'
import { prepareDataLinks } from '../../../../utils/prepareDataLinks'
import KontentSmartLink from '@kontent-ai/smart-link'
import { MotionConfig } from 'framer-motion'

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query NavigationQuery {
      header: kontentItemHeader(system: { language: { eq: "default" } }) {
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
      footer: kontentItemFooter(system: { language: { eq: "default" } }) {
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
    const kontentSmartLink = KontentSmartLink.initialize({
      queryParam: 'enable-ksl-sdk',
    })
    return () => {
      kontentSmartLink.destroy()
    }
  }, [])

  const navLogo = data.header.elements.logo
  const navLinks = prepareDataLinks(data.header.elements.menu.value)
  const footerLinks = prepareDataLinks(data.footer.elements.menu.value)
  const footerText = data.footer.elements.text.value

  return (
    <div
      className="layout"
      data-kontent-environment-id={process.env.GATSBY_KONTENT_PROJECT_ID}
      data-kontent-language-codename="default"
    >
      <MotionConfig reducedMotion="user">
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <NavbarDefault navLogo={navLogo} navLinks={navLinks} />
        <main id="main">{children}</main>
        <FooterDefault footerLinks={footerLinks} footerText={footerText} />
      </MotionConfig>
    </div>
  )
}

export default Layout
