import React from 'react'
import { Link } from 'gatsby'
import PaginationDefault from '../Pagination/variants/PaginationDefault'
import HeroSmall from '../../containers/Hero/variants/HeroSmall'

const SiteMap = ({ groups, languageCode, siteMapPage }) => {
  const title = siteMapPage?.elements.title.value || 'Site map'
  const image = siteMapPage?.elements.image.value[0] || null
  return (
    <>
      <HeroSmall image={image} />
      <section className="section">
        <div className="container">
          <h2
            className="text-crimson"
            data-kontent-item-id={siteMapPage?.system.id}
            data-kontent-element-codename={siteMapPage?.system.codename}
          >
            {title}
          </h2>
          <PaginationDefault path="site-map" languageCode={languageCode} />
          <div className="gap-2 grid-md-3 mt-2">
            {groups.map((group) => (
              <div className="site-map-grid" key={group.name}>
                <h3>{group.name}</h3>
                <ul className="list list--unstyled">
                  {group.links.map((link) => (
                    <li className="list__item" key={link.url}>
                      <Link to={link.url}>{link.title}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default SiteMap
