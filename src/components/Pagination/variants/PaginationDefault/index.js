import React from 'react'
import { Link } from 'gatsby'
import { FaAngleDoubleRight } from 'react-icons/fa'

const PaginationDefault = ({
  path,
  languageCode = null,
  pageId,
  pageCodename,
  regionalMapping = null,
  footerLinksTranslations = null,
}) => {
  let links = []
  let incrementalPath = languageCode ? `/${languageCode}` : ''
  let homeText = {
    eu: 'Home',
    nl: 'Thuis',
    de: 'Startseite',
    es: 'Inicio',
    it: 'Home',
  }
  links.push({
    text: languageCode ? homeText[languageCode] : 'Home',
    url: languageCode ? `/${languageCode}` : '/',
  })
  path = path.split('/')
  path.forEach((item) => {
    if (languageCode && item === languageCode) return
    incrementalPath = `${incrementalPath}/${item}`
    if (regionalMapping) {
      let mapping = regionalMapping.filter(function (page) {
        return page.url === incrementalPath
      })
      if (mapping.length <= 0 && footerLinksTranslations) {
        mapping = footerLinksTranslations.filter(function (page) {
          return page.url === incrementalPath
        })
      }
      links.push({
        text:
          mapping.length > 0
            ? mapping[0].name
            : item.replace(/-/g, ' ').replace('faqs', 'FAQs'),
        url: incrementalPath,
      })
    } else {
      links.push({
        text: item.replace(/-/g, ' ').replace('faqs', 'FAQs'),
        url: incrementalPath,
      })
    }
  })

  if (links.length < 2) return null

  // Breadcrumb trail: every ancestor links up, the current page is marked.
  return (
    <nav aria-label="Breadcrumb">
      <ol className="paginationDefault">
        {links.map(({ text, url }, index) => {
          const isCurrent = index === links.length - 1
          return (
            <li
              className="paginationDefault__item"
              key={url}
              data-kontent-item-id={isCurrent ? pageId : undefined}
              data-kontent-element-codename={
                isCurrent ? pageCodename : undefined
              }
            >
              <Link
                to={url}
                className="paginationDefault__link"
                aria-current={isCurrent ? 'page' : undefined}
              >
                {text}
              </Link>
              {!isCurrent && (
                <FaAngleDoubleRight
                  className="paginationDefault__icon"
                  aria-hidden="true"
                />
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

export default PaginationDefault
