import test from 'node:test'
import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'

const root = new URL('..', import.meta.url)
const read = path => readFileSync(new URL(path, root), 'utf8')
const html = read('day.html')
const script = read('day.js')
const css = read('day.css')

test('ships the recorded-day page with its own assets', () => {
  for (const file of ['day.html', 'day.css', 'day.js']) {
    assert.ok(existsSync(new URL(file, root)), `Missing ${file}`)
  }
  assert.match(html, /day\.css\?v=\d+/)
  assert.match(html, /day\.js\?v=\d+/)
  assert.match(read('index.html'), /href=["']day\.html["']/)
})

test('derives town time from the wall clock so the world does not pause', () => {
  // The whole claim of the page is that it keeps running while you are away,
  // so the clock must be read from Date.now() rather than counted with a timer.
  assert.match(script, /Date\.now\(\)/)
  assert.match(script, /REAL_MS_PER_DAY/)
  assert.doesNotMatch(script, /setInterval/)
  assert.match(script, /visibilitychange/)
})

test('the log wraps past midnight instead of emptying', () => {
  assert.match(script, /minutesAgo/)
  assert.match(script, /delta \+ DAY_MINUTES/)
  assert.doesNotMatch(html, /Nothing has happened yet today/)
})

test('states plainly that it is a replay, not a live feed', () => {
  assert.match(html, /not a live feed/i)
  assert.match(html, /replayed on a loop/i)
  assert.match(html, /recorded day/i)
  assert.doesNotMatch(html, /live feed of|streaming live|real[- ]time feed/i)
})

test('keeps private handles and QA resident names off the page', () => {
  assert.doesNotMatch(`${html}\n${script}`, /unevil|warden|queen|scallion/i)
  assert.doesNotMatch(`${html}\n${script}`, /QA AI|Blusberry/i)
})

test('respects reduced motion and stays keyboard reachable', () => {
  assert.match(css, /prefers-reduced-motion/)
  assert.match(css, /\.skip-link/)
  assert.match(html, /class="skip-link"/)
  assert.match(css, /focus-visible/)
})

test('appears in the nav as a real page, not a hash route', () => {
  const app = read('app.js')
  // Declared with an href so it renders in the nav but stays out of routing.
  assert.match(app, /id:\s*'day'[^}]*href:\s*'day\.html'/)
  assert.match(app, /enabledPages = navEntries\.filter\(page => !page\.href\)/)
  // And present statically, so it survives JS being unavailable.
  const index = read('index.html')
  assert.equal((index.match(/class="nav-external" href="day\.html"/g) || []).length, 2)
})
