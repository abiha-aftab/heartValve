import React, { useEffect, useState } from 'react'
import AccordionBasic from '../../../../components/Accordion/variants/AccordionBasic'
import Modal from '../../../../components/Modal'
import { RichTextElement } from '@kentico/gatsby-kontent-components'
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
  const [trademarkInfo, settrademarkInfo] = useState([])
  let pagePath = path?.split('/')

  useEffect(() => {
    if (pagePath[2] && pagePath[2] === 'copyrights-trademarks') {
      async function fetchData() {
        await fetch(
          `https://edwardsprod.azurewebsites.net/Edwards.Core/Shared/Item/c7edaa8e963149c5a9b841aca4e5a228`
        )
          .then((response) => response.json())
          .then((results) => {
            if (body.value.includes(results)) {
              return
            }
            body.value =
              body.value +
              '<p>' +
              results?.languages[0]?.system?.codename +
              '</p>'
            settrademarkInfo(body.value)
            console.log(results)
          })
          .catch((error) => {
            console.log(error)
          })
      }
      fetchData()
    }
  }, [])

  return (
    <>
      <div data-kontent-item-id={itemId}>
        <div
          className="contentPage"
          data-kontent-element-codename={itemCodename}
        >
          <RichTextElement
            value={body.value}
            linkedItems={body.modular_content}
            resolveLinkedItem={(linkedItem) => {
              if (!linkedItem) {
                return (
                  <strong style={{ color: 'red' }}>
                    ⚠ Linked item is no longer in the response.
                  </strong>
                )
              }

              const { __typename, elements } = linkedItem
              // Case for multi columns
              if (__typename === 'kontent_item_summaries') {
                return (
                  <div className="grid-1 grid-md-2 gap-1 gap-md-2">
                    {elements.rich_text.value.map((column, index) => {
                      return (
                        <div className="column-grid" key={index}>
                          <RichTextElement
                            value={column.elements.rich_text.value}
                          />
                        </div>
                      )
                    })}
                  </div>
                )
              }

              return (
                <strong style={{ color: 'red' }}>⚠ Item not resolved.</strong>
              )
            }}
          />
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
              <RichTextElement
                value={marketo_form[0].elements.footnotes.value}
              />
            )}
          </div>
        )}
      </div>
    </>
  )
}

export default ContentsPageTemplate
