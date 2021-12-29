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

  return (
    <ul className="paginationDefault">
      {links.length > 1 &&
        links.map((link, index) => {
          const { text, url } = link
          const counter = index + 1
          if (counter !== links.length) {
            return (
              <li className="paginationDefault__item" key={index}>
                <Link to={url} className="paginationDefault__link">
                  {text}
                </Link>
                <FaAngleDoubleRight className="paginationDefault__icon" />
              </li>
            )
          } else {
            return (
              <li
                className="paginationDefault__item"
                key={index}
                data-kontent-item-id={pageId}
                data-kontent-element-codename={pageCodename}
              >
                <Link to={url} className="paginationDefault__link">
                  {text}
                </Link>
              </li>
            )
          }
        })}
    </ul>
  )
}

export default PaginationDefault
