import http from 'node:http';
import { Pool } from 'pg';

const allowedOrigin = 'https://rishvaiyer.github.io';
const port = Number(process.env.PORT || 3000);
const databaseUrl = process.env.DATABASE_URL;
const attempts = new Map();
let pool;

function respond(response, status, body, origin) {
  response.writeHead(status, {
    'Access-Control-Allow-Origin': origin === allowedOrigin ? allowedOrigin : 'null',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Cache-Control': 'no-store',
    'Content-Type': 'application/json; charset=utf-8',
    'Vary': 'Origin'
  });
  response.end(JSON.stringify(body));
}

function requestIp(request) {
  return request.headers['x-forwarded-for']?.split(',')[0].trim() || request.socket.remoteAddress || 'unknown';
}

function overLimit(ip) {
  const now = Date.now();
  const windowStart = now - 15 * 60 * 1000;
  const recent = (attempts.get(ip) || []).filter((timestamp) => timestamp > windowStart);
  recent.push(now);
  attempts.set(ip, recent);
  return recent.length > 10;
}

async function readJson(request) {
  let body = '';
  for await (const chunk of request) {
    body += chunk;
    if (body.length > 8_192) throw new Error('Request too large.');
  }
  return JSON.parse(body || '{}');
}

async function initialiseDatabase() {
  if (!databaseUrl) throw new Error('DATABASE_URL is required.');
  pool = new Pool({ connectionString: databaseUrl });
  await pool.query(`
    CREATE TABLE IF NOT EXISTS early_access_signups (
      email TEXT PRIMARY KEY,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);
}

const server = http.createServer(async (request, response) => {
  const origin = request.headers.origin;

  if (request.method === 'OPTIONS' && request.url === '/api/early-access') {
    if (origin !== allowedOrigin) return respond(response, 403, { error: 'Forbidden.' }, origin);
    return respond(response, 204, {}, origin);
  }

  if (request.method === 'GET' && request.url === '/health') {
    try {
      if (!pool) throw new Error('Database unavailable.');
      await pool.query('SELECT 1');
      return respond(response, 200, { status: 'ok' }, origin);
    } catch {
      return respond(response, 503, { status: 'unavailable' }, origin);
    }
  }

  if (request.method !== 'POST' || request.url !== '/api/early-access') {
    return respond(response, 404, { error: 'Not found.' }, origin);
  }
  if (origin !== allowedOrigin) return respond(response, 403, { error: 'Forbidden.' }, origin);
  if (overLimit(requestIp(request))) return respond(response, 429, { error: 'Please try again later.' }, origin);

  try {
    const { email, website } = await readJson(request);
    if (website) return respond(response, 200, { status: 'requested' }, origin);

    const normalizedEmail = typeof email === 'string' ? email.trim().toLowerCase() : '';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail) || normalizedEmail.length > 254) {
      return respond(response, 400, { error: 'Enter a valid email address.' }, origin);
    }
    if (!pool) throw new Error('Database unavailable.');

    await pool.query(
      'INSERT INTO early_access_signups (email) VALUES ($1) ON CONFLICT (email) DO NOTHING',
      [normalizedEmail]
    );
    return respond(response, 200, { status: 'requested' }, origin);
  } catch (error) {
    console.error('Early access request failed:', error.message);
    return respond(response, 500, { error: 'Unable to save your request. Please try again.' }, origin);
  }
});

initialiseDatabase()
  .then(() => server.listen(port, '0.0.0.0'))
  .catch((error) => {
    console.error('Database setup failed:', error.message);
    server.listen(port, '0.0.0.0');
  });
