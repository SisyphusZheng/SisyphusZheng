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

const dev = new Deno.Command(Deno.execPath(), {
  args: ['run', '--config', 'deno.json', '-A', 'npm:vite', '--host', '127.0.0.1'],
  stdout: 'inherit',
  stderr: 'inherit',
});

const child = dev.spawn();
await child.status;
