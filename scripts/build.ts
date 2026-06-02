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

// Step 2: Run Vite build via adapter-vite CLI.
// Uses -A instead of granular permissions because Deno's Node compat layer
// (picocolors reading process.env.CI) requires full env access that
// --allow-env alone doesn't reliably grant in a subprocess sandbox.
const buildCommand = new Deno.Command(Deno.execPath(), {
  args: [
    'run',
    '-A',
    '--config',
    'deno.json',
    'jsr:@lessjs/adapter-vite/cli/build',
  ],
  stdout: 'inherit',
  stderr: 'inherit',
});

const built = await buildCommand.output();
if (!built.success) Deno.exit(built.code);
