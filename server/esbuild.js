import { build } from 'esbuild';

build({
  entryPoints: ['src/main.ts'],
  bundle: true,
  platform: 'node',
  target: 'node20',
  outfile: '../dist/server.cjs',
  format: 'cjs',
});
