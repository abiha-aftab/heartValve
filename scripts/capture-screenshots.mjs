// Captures docs/screenshots from an offline (fixture) build.
// Usage: node scripts/capture-screenshots.mjs <base-url> <output-dir>
// Needs the `playwright` package and its Chromium, e.g. the
// mcr.microsoft.com/playwright image (see README).
import { chromium } from 'playwright'

const [baseUrl = 'http://localhost:9000', outDir = 'docs/screenshots'] =
  process.argv.slice(2)

const desktop = { width: 1440, height: 900 }
const mobile = { width: 390, height: 844 }

const shots = [
  { name: 'home-desktop', path: '/', viewport: desktop },
  { name: 'home-mobile', path: '/', viewport: mobile },
  {
    name: 'heart-anatomy-desktop',
    path: '/heart-basics/heart-anatomy/',
    viewport: desktop,
    prepare: (page) =>
      page.getByRole('button', { name: 'What is a heart valve?' }).click(),
  },
  {
    name: 'navigation-mobile',
    path: '/treatment-options/',
    viewport: mobile,
    prepare: async (page) => {
      await page.getByRole('button', { name: 'Open menu' }).click()
      await page.getByRole('button', { name: /Treatment Options/ }).click()
    },
  },
  {
    name: 'disclaimer-dialog-mobile',
    path: '/heart-basics/heart-valves/',
    viewport: mobile,
    prepare: (page) =>
      page.getByRole('button', { name: /not a substitute/ }).click(),
  },
  { name: 'site-map-desktop', path: '/site-map/', viewport: desktop },
  { name: 'regional-de-desktop', path: '/de/herzklappen/', viewport: desktop },
]

const browser = await chromium.launch()
for (const { name, path, viewport, prepare } of shots) {
  const page = await browser.newPage({ viewport })
  await page.goto(`${baseUrl}${path}`, { waitUntil: 'networkidle' })
  await page.evaluate(() => document.fonts.ready)
  if (prepare) await prepare(page)
  await page.waitForTimeout(800)
  await page.screenshot({ path: `${outDir}/${name}.png` })
  await page.close()
  console.log(`saved ${outDir}/${name}.png`)
}
await browser.close()
