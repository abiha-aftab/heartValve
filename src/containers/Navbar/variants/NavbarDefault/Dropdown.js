import React, { useEffect, useRef } from 'react'
import { FaCaretDown, FaCaretUp } from 'react-icons/fa'
import { motion, AnimatePresence } from 'framer-motion'
import { dropdownVariant } from '../../../../assets/animations/animations'
import SiteLink from '../../../../components/SiteLink'
import { useCurrentPath } from '../../../../utils/useCurrentPath'

const Dropdown = ({
  id,
  label,
  icon = null,
  url = '',
  links,
  isOpen,
  onToggle,
  onClose,
  alignRight = false,
}) => {
  const buttonRef = useRef(null)
  const currentPath = useCurrentPath()
  const isCurrentSection =
    url !== '' && url !== '/' && currentPath.startsWith(url)
  const menuId = `navbar-menu-${id}`

  useEffect(() => {
    if (!isOpen) return undefined
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') {
        onClose()
        buttonRef.current?.focus()
      }
    }
    document.addEventListener('keydown', closeOnEscape)
    return () => document.removeEventListener('keydown', closeOnEscape)
  }, [isOpen, onClose])

  return (
    <li className="navbarDefault__nav-item">
      <button
        ref={buttonRef}
        type="button"
        className={
          isOpen || isCurrentSection
            ? 'navbarDefault__nav-link navbarDefault__nav-link--active'
            : 'navbarDefault__nav-link'
        }
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={menuId}
      >
        {icon} {label}{' '}
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
            key={menuId}
            variants={dropdownVariant}
            initial="start"
            animate="end"
            exit="exit"
            className={`navbarDefault__dropdown${alignRight ? ' regional' : ''}`}
          >
            {links.map((link) => (
              <li className="navbarDefault__dropdown-item" key={link.url}>
                <SiteLink
                  to={link.url}
                  className="navbarDefault__dropdown-link"
                  onClick={onClose}
                >
                  {link.name}
                </SiteLink>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </li>
  )
}

export default Dropdown
