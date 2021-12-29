import React, { useEffect, useState } from 'react'
import '../../../../assets/scss/main.scss'
import { prepareDataLinks } from '../../../../utils/prepareDataLinks'
import NavbarRegional from '../../../../containers/Navbar/variants/NavbarRegional'
import FooterRegional from '../../../../containers/Footer/variants/FooterRegional'
import KontentSmartLink from '@kentico/kontent-smart-link'

const LayoutRegional = ({ children, languageCode, header, footer }) => {
  const [languages, setLanguages] = useState([])

  useEffect(() => {
    if (!languages.length) {
      fetch(
        `${process.env.GATSBY_DELIVERY_API_URL}${process.env.GATSBY_KONTENT_PROJECT_ID}/languages`
      )
        .then((response) => response.json())
        .then((results) => {
          const tmp = []
          results.languages?.forEach((language) => {
            const { codename, name } = language.system
            if (codename !== 'default')
              tmp.push({ name: name, url: `/${codename}` })
          })
          setLanguages(tmp)
        })
    }
  }, [])

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

  const navLogo = header.elements.logo
  const navLinks = prepareDataLinks(
    header.elements.menu.value,
    languageCode,
    'header'
  )
  const languageSelectorText = header.elements.language_selector?.value
  const footerLinks = prepareDataLinks(
    footer.elements.menu.value,
    languageCode,
    'footer'
  )
  const footerText = footer.elements.text.value

  return (
    <div
      className="layout"
      data-kontent-project-id={process.env.GATSBY_KONTENT_PROJECT_ID}
      data-kontent-language-codename={languageCode}
    >
      <NavbarRegional
        navLogo={navLogo}
        navLinks={navLinks}
        languages={languages}
        languageSelectorText={languageSelectorText}
      />
      {children}
      <FooterRegional footerLinks={footerLinks} footerText={footerText} />
    </div>
  )
}

export default LayoutRegional
