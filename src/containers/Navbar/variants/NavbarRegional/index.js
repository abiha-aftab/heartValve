import React, { useState } from 'react'
import { FiMenu } from 'react-icons/fi'
import Nav from './Nav'
import { Link } from 'gatsby'
import logo from '../../../../assets/images/logo.svg'

const NavbarRegional = ({ languageCode, navLogo, navLinks = null, languages = [], languageSelectorText }) => {
  const [activeDropdown, setActiveDropdown] = useState(null)
  const [mobile, setMobile] = useState(false)
  const toggleMobile = () => {
    setMobile(!mobile)
  }
  const {
    value: [image],
  } = navLogo
  return (
    <nav className="navbarDefault" role="navigation">
      <div className="navbarDefault__container">
        <div className="navbarDefault__top">
          <Link to={`/${languageCode}`}>
            <img
              src={image ? image.elements.asset.value[0].url : logo}
              className="navbarDefault__logo"
              alt={image ? image.elements.alt.value : 'YourHeartvalve logo'}
            />
          </Link>
          <button
            className="navbarDefault__toggle"
            onClick={toggleMobile}
            aria-expanded={mobile ? 'true' : 'false'}
          >
            <FiMenu />
          </button>
        </div>
        <Nav
          navLinks={navLinks}
          mobile={mobile}
          activeDropdown={activeDropdown}
          setActiveDropdown={setActiveDropdown}
          languages={languages}
          languageSelectorText={languageSelectorText}
        />
      </div>
    </nav>
  )
}

export default NavbarRegional
