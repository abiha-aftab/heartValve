import React from 'react'
import { Link } from 'gatsby'

// Page title as the single <h1>, with the section it belongs to as a link
// above it when the page is not the section landing page itself.
const PageHeading = ({ title, category, categoryUrl, itemId, codename }) => (
  <header className="pageHeading">
    {category && category !== title && (
      <p className="pageHeading__category">
        <Link to={categoryUrl}>{category}</Link>
      </p>
    )}
    <h1
      className="pageHeading__title"
      data-kontent-item-id={itemId}
      data-kontent-element-codename={codename}
    >
      {title}
    </h1>
  </header>
)

export default PageHeading
