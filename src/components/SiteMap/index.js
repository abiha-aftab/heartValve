import React from 'react'
import { Link } from 'gatsby'
import PaginationDefault from '../Pagination/variants/PaginationDefault'
import HeroSmall from '../../containers/Hero/variants/HeroSmall'
import PageHeading from '../PageHeading'

const SiteMap = ({ groups, languageCode, siteMapPage }) => {
  const title = siteMapPage?.elements.title.value || 'Site map'
  const image = siteMapPage?.elements.image.value[0] || null
  return (
    <>
      <HeroSmall image={image} />
      <section className="section">
        <div className="container">
          <PageHeading
            title={title}
            itemId={siteMapPage?.system.id}
            codename={siteMapPage?.system.codename}
          />
          <PaginationDefault path="site-map" languageCode={languageCode} />
          <div className="gap-2 grid-md-3 mt-2">
            {groups.map((group) => (
              <div className="site-map-grid" key={group.name}>
                <h2 className="site-map-grid__title">{group.name}</h2>
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
