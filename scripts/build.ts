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

// Step 2: Run Vite build via adapter-vite CLI (in-process).
// Using `await import()` instead of `Deno.Command` avoids spawning a
// subprocess, which prevents Deno permission inheritance issues with the
// Node compat layer (picocolors accessing process.env.CI in a new sandbox).
await import('jsr:@lessjs/adapter-vite/cli/build');
