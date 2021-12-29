import React from 'react'
import { Link } from 'gatsby'
import SiteLink from '../../../../components/SiteLink'
import { RichTextElement } from '@kontent-ai/gatsby-components'

const FooterDefault = ({ footerLinks = null, footerText = null }) => {
  return (
    <footer className="footerDefault section bg-slate">
      <div className="container">
        <div className="gap-2 grid-md-4">
          {footerLinks.map((item, index) => {
            const { name, url, links } = item
            return (
              <div className="footerDefault__item" key={index}>
                <h2 className="footerDefault__title">
                  <Link to={url} className="footerDefault__title-link">
                    {name}
                  </Link>
                </h2>
                <ul className="footerDefault__list">
                  {links.map((link, index) => {
                    const { name, url } = link
                    return (
                      <li className="footerDefault__list-item" key={index}>
                        <SiteLink to={url} className="footerDefault__list-link">
                          {name}
                        </SiteLink>
                      </li>
                    )
                  })}
                </ul>
              </div>
            )
          })}
        </div>
        {footerText && (
          <>
            <hr />
            <div className="footerDefault__footer-text">
              <div id="teconsent"></div>
              <RichTextElement value={footerText} />
            </div>
          </>
        )}
      </div>
    </footer>
  )
}

export default FooterDefault
