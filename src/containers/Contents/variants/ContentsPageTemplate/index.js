import React from 'react'
import AccordionBasic from '../../../../components/Accordion/variants/AccordionBasic'
import Modal from '../../../../components/Modal'
import RichText from '../../../../components/RichText'
import FormBasic from '../../../../components/Form/variants/FormBasic'

const ContentsPageTemplate = ({
  path,
  body,
  accordions,
  modal,
  marketo_form,
  itemId,
  itemCodename,
}) => {
  return (
    <>
      <div data-kontent-item-id={itemId}>
        <div
          className="contentPage"
          data-kontent-element-codename={itemCodename}
        >
          <RichText value={body.value} linkedItems={body.modular_content} />
        </div>
        {accordions.length > 0 && <AccordionBasic data={accordions} />}
        {modal.length > 0 &&
          (path.indexOf('heart-basics/') !== -1 ||
            path.indexOf('treatment-options/') !== -1) && (
            <Modal
              modalData={modal}
              trigger={
                modal[0].elements.toggle_text.value ||
                'This information is not a substitute for talking with your doctor.'
              }
            />
          )}
        {marketo_form.length > 0 && (
          <div className="marketo-form-container">
            <FormBasic
              id={marketo_form[0].elements.id.value.replace('mktoForm_', '')}
            />
            {marketo_form[0].elements.footnotes && (
              <RichText value={marketo_form[0].elements.footnotes.value} />
            )}
          </div>
        )}
      </div>
    </>
  )
}

export default ContentsPageTemplate
