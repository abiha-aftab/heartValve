import React, { useState } from 'react'
import { FaCaretDown, FaCaretUp } from 'react-icons/fa'
import { motion, AnimatePresence } from 'framer-motion'
import { dropdownVariant } from '../../../../assets/animations/animations'
import { Link } from 'gatsby'

const Dropdown = ({ dropdown, categorySlug, languageCode = null }) => {
  const {
    title: { value: title },
    items: { value: items },
  } = dropdown.elements
  const { id, codename } = dropdown.system
  const [activeDropdown, setActiveDropdown] = useState(false)
  const toggleDropdown = (e) => {
    e.preventDefault()
    setActiveDropdown(!activeDropdown)
  }
  return (
    <li className="dropdownDefault" data-kontent-item-id={id}>
      <button
        className="dropdownDefault__button btn btn-blue"
        onClick={(e) => toggleDropdown(e)}
        aria-expanded="false"
        data-kontent-element-codename={codename}
      >
        {title} {activeDropdown ? <FaCaretUp /> : <FaCaretDown />}
      </button>
      <AnimatePresence>
        {activeDropdown && (
          <motion.ul
            variants={dropdownVariant}
            initial="start"
            animate="end"
            exit="exit"
            className="dropdownDefault__dropdown"
            aria-label={title}
          >
            {items.map((item, index) => {
              const {
                title: { value: name },
                url: { value: slug },
              } = item.elements
              const { id, codename } = item.system
              const languagePath = languageCode ? `/${languageCode}` : ''
              const itemSlug = slug.replace(/^\/+|\/+$/g, '')
              const url =
                categorySlug === itemSlug
                  ? `${languagePath}/${itemSlug}`
                  : `${languagePath}/${categorySlug}/${itemSlug}`
              return (
                <li
                  className="dropdownDefault__dropdown-item"
                  key={index}
                  data-kontent-item-id={id}
                  data-kontent-element-codename={codename}
                >
                  {url.indexOf('https') !== -1 ? (
                    <a
                      href={url}
                      target="_blank"
                      rel="noreferrer"
                      className="dropdownDefault__dropdown-link"
                    >
                      {name}
                    </a>
                  ) : (
                    <button onClick={(e) => toggleDropdown(e)}>
                      <Link to={url} className="dropdownDefault__dropdown-link">
                        {name}
                      </Link>
                    </button>
                  )}
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
