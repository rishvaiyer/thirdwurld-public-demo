import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import test from 'node:test';

const root = new URL('..', import.meta.url);
const routes = ['world', 'day', 'try', 'member', 'next'];

test('public hub links every supported route and labels the access boundary', async () => {
  const html = await readFile(new URL('index.html', root), 'utf8');

  assert.match(html, /Private MVP/i);
  assert.match(html, /Submitting does not grant product access yet/i);
  for (const route of routes) {
    assert.match(html, new RegExp(`href=["'](?:\\./)?${route}/`));
  }
});

test('all committed route entrypoints and referenced bundles exist', async () => {
  for (const route of routes) {
    const html = await readFile(new URL(`${route}/index.html`, root), 'utf8');
    const assets = [...html.matchAll(/(?:src|href)=["'](?:\.\.\/)?(static\/[^"']+)["']/g)]
      .map((match) => match[1]);
    assert.ok(assets.length >= 2, `${route} should reference its script and stylesheet`);
    for (const asset of assets) {
      await access(new URL(asset, root));
    }
  }
});
