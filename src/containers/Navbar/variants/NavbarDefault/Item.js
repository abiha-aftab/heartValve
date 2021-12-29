import React from 'react'
import SiteLink from '../../../../components/SiteLink'

const Item = ({ link: { name, url } }) => (
  <li className="navbarDefault__nav-item">
    <SiteLink
      to={url}
      className="navbarDefault__nav-link"
      activeClassName="navbarDefault__nav-link--active"
    >
      {name}
    </SiteLink>
  </li>
)

export default Item
