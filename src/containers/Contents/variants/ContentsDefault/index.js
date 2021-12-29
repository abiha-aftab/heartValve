import React, { useState, useEffect } from 'react'
import { Link } from 'gatsby'
import {
  ImageElement,
  RichTextElement,
} from '@kentico/gatsby-kontent-components'

const ContentsDefault = ({ data }) => {
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
  const { codename, id } = data.system
  const {
    alt: { value: image_alt },
    asset: {
      value: [image_asset],
    },
  } = image.elements
  return (
    <section className="section bg-slate-2" data-kontent-item-id={id}>
      <div className="container grid-1 grid-md-2">
        <div
          className="order-2 order-md-1 contentDefault"
          data-kontent-element-codename={codename}
        >
          <RichTextElement value={body.value} />
          {anchors.map((anchor) => {
            const {
              name: { value: name },
              url: { value: url },
              aria_label: { value: aria_label },
            } = anchor.elements
            const { id, codename } = anchor.system
            return (
              <Link
                key={codename}
                data-kontent-item-id={id}
                data-kontent-element-codename={codename}
                to={url}
                aria-label={aria_label || name}
                className="btn btn-blue"
              >
                {name}
              </Link>
            )
          })}
        </div>
        <ImageElement
          data-kontent-item-id={image.system.id}
          data-kontent-element-codename={image.system.codename}
          image={image_asset}
          className="order-1 order-md-2"
          alt={image_alt || 'Patient with doctor'}
        />
      </div>
    </section>
  )
}

export default ContentsDefault
