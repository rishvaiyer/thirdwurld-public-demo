import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import net from 'node:net';
import { after, before, test } from 'node:test';

const allowedOrigin = 'https://rishvaiyer.github.io';
let baseUrl;
let child;
let childErrors = '';

function availablePort() {
  return new Promise((resolve, reject) => {
    const probe = net.createServer();
    probe.once('error', reject);
    probe.listen(0, '127.0.0.1', () => {
      const { port } = probe.address();
      probe.close(() => resolve(port));
    });
  });
}

async function waitForServer(url) {
  for (let attempt = 0; attempt < 50; attempt += 1) {
    try {
      await fetch(`${url}/health`);
      return;
    } catch {
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
  }
  throw new Error(`API did not start. ${childErrors}`);
}

before(async () => {
  const port = await availablePort();
  baseUrl = `http://127.0.0.1:${port}`;
  child = spawn(process.execPath, ['early-access-api/server.js'], {
    cwd: new URL('..', import.meta.url),
    env: { ...process.env, PORT: String(port), DATABASE_URL: '' },
    stdio: ['ignore', 'ignore', 'pipe'],
  });
  child.stderr.setEncoding('utf8');
  child.stderr.on('data', (chunk) => {
    childErrors += chunk;
  });
  await waitForServer(baseUrl);
});

after(() => {
  child?.kill('SIGTERM');
});

test('health fails closed when no database is configured', async () => {
  const response = await fetch(`${baseUrl}/health`);

  assert.equal(response.status, 503);
  assert.deepEqual(await response.json(), { status: 'unavailable' });
  assert.equal(response.headers.get('cache-control'), 'no-store');
});

test('cross-origin signup attempts are forbidden', async () => {
  const response = await fetch(`${baseUrl}/api/early-access`, {
    method: 'POST',
    headers: { 'content-type': 'application/json', origin: 'https://example.com' },
    body: JSON.stringify({ email: 'visitor@example.com' }),
  });

  assert.equal(response.status, 403);
  assert.deepEqual(await response.json(), { error: 'Forbidden.' });
  assert.equal(response.headers.get('access-control-allow-origin'), 'null');
});

test('invalid email is rejected before database access', async () => {
  const response = await fetch(`${baseUrl}/api/early-access`, {
    method: 'POST',
    headers: { 'content-type': 'application/json', origin: allowedOrigin },
    body: JSON.stringify({ email: 'not-an-email' }),
  });

  assert.equal(response.status, 400);
  assert.deepEqual(await response.json(), { error: 'Enter a valid email address.' });
});

test('honeypot submission returns a generic success without database access', async () => {
  const response = await fetch(`${baseUrl}/api/early-access`, {
    method: 'POST',
    headers: { 'content-type': 'application/json', origin: allowedOrigin },
    body: JSON.stringify({ email: 'bot@example.com', website: 'https://spam.example' }),
  });

  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { status: 'requested' });
});

test('rate limiter blocks the eleventh request from one forwarded IP', async () => {
  const statuses = [];
  for (let attempt = 0; attempt < 11; attempt += 1) {
    const response = await fetch(`${baseUrl}/api/early-access`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        origin: allowedOrigin,
        'x-forwarded-for': '203.0.113.42',
      },
      body: JSON.stringify({ email: 'not-an-email' }),
    });
    statuses.push(response.status);
  }

  assert.deepEqual(statuses.slice(0, 10), Array(10).fill(400));
  assert.equal(statuses[10], 429);
});
