import React, { useState } from 'react'
import AccordionItem from './Item'

const AccordionBasic = ({ data = null }) => {
  const [isActive, setIsActive] = useState(null)
  if (!data) return
  
  const {
    accordion_items: { value: accordion_items },
  } = data[0].elements
  const { id } = data[0].system
  return (
    <div className="accordionBasic" 
      data-kontent-item-id={id}
      data-kontent-element-codename="accordions"
      data-kontent-add-button
      data-kontent-add-button-render-position="bottom"
      data-kontent-add-button-insert-position="after">
      {accordion_items.map((item, index) => {
        return (
          <AccordionItem
            item={item}
            key={index}
            index={index}
            isActive={isActive}
            setIsActive={setIsActive}
            accordianId={id}
          />
        )
      })}
    </div>
  )
}

export default AccordionBasic
