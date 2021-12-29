import React, { useEffect, useId, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  backdropVariants,
  modalVariants,
} from '../../assets/animations/animations'
import RichText from '../RichText'

// Disclaimer dialog: focus moves into it on open, Escape or a click on the
// backdrop closes it, and focus returns to the button that opened it.
const Modal = ({ modalData, trigger }) => {
  const [{ elements, system }] = modalData
  const [showModal, setShowModal] = useState(false)
  const triggerRef = useRef(null)
  const closeRef = useRef(null)
  const titleId = useId()
  const wasOpen = useRef(false)

  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = 'hidden'
      closeRef.current?.focus()
      wasOpen.current = true
    } else {
      document.body.style.overflow = ''
      if (wasOpen.current) triggerRef.current?.focus()
    }
  }, [showModal])

  useEffect(() => {
    if (!showModal) return undefined
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setShowModal(false)
    }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [showModal])

  const closeFromBackdrop = (event) => {
    if (!event.target.closest('.modal__content')) setShowModal(false)
  }

  return (
    <div data-kontent-item-id={system.id}>
      <button
        ref={triggerRef}
        type="button"
        className="btn btn-blue"
        onClick={() => setShowModal(true)}
        aria-haspopup="dialog"
        data-kontent-element-codename={system.codename}
      >
        {trigger}
      </button>
      <AnimatePresence mode="wait">
        {showModal && (
          <motion.div
            className="backdrop"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={closeFromBackdrop}
          >
            <motion.div
              className="modal"
              variants={modalVariants}
              role="dialog"
              aria-modal="true"
              aria-labelledby={titleId}
            >
              <div className="modal__content">
                <div className="modal__header">
                  <h2
                    id={titleId}
                    className="modal__title"
                    data-kontent-element-codename={system.codename}
                  >
                    {elements.title.value}
                  </h2>
                  <button
                    ref={closeRef}
                    type="button"
                    className="modal__close"
                    aria-label="Close"
                    onClick={() => setShowModal(false)}
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div
                  className="modal__body"
                  data-kontent-element-codename={system.codename}
                >
                  <RichText value={elements.body.value} />
                </div>
                <div className="modal__footer">
                  <button
                    type="button"
                    className="btn btn-crimson"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Modal
