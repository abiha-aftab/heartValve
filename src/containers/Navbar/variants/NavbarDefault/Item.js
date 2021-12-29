import React from 'react'
import { Link } from 'gatsby'

const Item = ({ link, index }) => {
  const { name, url } = link
  return (
    <li className="navbarDefault__nav-item" key={index}>
      <Link
        to={url}
        className="navbarDefault__nav-link"
        activeClassName="navbarDefault__nav-link--active"
      >
        {name}
      </Link>
    </li>
  )
}

export default Item
