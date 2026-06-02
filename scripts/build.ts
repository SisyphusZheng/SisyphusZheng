const command = new Deno.Command(Deno.execPath(), {
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

const generated = await command.output();
if (!generated.success) Deno.exit(generated.code);

// NOTE: Using -A (all permissions) for the Vite build step.
// Explicit --allow-env does NOT grant Node.js compat layer (process.env) access
// in Deno 2.x — picocolors (CJS dep of Vite) reads process.env.CI and triggers
// NotCapable despite --allow-env being present. -A is the documented invocation
// per @lessjs/adapter-vite/cli/build.ts header comment.
const build = new Deno.Command(Deno.execPath(), {
  args: [
    'run',
    '--config',
    'deno.json',
    '-A',
    'jsr:@lessjs/adapter-vite/cli/build',
  ],
  stdout: 'inherit',
  stderr: 'inherit',
});

const result = await build.output();
Deno.exit(result.code);
