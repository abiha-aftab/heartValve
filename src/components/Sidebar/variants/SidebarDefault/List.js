import React from 'react'
import SiteLink from '../../../SiteLink'

const List = ({ sidebarLinks }) => {
  return (
    <ul className="sidebarDefault__list">
      {sidebarLinks.map((link) => {
        return link.url === '' ? (
          <li
            className="sidebarDefault__item sidebarDefault__item--headline"
            key={link.url}
          >
            {link.name}
          </li>
        ) : (
          <li className="sidebarDefault__item" key={link.url}>
            <SiteLink
              to={link.url}
              className="sidebarDefault__link"
              activeClassName="sidebarDefault__link--active"
            >
              {link.name}
            </SiteLink>
          </li>
        )
      })}
    </ul>
  )
}

export default List
