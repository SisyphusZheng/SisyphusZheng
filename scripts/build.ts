// Step 1: Generate data
const genCommand = new Deno.Command(Deno.execPath(), {
  args: [
    'run',
    '-A',
    '--config',
    'deno.json',
    'scripts/generate-data.ts',
  ],
  stdout: 'inherit',
  stderr: 'inherit',
});

const generated = await genCommand.output();
if (!generated.success) Deno.exit(generated.code);

// Step 2: Run Vite build in-process.
// Using `await import('vite')` instead of `Deno.Command` avoids spawning a
// subprocess, which prevents Deno permission inheritance issues with the
// Node compat layer (picocolors accessing process.env.CI in a new sandbox).
//
// TODO: Once @lessjs/adapter-vite exports a `build()` function, switch to:
//   const { build } = await import('jsr:@lessjs/adapter-vite/cli/build');
//   await build();
// This keeps build logic in the framework's single source of truth.
const { build: viteBuild } = await import('vite');

try {
  await viteBuild({ configLoader: 'native' });
} catch (error) {
  console.error('Build failed:', error);
  Deno.exit(1);
}
