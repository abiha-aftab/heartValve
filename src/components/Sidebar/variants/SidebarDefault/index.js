import React, { useState, useLayoutEffect } from 'react'

import Dropdown from './Dropdown'
import List from './List'

const SidebarDefault = ({ sidebarLinks = null }) => {
  const [isOpen, setIsOpen] = useState(true)
  useLayoutEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(true)
      } else {
        setIsOpen(false)
      }
    }
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  if (!sidebarLinks) return
  return (
    <aside className="sidebarDefault">
      <Dropdown isOpen={isOpen} setIsOpen={setIsOpen} />
        {isOpen && <List sidebarLinks={sidebarLinks} />}
    </aside>
  )
}

export default SidebarDefault

// Have a seperate desktop and mobile component pass data into both.
