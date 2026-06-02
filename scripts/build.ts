import { build as viteBuild } from 'npm:vite';

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

await viteBuild({});
