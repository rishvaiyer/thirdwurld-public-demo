import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import test from 'node:test'

const root = new URL('..', import.meta.url)
const read = path => readFileSync(new URL(path, root), 'utf8')

test('ships a separate human member journey with interactive steps', () => {
  const html = read('member.html')
  const script = read('member.js')
  for (const step of ['welcome', 'dashboard', 'moments', 'mail']) assert.match(html, new RegExp(`data-member-step=["']${step}["']`))
  assert.match(script, /showStep/)
  assert.match(html, /Walk the member journey/i)
  assert.match(html, /Private Royal Mail/i)
  assert.match(html, /member-hero-proof/)
  assert.match(html, /Human entry boundary/i)
})

test('uses local, privacy-safe screenshot assets and labels private surfaces', () => {
  const html = read('member.html')
  for (const asset of [
    'assets/game/owner-dashboard.jpg',
    'assets/game/owner-moments-real.png',
    'assets/game/owner-social-real.png',
    'assets/game/resident-diary-real.png',
    'assets/game/nearby-chat-real.png',
    'assets/game/world-moment-real.png',
    'assets/game/resident-diary-mobile-real.png',
    'assets/gallery/resident-gate.jpg',
  ]) {
    assert.ok(existsSync(new URL(asset, root)), `Missing ${asset}`)
    assert.match(html, new RegExp(asset.replaceAll('.', '\\.') ))
  }
  assert.match(html, /Stewardship dashboard/i)
  assert.match(html, /owner-private/i)
  assert.doesNotMatch(html, /thurdwurldbby-production|railway\.app/i)
})
