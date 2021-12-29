import React, { useId, useState } from 'react'
import { FaCaretDown, FaCaretUp } from 'react-icons/fa'
import { motion, AnimatePresence } from 'framer-motion'
import { dropdownVariant } from '../../../../assets/animations/animations'
import SiteLink from '../../../SiteLink'
import { isExternalUrl } from '../../../../utils/links'

const itemUrl = (slug, categorySlug, languageCode) => {
  if (isExternalUrl(slug)) return slug
  const languagePath = languageCode ? `/${languageCode}` : ''
  const itemSlug = slug.replace(/^\/+|\/+$/g, '')
  return categorySlug === itemSlug
    ? `${languagePath}/${itemSlug}`
    : `${languagePath}/${categorySlug}/${itemSlug}`
}

// A CMS-driven "jump to" menu shown below a page's content.
const Dropdown = ({ dropdown, categorySlug, languageCode = null }) => {
  const {
    title: { value: title },
    items: { value: items },
  } = dropdown.elements
  const { id, codename } = dropdown.system
  const [isOpen, setIsOpen] = useState(false)
  const menuId = useId()
  return (
    <div className="dropdownDefault" data-kontent-item-id={id}>
      <button
        type="button"
        className="dropdownDefault__button btn btn-blue"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls={menuId}
        data-kontent-element-codename={codename}
      >
        {title}{' '}
        {isOpen ? (
          <FaCaretUp aria-hidden="true" />
        ) : (
          <FaCaretDown aria-hidden="true" />
        )}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.ul
            id={menuId}
            variants={dropdownVariant}
            initial="start"
            animate="end"
            exit="exit"
            className="dropdownDefault__dropdown"
          >
            {items.map((item) => (
              <li
                className="dropdownDefault__dropdown-item"
                key={item.system.id}
                data-kontent-item-id={item.system.id}
                data-kontent-element-codename={item.system.codename}
              >
                <SiteLink
                  to={itemUrl(
                    item.elements.url.value,
                    categorySlug,
                    languageCode
                  )}
                  className="dropdownDefault__dropdown-link"
                  onClick={() => setIsOpen(false)}
                >
                  {item.elements.title.value}
                </SiteLink>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Dropdown
