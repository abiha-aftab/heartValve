import React from 'react'
import { Link } from 'gatsby'
import { dropdownVariant } from '../../../../assets/animations/animations'

const List = ({ sidebarLinks }) => {
  return (
    <ul
      variants={dropdownVariant}
      className="sidebarDefault__list"
    >
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
            {link.url.indexOf('https') !== -1 ? (
              <a
                href={link.url}
                target="_blank"
                rel="noreferrer"
                className="sidebarDefault__link"
              >
                {link.name}
              </a>
            ) : (
              <Link
                to={link.url}
                className="sidebarDefault__link"
                activeClassName="sidebarDefault__link--active"
              >
                {link.name}
              </Link>
            )}
          </li>
        )
      })}
    </ul>
  )
}

export default List
