// Gatsby's documented unit-testing mock: Link renders a plain anchor and
// GraphQL helpers are jest functions.
const React = require('react')
const gatsby = jest.requireActual('gatsby')

module.exports = {
  ...gatsby,
  graphql: jest.fn(),
  Link: jest.fn().mockImplementation(
    // eslint-disable-next-line no-unused-vars
    ({ activeClassName, activeStyle, getProps, innerRef, partiallyActive, ref, replace, to, ...rest }) =>
      React.createElement('a', { ...rest, href: to })
  ),
  useStaticQuery: jest.fn(),
}
