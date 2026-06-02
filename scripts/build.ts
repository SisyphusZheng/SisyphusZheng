// Step 1: Generate data (still subprocess — only needs read/write, no env issue)
const genCommand = new Deno.Command(Deno.execPath(), {
  args: [
    'run',
    '--config',
    'deno.json',
    '--allow-read',
    '--allow-write',
    'scripts/generate-data.ts',
  ],
  stdout: 'inherit',
  stderr: 'inherit',
});

const generated = await genCommand.output();
if (!generated.success) Deno.exit(generated.code);

// Step 2: Run Vite build IN-PROCESS.
//
// Previous approach: spawn `deno run -A jsr:@lessjs/adapter-vite/cli/build`
// This failed because `deno task` intercepts `deno run` commands (see denoland/deno#33776)
// and strips the -A flag, causing picocolors (CJS dep of Vite) to crash with
// NotCapable when accessing process.env.CI via Deno's Node compat layer.
//
// Inlining the build avoids subprocess permission inheritance entirely.
// The adapter-vite CLI is just: viteBuild({ configLoader: 'native' }).
const { build: viteBuild } = await import('vite');

try {
  await viteBuild({ configLoader: 'native' });
} catch (error) {
  console.error('Build failed:', error);
  Deno.exit(1);
}
