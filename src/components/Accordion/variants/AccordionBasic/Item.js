import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { RichTextElement } from '@kentico/gatsby-kontent-components'

const AccordionItem = ({ item, index, isActive, setIsActive, accordianId }) => {
  const {
    title: { value: title },
    description: { value: body, modular_content },
  } = item.elements
  const { id, codename } = item.system
  const toggleActiveTab = (index) => {
    if (isActive === index) {
      setIsActive(null)
    } else {
      setIsActive(index)
    }
  }

  const accordionVariant = {
    collapsed: {
      height: 0,
      opacity: 0,
    },
    open: {
      height: 'auto',
      opacity: 1,
    },
  }

  return (
    <div
      className={
        isActive === index
          ? 'accordionBasic__item accordionBasic__item--active'
          : 'accordionBasic__item'
      }
    >
      <button
        className="accordionBasic__button"
        onClick={() => toggleActiveTab(index)}
        aria-expanded={isActive === index ? 'true' : 'false'}
        data-kontent-item-id={id}
        data-kontent-element-codename={codename}
      >
        {title}
      </button>
      <AnimatePresence initial={false}>
        {isActive === index && (
          <motion.div
            key={index}
            variants={accordionVariant}
            initial="collapsed"
            animate="open"
            exit="collapsed"
            transition={{ duration: 0.5 }}
            className="accordionBasic__body"
          >
            <div
              className="accordionBasic__content"
              data-kontent-item-id={id}
              data-kontent-element-codename={codename}
            >
              <RichTextElement
                value={body}
                linkedItems={modular_content}
                resolveLinkedItem={linkedItem => {
                  if (!linkedItem) {
                    return <strong style={{ color: "red" }}>⚠ Linked item is no longer in the response.</strong>
                  }
                  const { __typename, elements } = linkedItem;
                  // Case for multi columns
                  if (__typename === "kontent_item_summaries") {
                    return <div className="grid-1 grid-md-2 gap-1 gap-md-2">
                      {elements.rich_text.value.map((column, index) => {
                        return <div className={`column-grid column-${index}`} key={index}><RichTextElement value={column.elements.rich_text.value} /></div>
                      })}
                    </div>
                  }
                  return <strong style={{ color: "red" }}>⚠ Item not resolved.</strong>
                }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default AccordionItem
