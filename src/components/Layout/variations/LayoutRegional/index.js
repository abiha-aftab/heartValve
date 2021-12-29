import React, { useEffect, useState } from 'react'
import '../../../../assets/scss/main.scss'
import { prepareDataLinks } from '../../../../utils/prepareDataLinks'
import NavbarRegional from '../../../../containers/Navbar/variants/NavbarRegional'
import FooterRegional from '../../../../containers/Footer/variants/FooterRegional'
import KontentSmartLink from '@kontent-ai/smart-link'

const LayoutRegional = ({ children, languageCode, header, footer }) => {
  const [languages, setLanguages] = useState([])

  useEffect(() => {
    const deliveryApiUrl = process.env.GATSBY_DELIVERY_API_URL
    const projectId = process.env.GATSBY_KONTENT_PROJECT_ID
    // Offline builds have neither, and the selector is simply not shown.
    if (languages.length || !deliveryApiUrl || !projectId) return
    fetch(`${deliveryApiUrl}${projectId}/languages`)
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`)
        return response.json()
      })
      .then((results) => {
        const tmp = []
        results.languages?.forEach((language) => {
          const { codename, name } = language.system
          if (codename !== 'default')
            tmp.push({ name: name, url: `/${codename}` })
        })
        setLanguages(tmp)
      })
      .catch((error) => {
        console.warn('Could not load the language list from Kontent', error)
      })
  }, [])

  useEffect(() => {
    const kontentSmartLink = KontentSmartLink.initialize({
      queryParam: 'enable-ksl-sdk',
    })
    return () => {
      kontentSmartLink.destroy()
    }
  }, [])

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
      data-kontent-environment-id={process.env.GATSBY_KONTENT_PROJECT_ID}
      data-kontent-language-codename={languageCode}
    >
      <NavbarRegional
        languageCode={languageCode}
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
