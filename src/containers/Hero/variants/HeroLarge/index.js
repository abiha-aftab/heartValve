import React from 'react'
import SiteLink from '../../../../components/SiteLink'
import { ImageElement, RichTextElement } from '@kontent-ai/gatsby-components'

const HeroLarge = ({ data }) => {
  if (!data) {
    return null
  }
  const {
    body,
    anchors: { value: anchors },
    images: {
      value: [image],
    },
  } = data.elements
  const { id, codename } = data.system
  const image_alt = image?.elements.alt.value || ''
  const image_asset = image?.elements.asset.value[0]

  return (
    <section className="heroLarge" data-kontent-item-id={id}>
      <div className="heroLarge__container">
        <div
          className="heroLarge__content"
          data-kontent-element-codename={codename}
        >
          <RichTextElement value={body.value} />
          {anchors.map((anchor) => {
            const {
              name: { value: name },
              url: { value: url },
              aria_label: { value: aria_label },
            } = anchor.elements
            const { id } = anchor.system
            return (
              <SiteLink
                key={id}
                to={url}
                aria-label={aria_label || name}
                className="heroLarge__btn btn btn-blue"
                data-kontent-item-id={id}
                data-kontent-element-codename="anchors"
                data-kontent-add-button
                data-kontent-add-button-render-position="right"
                data-kontent-add-button-insert-position="after"
              >
                {name}
              </SiteLink>
            )
          })}
        </div>
      </div>
      {image_asset && (
        <ImageElement
          image={image_asset}
          className="heroLarge__image"
          alt={image_alt}
        />
      )}
    </section>
  )
}

export default HeroLarge
