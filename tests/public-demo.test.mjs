import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import test from 'node:test'

const root = new URL('..', import.meta.url)
const read = path => readFileSync(new URL(path, root), 'utf8')
const html = read('index.html')
const script = existsSync(new URL('app.js', root)) ? read('app.js') : ''

test('exposes named, toggleable public-demo pages', () => {
  assert.match(script, /THIRDWURLD_DEMO_NAV/)
  for (const page of ['world', 'residents', 'worldbook', 'gallery', 'technology', 'economics', 'status', 'preview']) {
    assert.match(html, new RegExp(`data-page=["']${page}["']`))
  }
  assert.match(script, /id:\s*['"]worldbook['"],\s*label:\s*['"]Places['"]/)
})

test('contains a captioned resident conversation and replayable demo reel', () => {
  assert.match(html, /Watch two residents.*shared history/i)
  assert.match(html, /data-reel-next/)
  assert.match(html, /data-reel-image/)
})

test('labels pricing and operating figures as illustrative', () => {
  assert.match(html, /Illustrative monthly operating band/i)
  assert.match(html, /Illustrative operating model/i)
  assert.match(html, /fully functioning MVP/i)
})

test('references every local visual asset and does not link to the private app', () => {
  const visualAssets = [...html.matchAll(/(?:src|poster)=["']([^"']+)["']/g)]
    .map(([, asset]) => asset)
    .filter(asset => asset.startsWith('assets/'))
  assert.ok(visualAssets.length >= 3)
  for (const asset of visualAssets) assert.ok(existsSync(new URL(asset, root)), `Missing ${asset}`)
  assert.doesNotMatch(html, /thurdwurldbby-production/i)
})

test('treats verified in-game captures as public proof, not generated gameplay', () => {
  for (const asset of [
    'assets/game/landing-hero.jpg',
    'assets/game/night-market-real.png',
    'assets/game/nearby-chat-real.png',
    'assets/game/resident-diary-real.png',
  ]) {
    assert.ok(existsSync(new URL(asset, root)), `Missing real capture ${asset}`)
    assert.match(html, new RegExp(asset.replaceAll('.', '\\.')))
  }
  assert.match(html, /Real in-game capture/i)
  assert.match(html, /Illustrative atmosphere/i)
})

test('contains distinct technology, atlas, status, and interactive demo surfaces', () => {
  for (const page of ['worldbook', 'technology', 'status']) {
    assert.match(html, new RegExp(`data-page=["']${page}["']`))
  }
  for (const control of ['data-atlas-control', 'data-perspective', 'data-cost-range', 'data-tech-control']) {
    assert.match(html, new RegExp(control))
  }
  assert.match(script, /showAtlasPlace/)
  assert.match(script, /updateCostModel/)
  assert.doesNotMatch(html, /github\.com/i)
})

test('includes a truthfully labeled scrapbook gallery', () => {
  const galleryAssets = [
    'resident-gate.png',
    'residents-chatting.png',
    'poker-nearby-chat.png',
    'blueberry-resident-encounter.png',
    'world-menu-memory-tree.png',
    'corner-cup-exterior.png',
    'avatar-studio.png',
    'wardrobe-interior.png',
    'town-overview.png',
  ]

  assert.match(html, /data-page=["']gallery["']/)
  for (const asset of galleryAssets) {
    const path = `assets/gallery/${asset}`
    assert.ok(existsSync(new URL(path, root)), `Missing gallery asset ${path}`)
    assert.match(`${html}\n${script}`, new RegExp(path.replaceAll('.', '\\.')))
  }
  assert.match(html, /data-gallery-lightbox/)
  assert.match(`${html}\n${script}`, /Real in-game capture/i)
  assert.match(`${html}\n${script}`, /Public product surface/i)
  assert.match(script, /galleryLightbox/)
})

test('ships a nine-page scrapbook with direct and accessible navigation', () => {
  for (const selector of [
    'data-scrapbook',
    'data-scrapbook-image',
    'data-scrapbook-prev',
    'data-scrapbook-next',
    'data-scrapbook-count',
  ]) assert.match(html, new RegExp(selector))
  assert.equal((html.match(/data-scrapbook-page=/g) || []).length, 9)
  assert.match(script, /showScrapbookPage/)
  assert.match(script, /ArrowLeft/)
  assert.match(script, /ArrowRight/)
  assert.match(script, /touchstart/)
  assert.match(script, /touchend/)
})

test('links the pitch flow to the playable capsule and human member walkthrough', () => {
  assert.match(html, /href=["']try\.html["']/i)
  assert.match(html, /href=["']member\.html["']/i)
  assert.match(html, /href=["']next\.html["']/i)
  assert.ok(existsSync(new URL('try.html', root)))
  assert.ok(existsSync(new URL('member.html', root)))
  assert.ok(existsSync(new URL('next.html', root)))
})

test('explains the current technology foundation without exposing private implementation', () => {
  assert.match(html, /Hyperfy \+ Node\.js/i)
  assert.match(html, /Node\.js 22\.11\+/i)
  assert.match(html, /authoritative on the server/i)
  assert.match(html, /MemoryStore/i)
  assert.match(html, /Mem0/i)
  assert.match(html, /World event/i)
  assert.doesNotMatch(html, /thurdwurldbby-production|railway\.app/i)
})
