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

const build = new Deno.Command(Deno.execPath(), {
  args: [
    'run',
    '--config',
    'deno.json',
    '--allow-read',
    '--allow-write',
    '--allow-run',
    '--allow-env',
    '--allow-net',
    '--allow-sys',
    '--allow-ffi',
    'npm:vite',
    'build',
  ],
  stdout: 'inherit',
  stderr: 'inherit',
});

const result = await build.output();
Deno.exit(result.code);
