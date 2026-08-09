import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import test from 'node:test'

const root = new URL('..', import.meta.url)
const read = path => readFileSync(new URL(path, root), 'utf8')
const html = read('index.html')
const script = existsSync(new URL('app.js', root)) ? read('app.js') : ''

test('exposes four named, toggleable public-demo pages', () => {
  assert.match(script, /THIRDWURLD_DEMO_NAV/)
  for (const page of ['overview', 'proof', 'economics', 'architecture']) {
    assert.match(html, new RegExp(`data-page=["']${page}["']`))
  }
})

test('contains a captioned resident conversation and replayable demo reel', () => {
  assert.match(html, /A conversation becomes a shared memory/i)
  assert.match(html, /data-reel-next/)
  assert.match(html, /data-reel-panel/)
})

test('labels pricing and operating figures as illustrative', () => {
  assert.match(html, /Illustrative pricing/i)
  assert.match(html, /Illustrative operating model/i)
  assert.match(html, /The core application remains private/i)
})

test('references every local visual asset and does not link to the private app', () => {
  const visualAssets = [...html.matchAll(/(?:src|poster)=["']([^"']+)["']/g)]
    .map(([, asset]) => asset)
    .filter(asset => asset.startsWith('assets/'))
  assert.ok(visualAssets.length >= 3)
  for (const asset of visualAssets) assert.ok(existsSync(new URL(asset, root)), `Missing ${asset}`)
  assert.doesNotMatch(html, /thurdwurldbby-production/i)
})
