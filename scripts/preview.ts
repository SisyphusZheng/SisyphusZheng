const port = Number(Deno.args.find((arg) => /^\d+$/.test(arg)) ?? '4173');
const root = new URL('../dist/', import.meta.url);

const mimeTypes: Record<string, string> = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.txt': 'text/plain; charset=utf-8',
  '.webmanifest': 'application/manifest+json; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
};

function cleanPath(pathname: string): string {
  const decoded = decodeURIComponent(pathname);
  const normalized = decoded.replace(/\\/g, '/').replace(/\/+/g, '/');
  return normalized.replace(/^\/+/, '');
}

async function exists(url: URL): Promise<boolean> {
  try {
    const stat = await Deno.stat(url);
    return stat.isFile;
  } catch {
    return false;
  }
}

async function resolveFile(pathname: string): Promise<URL | null> {
  const path = cleanPath(pathname);
  const candidates = path === '' ? ['index.html'] : [
    path,
    `${path}.html`,
    `${path}/index.html`,
  ];

  for (const candidate of candidates) {
    if (candidate.includes('..')) continue;
    const file = new URL(candidate, root);
    if (await exists(file)) return file;
  }

  return null;
}

function contentType(pathname: string): string {
  const extension = pathname.match(/\.[a-z0-9]+$/i)?.[0].toLowerCase() ?? '.html';
  return mimeTypes[extension] ?? 'application/octet-stream';
}

console.log(`Preview: http://127.0.0.1:${port}/`);

Deno.serve({ hostname: '127.0.0.1', port }, async (request) => {
  if (request.method !== 'GET' && request.method !== 'HEAD') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  const url = new URL(request.url);
  const file = await resolveFile(url.pathname);

  if (!file) {
    return new Response('Not Found', {
      status: 404,
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    });
  }

  const body = request.method === 'HEAD' ? null : await Deno.readFile(file);
  return new Response(body, {
    headers: {
      'Content-Type': contentType(file.pathname),
      'Cache-Control': 'no-store',
    },
  });
});
