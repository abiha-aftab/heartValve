import React from 'react'
import { ImageElement } from '@kontent-ai/gatsby-components'
import { StaticImage } from 'gatsby-plugin-image'

// Decorative page banner: empty alt text unless the CMS provides one.
const HeroSmall = ({ image }) => {
  const asset = image?.elements.asset.value[0]
  return (
    <div
      className="heroSmall__wrapper"
      data-kontent-item-id={image?.system.id}
      data-kontent-element-codename={image?.system.codename}
    >
      {asset ? (
        <ImageElement
          image={asset}
          className="heroSmall"
          alt={image.elements.alt.value || ''}
          layout="fullWidth"
        />
      ) : (
        <StaticImage
          className="heroSmall"
          src="../../../../assets/images/page-banner.jpeg"
          alt=""
          layout="fullWidth"
        />
      )}
    </div>
  )
}

export default HeroSmall
