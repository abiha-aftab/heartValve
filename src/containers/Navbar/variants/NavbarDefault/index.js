import React, { useState } from 'react'
import { Link } from 'gatsby'
import { FiMenu, FiX } from 'react-icons/fi'
import { FaGlobeAmericas } from 'react-icons/fa'
import Dropdown from './Dropdown'
import Item from './Item'

const LANGUAGE_MENU = 'languages'

// Shared by the default and regional layouts. Regional sites pass their
// home path and, when Kontent returns them, the list of language sites.
const NavbarDefault = ({
  navLogo,
  navLinks = [],
  homePath = '/',
  languages = [],
  languageSelectorText,
}) => {
  const [activeDropdown, setActiveDropdown] = useState(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const image = navLogo?.value?.[0]
  const toggleDropdown = (id) =>
    setActiveDropdown((current) => (current === id ? null : id))
  const closeDropdown = () => setActiveDropdown(null)

  return (
    <nav className="navbarDefault" aria-label="Main">
      <div className="navbarDefault__container">
        <div className="navbarDefault__top">
          <Link
            to={homePath}
            className="navbarDefault__brand"
            aria-label={image ? undefined : 'YourHeartValve home'}
          >
            {image ? (
              <img
                src={image.elements.asset.value[0].url}
                className="navbarDefault__logo"
                alt={image.elements.alt.value || 'YourHeartValve home'}
              />
            ) : (
              <span className="navbarDefault__wordmark" aria-hidden="true">
                Your<span>HeartValve</span>
              </span>
            )}
          </Link>
          <button
            type="button"
            className="navbarDefault__toggle"
            onClick={() => setMobileOpen((open) => !open)}
            aria-expanded={mobileOpen}
            aria-controls="main-navigation"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileOpen ? (
              <FiX aria-hidden="true" />
            ) : (
              <FiMenu aria-hidden="true" />
            )}
          </button>
        </div>
        <ul
          id="main-navigation"
          className={
            mobileOpen
              ? 'navbarDefault__nav navbarDefault__nav--active'
              : 'navbarDefault__nav'
          }
        >
          {navLinks.map((link, index) =>
            link.links.length ? (
              <Dropdown
                key={link.url}
                id={index}
                label={link.name}
                url={link.url}
                links={link.links}
                isOpen={activeDropdown === index}
                onToggle={() => toggleDropdown(index)}
                onClose={closeDropdown}
              />
            ) : (
              <Item key={link.url} link={link} />
            )
          )}
          {languages.length > 0 && (
            <Dropdown
              id={LANGUAGE_MENU}
              label={languageSelectorText || 'Countries'}
              icon={<FaGlobeAmericas aria-hidden="true" />}
              links={languages}
              isOpen={activeDropdown === LANGUAGE_MENU}
              onToggle={() => toggleDropdown(LANGUAGE_MENU)}
              onClose={closeDropdown}
              alignRight
            />
          )}
        </ul>
      </div>
    </nav>
  )
}

export default NavbarDefault
