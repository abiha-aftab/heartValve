import React from 'react'
import { RichTextElement } from '@kontent-ai/gatsby-components'

// Kontent "summaries" components render as side-by-side columns. Anything
// else embedded in rich text is skipped for visitors and reported to the
// console so editors notice it during preview.
const resolveLinkedItem = (linkedItem) => {
  if (linkedItem?.__typename === 'kontent_item_summaries') {
    return (
      <div className="grid-1 grid-md-2 gap-1 gap-md-2">
        {linkedItem.elements.rich_text.value.map((column, index) => (
          <div className={`column-grid column-${index}`} key={column.id}>
            <RichTextElement value={column.elements.rich_text.value} />
          </div>
        ))}
      </div>
    )
  }
  if (process.env.NODE_ENV !== 'production') {
    console.warn('Unresolved linked item in rich text', linkedItem)
  }
  return <></>
}

const RichText = ({ value, linkedItems }) => (
  <RichTextElement
    value={value}
    linkedItems={linkedItems}
    resolveLinkedItem={resolveLinkedItem}
  />
)

export default RichText
