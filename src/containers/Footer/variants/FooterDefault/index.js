import React from 'react'
import { Link } from 'gatsby'
import { RichTextElement } from '@kentico/gatsby-kontent-components'

const FooterDefault = ({ footerLinks = null, footerText = null }) => {
  return (
    <footer className="footerDefault section bg-slate">
      <div className="container">
        <div className="gap-2 grid-md-4">
          {footerLinks.map((item, index) => {
            const { name, url, links } = item
            return (
              <div className="footerDefault__item" key={index}>
                <Link to={url} className="footerDefault__title-link">
                  <h4 className="footerDefault__title">{name}</h4>
                </Link>
                <ul className="footerDefault__list">
                  {links.map((link, index) => {
                    const { name, url } = link
                    return (
                      <li className="footerDefault__list-item" key={index}>
                        {url.indexOf('https') !== -1 ? (
                          <a href={url} target="_blank" rel="noreferrer" className="footerDefault__list-link">
                            {name}
                          </a>
                        ) : (
                          <Link to={url} className="footerDefault__list-link">
                            {name}
                          </Link>
                        )}
                      </li>
                    )
                  })}
                </ul>
              </div>
            )
          })}
        </div>
        {footerText &&
          <>
            <hr/>
            <div className="footerDefault__footer-text">
              <div id="teconsent"></div>
              <RichTextElement value={footerText} />
            </div>
          </>
        }
      </div>
    </footer>
  )
}

export default FooterDefault
