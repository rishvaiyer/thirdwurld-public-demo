import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import test from 'node:test'

const root = new URL('..', import.meta.url)
const read = path => readFileSync(new URL(path, root), 'utf8')

test('ships a bounded capsule page with the core resident controls', () => {
  const html = read('try.html')
  assert.match(html, /bounded public preview/i)
  assert.match(html, /data-resident-name/)
  assert.match(html, /data-resident-mood/)
  assert.match(html, /data-resident-place/)
  assert.match(html, /data-resident-memory/)
  for (const action of ['ask-lanterns', 'quiet-walk', 'leave-note']) {
    assert.match(html, new RegExp(`data-action=["']${action}["']`))
  }
  assert.match(html, /data-message-form/)
  assert.match(html, /data-message-input/)
})

test('keeps provider credentials out of the public capsule and supports only an optional endpoint', () => {
  const html = read('try.html')
  const css = read('try.css')
  const script = read('try.js')
  const source = `${html}\n${css}\n${script}`
  assert.doesNotMatch(source, /(?:sk-[A-Za-z0-9]{12,}|OPENAI|ANTHROPIC|GEMINI|API[_-]?KEY|Bearer\s+[A-Za-z0-9._-]{12,})/i)
  assert.match(source, /THIRDWURLD_CAPSULE_ENDPOINT|data-endpoint/)
  assert.doesNotMatch(script, /(?:openai|anthropic|googleapis|generativelanguage)/i)
})

test('uses deterministic local fallback behavior when no endpoint is configured', () => {
  const script = read('try.js')
  assert.match(script, /LOCAL_RESPONSES/)
  assert.match(script, /No server endpoint configured/i)
  assert.match(script, /fetch\(/)
  assert.match(script, /catch\s*\(/)
  assert.ok(existsSync(new URL('try.html', root)))
  assert.ok(existsSync(new URL('try.css', root)))
  assert.ok(existsSync(new URL('try.js', root)))
})
