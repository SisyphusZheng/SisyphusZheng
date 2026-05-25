/**
 * Post-build fixes for LessJS SSG output:
 *
 * 1. Move <meta charset> to be the first child of <head>.
 *    LessJS's SSG post-processing injects the DSD polyfill via insertAfterHead(),
 *    which pushes <meta charset> past the 1024-byte encoding sniffing boundary.
 *    On Chinese Windows with file:// protocol, the browser defaults to GBK,
 *    causing all CJK characters to render as garbled text.
 *
 * 2. Convert absolute asset paths to relative paths for file:// protocol support.
 *    SSG output uses absolute paths like /client/islands/client.js which don't
 *    work with file:// protocol. This script converts them to relative paths
 *    based on each HTML file's depth from the dist root.
 */
import { join, resolve, relative, dirname } from 'node:path';
import { readdirSync, readFileSync, writeFileSync, statSync } from 'node:fs';

function walkHtmlFiles(dir: string, visitor: (content: string, fullPath: string) => string | null): void {
  const entries = readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      walkHtmlFiles(fullPath, visitor);
    } else if (entry.name.endsWith('.html')) {
      const content = readFileSync(fullPath, 'utf-8');
      const result = visitor(content, fullPath);
      if (result !== null) {
        writeFileSync(fullPath, result, 'utf-8');
      }
    }
  }
}

// ─── Fix 1: Move charset to first position in <head> ──────────────────

function moveCharsetFirst(html: string): string | null {
  const charsetRegex = /<meta\s+charset=["']UTF-8["']\s*\/?>/i;
  const charsetMatch = html.match(charsetRegex);
  if (!charsetMatch) return null;

  const charsetTag = charsetMatch[0];

  const afterHead = html.match(/<head(\s[^>]*)?>\s*/i);
  if (afterHead) {
    const afterHeadEnd = afterHead.index! + afterHead[0].length;
    const nextContent = html.slice(afterHeadEnd).trimStart();
    if (nextContent.startsWith(charsetTag)) return null;
  }

  let modified = html.replace(charsetRegex, '');

  const headMatch = modified.match(/<head(\s[^>]*)?>/i);
  if (!headMatch) return null;

  const insertPos = headMatch.index! + headMatch[0].length;
  modified = modified.slice(0, insertPos) + '\n  ' + charsetTag + modified.slice(insertPos);

  modified = modified.replace(/\n\s*\n\s*\n/g, '\n\n');

  return modified;
}

// ─── Fix 2: Convert absolute paths to relative for file:// support ────

function makePathsRelative(html: string, htmlFilePath: string, distRoot: string): string | null {
  const htmlDir = dirname(htmlFilePath);
  const relPrefix = relative(htmlDir, distRoot).replace(/\\/g, '/');
  const prefix = relPrefix ? relPrefix + '/' : './';

  let modified = html;
  let changed = false;

  // Fix: src="/client/..." → src="<prefix>client/..."
  modified = modified.replace(
    /((?:src|href))="(\/client\/[^"]+)"/g,
    (_match, attr: string, path: string) => {
      changed = true;
      return `${attr}="${prefix}${path.slice(1)}"`;
    }
  );

  // Fix: href="/blog" style nav links to relative paths.
  // /blog → blog.html (LessJS generates blog.html, not blog/index.html)
  // /about → about/index.html
  // /blog/hello-world → blog/hello-world/index.html
  modified = modified.replace(
    /href="(\/(?:blog|about)(?:\/[\w-]+)?)"/g,
    (_match, path: string) => {
      changed = true;
      const bare = path.slice(1); // remove leading /
      // /blog has no sub-path → blog.html
      if (bare === 'blog') return `href="${prefix}blog.html"`;
      // /about → about/index.html, /blog/xxx → blog/xxx/index.html
      return `href="${prefix}${bare}/index.html"`;
    }
  );

  // Fix: href="/" → href="<prefix>index.html" (but only for page links, not preconnect etc.)
  modified = modified.replace(
    /href="\/"(?=\s|>)/g,
    (_match) => {
      changed = true;
      return `href="${prefix}index.html"`;
    }
  );

  return changed ? modified : null;
}

// ─── Run ───────────────────────────────────────────────────────────────

const distDir = resolve(import.meta.dirname || '.', '..', 'dist');

// Fix 1: charset position
walkHtmlFiles(distDir, (content) => moveCharsetFirst(content));
console.log('✅ Fix 1: <meta charset="UTF-8"> moved to first position in <head>');

// Fix 2: relative paths for file:// support
walkHtmlFiles(distDir, (content, fullPath) => makePathsRelative(content, fullPath, distDir));
console.log('✅ Fix 2: Absolute paths converted to relative for file:// support');
