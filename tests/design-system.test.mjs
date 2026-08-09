import test from 'node:test'
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'

const pages = ['index.html', 'member.html', 'next.html', 'try.html']

test('uses one Thirdwurld brand system across every public page', async () => {
  for (const page of pages) {
    const html = await readFile(new URL(`../${page}`, import.meta.url), 'utf8')
    assert.match(html, /class="[^"]*thirdwurld-page/)
    assert.match(html, /responsive\.css\?v=3/)
    assert.match(html, /thirdwurld<span>°<\/span>/)
    assert.doesNotMatch(html, /THIRDWURLD/)
  }
})

test('defines shared headers, footers, controls, surfaces, and responsive type', async () => {
  const css = await readFile(new URL('../responsive.css', import.meta.url), 'utf8')
  assert.match(css, /\.site-topbar/)
  assert.match(css, /\.site-footer/)
  assert.match(css, /Shared buttons and controls/)
  assert.match(css, /One surface language/)
  assert.match(css, /@media \(max-width: 700px\)/)
  assert.match(css, /prefers-reduced-motion/)
})
