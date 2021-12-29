import React from 'react'
import { FaCaretDown, FaCaretUp, FaGlobeAmericas } from 'react-icons/fa'
import { motion, AnimatePresence } from 'framer-motion'
import { dropdownVariant } from '../../../../assets/animations/animations'
import { Link } from 'gatsby'

const Dropdown = ({
  activeDropdown,
  setActiveDropdown,
  id,
  link,
  languages = [],
  languageSelectorText = null
}) => {
  let name = ''
  let url = ''
  let links = []
  if(link) {
    name = link.name
    url = link.url
    links = link.links
  } else {
    links = languages
  }
  const toggleDropdown = (e, id) => {
    e.preventDefault()
    if (activeDropdown === id) {
      setActiveDropdown(null)
    } else {
      setActiveDropdown(id)
    }
  }

  const isBrowser = () => typeof window !== "undefined"

  return (
    <li className="navbarDefault__nav-item">
      <button
        className={
          activeDropdown === id || (isBrowser() && window.location.pathname.indexOf(url) !== -1 && languages.length === 0)
            ? 'navbarDefault__nav-link navbarDefault__nav-link--active'
            : 'navbarDefault__nav-link'
        }
        onClick={(e) => toggleDropdown(e, id)}
        aria-expanded={activeDropdown === id ? "true":"false"}
      >
        {languages.length > 0 ? <><FaGlobeAmericas /> {languageSelectorText || "Countries"}</> : name} {activeDropdown === id ? <FaCaretUp /> : <FaCaretDown />}
      </button>
      <AnimatePresence>
        {activeDropdown === id && (
          <motion.ul
            key={id}
            variants={dropdownVariant}
            initial="start"
            animate="end"
            exit="exit"
            className={`navbarDefault__dropdown${languageSelectorText && ' regional'}`}
            aria-label={name}
          >
            {links.map((link, index) => {
              const { name, url } = link
              return (
                <li className="navbarDefault__dropdown-item" key={index}>
                  {
                    url.indexOf('https') !== -1
                      ? <a href={url} target="_blank" rel="noreferrer" className="navbarDefault__dropdown-link">{name}</a>
                      : <button onClick={(e) => toggleDropdown(e, id)}><Link to={url} className="navbarDefault__dropdown-link">{name}</Link></button>
                  }
                </li>
              )
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </li>
  )
}

export default Dropdown
