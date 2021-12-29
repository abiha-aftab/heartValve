import React from 'react'
import { Link } from 'gatsby'
import { RichTextElement } from '@kentico/gatsby-kontent-components'

const FooterRegional = ({ footerLinks = null, footerText = null }) => {
  return (
    <footer className="footerRegional section bg-slate">
      <div className="container">
        <ul className="footerRegional__list">
          {footerLinks.map((item, index) => {
            const { name, url } = item
            return (
              <li className="footerRegional__list-item" key={index}>
                <Link to={url} className="footerRegional__title-link">
                  <span className="footerRegional__title">{name}</span>
                </Link>
              </li>
            )
          })}
        </ul>
        {footerText &&
        <>
          <hr/>
          <div className="footerRegional__footer-text">
            <div id="teconsent"></div>
            <RichTextElement value={footerText} />
          </div>
        </>
        }
      </div>
    </footer>
  )
}

export default FooterRegional
