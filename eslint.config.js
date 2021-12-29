const js = require('@eslint/js')
const globals = require('globals')
const react = require('eslint-plugin-react')
const reactHooks = require('eslint-plugin-react-hooks')
const jsxA11y = require('eslint-plugin-jsx-a11y')

const nodeFiles = [
  'eslint.config.js',
  'jest.config.js',
  'gatsby-*.js',
  'config/**/*.js',
  'plugins/**/*.js',
  'fixtures/**/*.js',
  'scripts/**/*.js',
  'src/utils/pagePath.js',
  'test/*-mock.js',
  'test/jest-preprocess.js',
]

module.exports = [
  { ignores: ['public/', '.cache/', 'node_modules/', 'coverage/'] },
  js.configs.recommended,
  {
    files: ['**/*.js', '**/*.mjs'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: { ecmaFeatures: { jsx: true } },
      // Gatsby inlines process.env.GATSBY_* into the browser bundle.
      globals: {
        ...globals.browser,
        __PATH_PREFIX__: 'readonly',
        process: 'readonly',
      },
    },
    plugins: { react, 'react-hooks': reactHooks, 'jsx-a11y': jsxA11y },
    settings: { react: { version: 'detect' } },
    rules: {
      ...react.configs.recommended.rules,
      ...jsxA11y.configs.recommended.rules,
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'react/prop-types': 'off',
    },
  },
  {
    files: nodeFiles,
    languageOptions: { sourceType: 'commonjs', globals: globals.node },
  },
  {
    files: ['test/**/*.js', '__mocks__/**/*.js'],
    languageOptions: { globals: { ...globals.jest, ...globals.node } },
  },
]
