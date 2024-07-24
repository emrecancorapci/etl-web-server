import { build } from 'esbuild';

build({
  entryPoints: ['src/server.ts'],
  bundle: true,
  platform: 'node',
  target: 'node22',
  outfile: 'dist/server.cjs',
  format: 'cjs',
});
