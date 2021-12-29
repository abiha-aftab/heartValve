import React from 'react'
import CardBasic from '../../../../components/Card/variants/CardBasic'
import { prepareDataPatientInformation } from '../../../../utils/prepareDataPatientInformation'
import { RichTextElement } from '@kentico/gatsby-kontent-components'

const FeaturesDefault = ({ data }) => {
  if (!data) {
    return null
  }
  const {
    cards: { value: cards },
    body,
  } = data.elements
  const { id, codename } = data.system
  const cardsData = prepareDataPatientInformation(cards)
  return (
    <section className="section" data-kontent-item-id={id}>
      <div className="container-sm">
        <div
          className="text-center lead"
          data-kontent-element-codename={codename}
        >
          <RichTextElement value={body.value} />
        </div>
        <div
          className="grid-md-2 gap-1 gap-md-2"
          data-kontent-element-codename={codename}
        >
          {cardsData.map((card, index) => {
            return <CardBasic data={card} id={id} key={index} />
          })}
        </div>
      </div>
    </section>
  )
}

export default FeaturesDefault
