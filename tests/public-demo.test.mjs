import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import test from 'node:test'

const root = new URL('..', import.meta.url)
const read = path => readFileSync(new URL(path, root), 'utf8')
const html = read('index.html')
const script = existsSync(new URL('app.js', root)) ? read('app.js') : ''
const member = read('member.html')
const next = read('next.html')

test('exposes named, toggleable public-demo pages', () => {
  assert.match(script, /THIRDWURLD_DEMO_NAV/)
  for (const page of ['world', 'residents', 'worldbook', 'gallery', 'technology', 'economics', 'status', 'preview']) {
    assert.match(html, new RegExp(`data-page=["']${page}["']`))
  }
  assert.match(script, /id:\s*['"]worldbook['"],\s*label:\s*['"]Places['"]/)
})

test('contains a captioned resident conversation and replayable demo reel', () => {
  assert.match(html, /Life continues[\s\S]*between visits/i)
  assert.match(html, /data-reel-next/)
  assert.match(html, /data-reel-image/)
})

test('shows resident diaries and memorable moments on Residents', () => {
  assert.match(html, /In their own[\s\S]*words/i)
  assert.match(html, /Counted the boats again/i)
  assert.match(html, /Marvin lied about the radio/i)
  assert.match(html, /chair facing the water/i)
  assert.match(html, /Marvin[\s\S]*Blueberry/i)
})

test('uses Thirdwurld current BYOK brain-cost estimates', () => {
  assert.match(html, /Model cost estimates.*Stripe hosted.*bring your own key/i)
  assert.match(html, /≈ \$0\.10–\$0\.25/i)
  assert.match(html, /≈ \$20–\$35/i)
  assert.doesNotMatch(html, /\$24|\$79|\$249/i)
  assert.match(html, /fully functioning MVP/i)
})

test('shows Stripe hosted plans and keeps World Map off the Places page', () => {
  assert.match(html, /Secure Stripe checkout/i)
  assert.match(html, /\$9[\s\S]*\$19/i)
  assert.match(html, /no API key needed/i)
  assert.match(html, /card payments through Stripe/i)
  assert.match(html, /Bringing your own key almost always is/i)
  assert.doesNotMatch(html, /data-atlas-control=["']map["']/i)
  assert.doesNotMatch(script, /05 \/ World Map/i)
})

test('does not expose private map labels in the public demo', () => {
  assert.doesNotMatch(html, /world-map-real|Crown Castle|Unevil|Warden|Queen/i)
  assert.doesNotMatch(script, /world-map-real|Crown Castle|Unevil|Warden|Queen/i)
  assert.equal(existsSync(new URL('assets/game/world-map-real.png', root)), false)
})

test('ships no embedded video', () => {
  // The capture was pulled: the in-game chat panel was on screen for its whole
  // run, showing a personal handle. Until it is re-exported, nothing embeds it.
  assert.doesNotMatch(html, /<video|\.webm/)
  assert.doesNotMatch(script, /galleryStartSeconds|gallery-video-player/)
  assert.equal(existsSync(new URL('assets/videos/world-capture-04.webm', root)), false)
  assert.doesNotMatch(html, /world-capture-0[1234]/)
})

test('references every local visual asset and does not link to the private app', () => {
  const visualAssets = [...html.matchAll(/(?:src|poster)=["']([^"']+)["']/g)]
    .map(([, asset]) => asset)
    .filter(asset => asset.startsWith('assets/'))
  assert.ok(visualAssets.length >= 3)
  for (const asset of visualAssets) assert.ok(existsSync(new URL(asset, root)), `Missing ${asset}`)
  assert.doesNotMatch(html, /thurdwurldbby-production/i)
})

test('uses product imagery as public proof without repetitive media disclaimers', () => {
  for (const asset of [
    'assets/game/landing-hero.jpg',
    'assets/game/night-market-real.jpg',
    'assets/game/nearby-chat-real.png',
    'assets/game/resident-diary-real.png',
  ]) {
    assert.ok(existsSync(new URL(asset, root)), `Missing real capture ${asset}`)
    assert.match(html, new RegExp(asset.replaceAll('.', '\\.')))
  }
  assert.match(html, /assets\/gallery\/residents-chatting\.jpg/i)
  assert.doesNotMatch(html, /Illustrative atmosphere/i)
})

test('contains distinct technology, atlas, status, and interactive demo surfaces', () => {
  for (const page of ['worldbook', 'technology', 'status']) {
    assert.match(html, new RegExp(`data-page=["']${page}["']`))
  }
  for (const control of ['data-atlas-control', 'data-tech-control']) {
    assert.match(html, new RegExp(control))
  }
  assert.match(script, /showAtlasPlace/)
  assert.doesNotMatch(script, /updateCostModel/)
  assert.doesNotMatch(html, /github\.com/i)
})

test('includes a truthfully labeled scrapbook gallery', () => {
  const galleryAssets = [
    'resident-gate.jpg',
    'residents-chatting.jpg',
    'poker-nearby-chat.jpg',
    'blueberry-resident-encounter.jpg',
    'world-menu-memory-tree.jpg',
    'corner-cup-exterior.jpg',
    'avatar-studio.jpg',
    'wardrobe-interior.jpg',
    'town-overview.jpg',
  ]

  assert.match(html, /data-page=["']gallery["']/)
  for (const asset of galleryAssets) {
    const path = `assets/gallery/${asset}`
    assert.ok(existsSync(new URL(path, root)), `Missing gallery asset ${path}`)
    assert.match(`${html}\n${script}`, new RegExp(path.replaceAll('.', '\\.')))
  }
  assert.match(html, /data-gallery-lightbox/)
  assert.match(`${html}\n${script}`, /assets\/game\/night-market-real\.jpg/i)
  assert.match(`${html}\n${script}`, /Resident life/i)
  assert.match(script, /galleryLightbox/)
})

test('ships an eleven-page scrapbook with direct and accessible navigation', () => {
  for (const selector of [
    'data-scrapbook',
    'data-scrapbook-image',
    'data-scrapbook-prev',
    'data-scrapbook-next',
    'data-scrapbook-count',
  ]) assert.match(html, new RegExp(selector))
  assert.equal((html.match(/data-scrapbook-page=/g) || []).length, 11)
  for (const asset of ['resident-diary-real.png', 'world-moment-real.png']) {
    assert.match(`${html}\n${script}`, new RegExp(asset.replaceAll('.', '\\.')))
  }
  assert.match(script, /showScrapbookPage/)
  assert.match(script, /ArrowLeft/)
  assert.match(script, /ArrowRight/)
  assert.match(script, /touchstart/)
  assert.match(script, /touchend/)
})

test('keeps the scrapbook free of duplicate frames', () => {
  const sources = [...script.matchAll(/\['(assets\/(?:gallery|game)\/[^']+)'/g)].map(match => match[1])
  const scrapbookSources = sources.slice(sources.indexOf('assets/gallery/town-overview.jpg'), sources.indexOf('assets/game/resident-diary-real.png') + 2)
  assert.equal(new Set(scrapbookSources).size, scrapbookSources.length)
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

test('positions Thirdwurld as a world inhabited by AI residents', () => {
  assert.match(html, /Your AI lives here/i)
  assert.match(html, /remember, meet, wander, and change while you are away/i)
  assert.match(html, /humans? (?:enter|visit).*guests?/i)
  for (const capability of ['memories', 'friends', 'rivals', 'mail', 'objects', 'radio', 'games']) {
    assert.match(`${html}\n${script}`, new RegExp(capability, 'i'))
  }
})

test('keeps media disclaimers out of the launch narrative', () => {
  const narrative = `${html}\n${script}\n${member}\n${next}`
  assert.doesNotMatch(narrative, /real in-game capture|illustrative atmosphere|public product surface|privacy-safe sample capture|historical QA capture/i)
})

test('uses one interactive atmosphere across the World page', () => {
  assert.match(html, /data-world-atmosphere/)
  assert.match(script, /--world-x/)
  assert.match(script, /--world-y/)
})
