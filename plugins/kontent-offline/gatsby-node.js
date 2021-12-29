const fs = require('fs')
const path = require('path')
const { createDeliveryAdapter } = require('./delivery-adapter')
const fixtures = require('../../fixtures/kontent/content')
const { ASSET_URL_PREFIX } = require('../../fixtures/kontent/delivery')

const ROOT = path.resolve(__dirname, '../..')

// The source plugin calls its own copy of axios, so the adapter has to be
// installed on that exact module instance.
const sourcePluginAxios = (sourcePlugin) => {
  const pluginDir = path.dirname(require.resolve(`${sourcePlugin}/package.json`))
  return require(require.resolve('axios', { paths: [pluginDir] }))
}

exports.onPreInit = (_, { sourcePlugin }) => {
  sourcePluginAxios(sourcePlugin).defaults.adapter =
    createDeliveryAdapter(fixtures)
}

exports.onPreBootstrap = () => {
  const target = path.join(ROOT, 'public', ASSET_URL_PREFIX)
  fs.mkdirSync(target, { recursive: true })
  for (const [file, { source }] of Object.entries(fixtures.assetFiles)) {
    fs.copyFileSync(path.join(ROOT, source), path.join(target, file))
  }
}
