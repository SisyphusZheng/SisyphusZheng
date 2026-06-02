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

// Step 2: Run Vite build IN-PROCESS.
// Using `await import('vite')` avoids spawning a subprocess,
// which prevents Deno permission inheritance issues with the
// Node compat layer (picocolors accessing process.env.CI).
const { build: viteBuild } = await import('vite');

try {
  await viteBuild({ configLoader: 'native' });
} catch (error) {
  console.error('Build failed:', error);
  Deno.exit(1);
}
