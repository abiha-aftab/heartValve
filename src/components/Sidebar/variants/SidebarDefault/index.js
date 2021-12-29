import React, { useEffect, useState } from 'react'
import { FaCaretDown, FaCaretUp } from 'react-icons/fa'
import List from './List'

const DESKTOP_QUERY = '(min-width: 768px)'

// Always expanded on desktop; collapsible behind a "Select page" button on
// small screens. Server HTML renders it expanded so it works without JS.
const SidebarDefault = ({ sidebarLinks = null }) => {
  const [isOpen, setIsOpen] = useState(true)
  useEffect(() => {
    const desktop = window.matchMedia(DESKTOP_QUERY)
    const syncWithViewport = () => setIsOpen(desktop.matches)
    syncWithViewport()
    desktop.addEventListener('change', syncWithViewport)
    return () => desktop.removeEventListener('change', syncWithViewport)
  }, [])
  if (!sidebarLinks) return null
  return (
    <aside className="sidebarDefault" aria-label="Section pages">
      <button
        type="button"
        className="sidebarDefault__toggle btn btn-blue"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls="section-pages"
      >
        Select page{' '}
        {isOpen ? (
          <FaCaretUp aria-hidden="true" />
        ) : (
          <FaCaretDown aria-hidden="true" />
        )}
      </button>
      <List id="section-pages" hidden={!isOpen} sidebarLinks={sidebarLinks} />
    </aside>
  )
}

export default SidebarDefault
