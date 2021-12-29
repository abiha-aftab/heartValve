import React from 'react'
import { Link } from 'gatsby'
import { isExternalUrl } from '../../utils/links'

// Gatsby's Link only handles internal routes; CMS links can be either.
const SiteLink = ({ to, children, activeClassName, partiallyActive, ...props }) =>
  isExternalUrl(to) ? (
    <a href={to} target="_blank" rel="noopener noreferrer" {...props}>
      {children}
    </a>
  ) : (
    <Link
      to={to}
      activeClassName={activeClassName}
      partiallyActive={partiallyActive}
      {...props}
    >
      {children}
    </Link>
  )

export default SiteLink
