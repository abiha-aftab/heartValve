import React from 'react'
import Item from './Item'
import Dropdown from './Dropdown'

const Nav = ({ navLinks, mobile, activeDropdown, setActiveDropdown, languages = [], languageSelectorText }) => {
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
      {languages.length > 0 &&
        <Dropdown
          key={languages.length}
          id={languages.length}
          link={null}
          activeDropdown={activeDropdown}
          setActiveDropdown={setActiveDropdown}
          languages={languages}
          languageSelectorText={languageSelectorText}
        />
      }
    </ul>
  )
}

export default Nav
