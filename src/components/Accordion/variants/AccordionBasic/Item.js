import React, { useId } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import RichText from '../../../RichText'

const accordionVariant = {
  collapsed: { height: 0, opacity: 0 },
  open: { height: 'auto', opacity: 1 },
}

const AccordionItem = ({ item, index, isActive, setIsActive }) => {
  const {
    title: { value: title },
    description: { value: body, modular_content },
  } = item.elements
  const { id, codename } = item.system
  const isOpen = isActive === index
  const buttonId = useId()
  const panelId = useId()

  return (
    <div
      className={
        isOpen
          ? 'accordionBasic__item accordionBasic__item--active'
          : 'accordionBasic__item'
      }
    >
      <h3 className="accordionBasic__heading">
        <button
          type="button"
          id={buttonId}
          className="accordionBasic__button"
          onClick={() => setIsActive(isOpen ? null : index)}
          aria-expanded={isOpen}
          aria-controls={panelId}
          data-kontent-item-id={id}
          data-kontent-element-codename={codename}
        >
          {title}
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key={panelId}
            id={panelId}
            role="region"
            aria-labelledby={buttonId}
            variants={accordionVariant}
            initial="collapsed"
            animate="open"
            exit="collapsed"
            transition={{ duration: 0.3 }}
            className="accordionBasic__body"
          >
            <div
              className="accordionBasic__content"
              data-kontent-item-id={id}
              data-kontent-element-codename={codename}
            >
              <RichText value={body} linkedItems={modular_content} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default AccordionItem
