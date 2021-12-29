import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { fireEvent } from '@testing-library/dom'
import NavbarDefault from '../../src/containers/Navbar/variants/NavbarDefault'
import AccordionBasic from '../../src/components/Accordion/variants/AccordionBasic'
import Modal from '../../src/components/Modal'
import PaginationDefault from '../../src/components/Pagination/variants/PaginationDefault'

const value = (v) => ({ value: v })

const navLinks = [
  { name: 'Home', url: '/', links: [] },
  {
    name: 'Heart Basics',
    url: '/heart-basics',
    links: [{ name: 'Heart anatomy', url: '/heart-basics/heart-anatomy' }],
  },
]

describe('NavbarDefault', () => {
  it('labels the mobile menu button and reflects its state', () => {
    render(<NavbarDefault navLogo={{ value: [] }} navLinks={navLinks} />)
    const toggle = screen.getByRole('button', { name: 'Open menu' })
    expect(toggle).toHaveAttribute('aria-expanded', 'false')
    fireEvent.click(toggle)
    expect(screen.getByRole('button', { name: 'Close menu' })).toHaveAttribute(
      'aria-expanded',
      'true'
    )
  })

  it('opens section menus as plain links and closes them with Escape', async () => {
    render(<NavbarDefault navLogo={{ value: [] }} navLinks={navLinks} />)
    const section = screen.getByRole('button', { name: /Heart Basics/ })
    fireEvent.click(section)
    expect(section).toHaveAttribute('aria-expanded', 'true')
    const link = screen.getByRole('link', { name: 'Heart anatomy' })
    expect(link.closest('button')).toBeNull()
    fireEvent.keyDown(document, { key: 'Escape' })
    expect(section).toHaveAttribute('aria-expanded', 'false')
    expect(section).toHaveFocus()
    await waitFor(() =>
      expect(
        screen.queryByRole('link', { name: 'Heart anatomy' })
      ).not.toBeInTheDocument()
    )
  })

  it('shows a text wordmark linking home when there is no CMS logo', () => {
    render(
      <NavbarDefault navLogo={{ value: [] }} navLinks={[]} homePath="/de" />
    )
    expect(
      screen.getByRole('link', { name: /YourHeartValve home/ })
    ).toHaveAttribute('href', '/de')
  })
})

describe('AccordionBasic', () => {
  it('connects each button to the panel it controls', () => {
    const item = {
      system: { id: 'i1', codename: 'faq' },
      elements: {
        title: value('What is a heart valve?'),
        description: { value: '<p>Four valves.</p>', modular_content: [] },
      },
    }
    render(
      <AccordionBasic
        data={[
          {
            system: { id: 'a1' },
            elements: { accordion_items: { value: [item] } },
          },
        ]}
      />
    )
    const button = screen.getByRole('button', {
      name: 'What is a heart valve?',
    })
    expect(button).toHaveAttribute('aria-expanded', 'false')
    fireEvent.click(button)
    const panel = screen.getByRole('region', { name: 'What is a heart valve?' })
    expect(button).toHaveAttribute('aria-controls', panel.id)
    expect(panel).toHaveTextContent('Four valves.')
  })
})

describe('Modal', () => {
  const modalData = [
    {
      system: { id: 'm1', codename: 'disclaimer' },
      elements: {
        title: value('Disclaimer'),
        body: value('<p>Talk to your doctor.</p>'),
      },
    },
  ]

  it('moves focus into the dialog and back to the trigger on Escape', async () => {
    render(<Modal modalData={modalData} trigger="Read the disclaimer" />)
    const trigger = screen.getByRole('button', { name: 'Read the disclaimer' })
    fireEvent.click(trigger)
    const dialog = screen.getByRole('dialog', { name: 'Disclaimer' })
    expect(dialog).toHaveAttribute('aria-modal', 'true')
    expect(screen.getAllByRole('button', { name: 'Close' })[0]).toHaveFocus()
    fireEvent.keyDown(window, { key: 'Escape' })
    await waitFor(() => expect(trigger).toHaveFocus())
  })
})

describe('PaginationDefault', () => {
  it('renders a breadcrumb trail with the current page marked', () => {
    render(<PaginationDefault path="heart-basics/heart-anatomy" />)
    const nav = screen.getByRole('navigation', { name: 'Breadcrumb' })
    expect(nav).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'heart anatomy' })).toHaveAttribute(
      'aria-current',
      'page'
    )
    expect(screen.getByRole('link', { name: 'Home' })).not.toHaveAttribute(
      'aria-current'
    )
  })
})
