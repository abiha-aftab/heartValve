import React from 'react'
import { ImageElement } from '@kentico/gatsby-kontent-components'

export const prepareDataPatientInformation = (data) => {
  let cards = []
  data.forEach((card) => {
    const {
      name: { value: card_name },
      image: {
        value: [image],
      },
      description: { value: description },
      anchor: {
        value: [anchor],
      },
    } = card.elements
    const { id, codename } = card.system
    const {
      name: { value: name },
      url: { value: url },
      aria_label: { value: aria_label },
    } = anchor.elements
    const {
      alt: { value: image_alt },
      asset: {
        value: [image_asset],
      },
    } = image.elements

    const icon = {
      url: image_asset.url,
      width: image_asset.width || 110,
      height: image_asset.height || 92,
    }

    cards.push({
      title: card_name,
      icon: <ImageElement image={icon} alt={image_alt} />,
      description: description,
      cta_text: name,
      cta_link: url,
      cta_aria_label: aria_label || `Learn more about ${card_name}`,
      variant: 'Basic',
      cardId: id,
      cardCodename: codename,
      anchorId: anchor.system.id,
      anchorCodename: anchor.system.codename,
      imageId: image.system.id,
      imageCodename: image.system.codename,
    })
  })
  return cards
}
