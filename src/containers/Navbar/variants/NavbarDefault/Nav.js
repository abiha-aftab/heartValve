import React from 'react'
import Item from './Item'
import Dropdown from './Dropdown'

const Nav = ({ navLinks, mobile, activeDropdown, setActiveDropdown }) => {
  return (
    <ul
      className={
        mobile
          ? 'navbarDefault__nav navbarDefault__nav--active'
          : 'navbarDefault__nav'
      }
    >
      {navLinks.map((link, index) => {
        const { links } = link
        if (!links.length) {
          return <Item link={link} key={index} index={index} />
        } else {
          return (
            <Dropdown
              key={index}
              id={index}
              link={link}
              activeDropdown={activeDropdown}
              setActiveDropdown={setActiveDropdown}
            />
          )
        }
      })}
    </ul>
  )
}

export default Nav
