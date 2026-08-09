import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import test from 'node:test'

const root = new URL('..', import.meta.url)
const html = readFileSync(new URL('next.html', root), 'utf8')

test('ships an honest capability ledger and next-build sequence', () => {
  assert.match(html, /Working now/i)
  assert.match(html, /Explore here/i)
  assert.match(html, /Next build/i)
  assert.match(html, /Depth before/i)
  assert.match(html, /We do not call a concept/i)
  assert.ok(existsSync(new URL('next.css', root)))
})

test('does not expose private app or repository links', () => {
  assert.doesNotMatch(html, /github\.com|thurdwurldbby-production|railway\.app/i)
})
