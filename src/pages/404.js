import React from 'react'
import HeroSmall from '../containers/Hero/variants/HeroSmall'
import { Link } from 'gatsby'
import SEO from '../components/SEO'
import Layout from '../components/Layout/variations/LayoutDefault'

const NotFound = () => {
  return (
    <Layout>
      <HeroSmall />
      <div className="section container">
        <h1 className="pageHeading__title">
          We’re sorry. The page you’re looking for can’t be found.
        </h1>
        <p>Can we help you find something? We have some suggestions below:</p>
        <ul className="list list--unstyled">
          <li className="list__item">
            <Link to="/" className="list__link">
              Home
            </Link>
          </li>
          <li className="list__item">
            <Link to="/site-map" className="list__link">
              Site Map
            </Link>
          </li>
          <li className="list__item">
            <Link to="/contact-us" className="list__link">
              Contact us
            </Link>
          </li>
        </ul>
      </div>
    </Layout>
  )
}

export default NotFound

export const Head = ({ location }) => (
  <SEO title="Not Found" pathname={location.pathname} />
)
