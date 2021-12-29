import React, { Fragment } from 'react'
import { Link } from 'gatsby'
import PaginationDefault from '../Pagination/variants/PaginationDefault'
import SEO from '../SEO'
import HeroSmall from '../../containers/Hero/variants/HeroSmall'

const SiteMap = (data) => {
    const { result, languageCode, siteMapPage } = data;
    return (
        <Fragment>
            <SEO title={siteMapPage.elements.title.value} />
            <HeroSmall image={siteMapPage.elements.image.value ? siteMapPage.elements.image.value[0] : null} />
            <section className="section">
                <div className="container">
                    <h2
                        className="text-crimson"
                        data-kontent-item-id={siteMapPage.system.id}
                        data-kontent-element-codename={siteMapPage.system.codename}
                    >
                        {siteMapPage.elements.title.value}
                    </h2>
                    <PaginationDefault path={"site-map"} languageCode={languageCode} />
                    <div className="gap-2 grid-md-3 mt-2">
                        {Object.keys(result).map((item, i) => {
                            return (
                              <div className="site-map-grid">
                                <h3>{item}</h3>
                                {result[item].links.map((link, j) => {
                                    return <li key={j}>
                                        <Link to={link.elements.slug.value}>{link.elements.title.value}</Link>
                                    </li>
                                })}
                              </div>
                            )
                        })}
                    </div>
                </div>
            </section>
        </Fragment>
    )
}

export default SiteMap;
