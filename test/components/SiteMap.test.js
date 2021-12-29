import React from 'react'
import { render, screen } from '@testing-library/react'
import SiteMap from '../../src/components/SiteMap'
import SiteLink from '../../src/components/SiteLink'

// The banner is a StaticImage, which needs Gatsby's build-time Babel plugin.
jest.mock('../../src/containers/Hero/variants/HeroSmall', () => () => null)

describe('SiteMap', () => {
  it('renders grouped links and falls back when no site-map page exists', () => {
    render(
      <SiteMap
        languageCode=""
        siteMapPage={null}
        groups={[{ name: 'Heart Basics', links: [{ title: 'Heart anatomy', url: '/heart-basics/heart-anatomy' }] }]}
      />
    )
    expect(screen.getByRole('heading', { name: 'Site map' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Heart anatomy' })).toHaveAttribute('href', '/heart-basics/heart-anatomy')
  })
})

describe('SiteLink', () => {
  it('opens external URLs in a new tab without leaking the opener', () => {
    render(<SiteLink to="https://newheartvalve.com/">TAVR</SiteLink>)
    const link = screen.getByRole('link', { name: 'TAVR' })
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('uses the router link for internal paths', () => {
    render(<SiteLink to="/heart-basics" activeClassName="active">Basics</SiteLink>)
    const link = screen.getByRole('link', { name: 'Basics' })
    expect(link).toHaveAttribute('href', '/heart-basics')
    expect(link).not.toHaveAttribute('target')
  })
})
