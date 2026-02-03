/// <reference types='vitest' />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import * as path from 'path';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { nxCopyAssetsPlugin } from '@nx/vite/plugins/nx-copy-assets.plugin';

export default defineConfig({
  root: __dirname,
  cacheDir: '../../node_modules/.vite/libs/contracts',
  plugins: [
    react(),
    nxViteTsPaths(),
    nxCopyAssetsPlugin(['*.md']),
    dts({
      entryRoot: 'src',
      tsconfigPath: path.join(__dirname, 'tsconfig.lib.json'),
    }),
  ],
  resolve: {
    alias: {
      'libs/ui/src': path.resolve(__dirname, '../ui/src'),
      'libs/blockchain/src': path.resolve(__dirname, '../blockchain/src'),
      'libs/contracts/src': path.resolve(__dirname, '../contracts/src'),
    },
  },
  // build: {
  //   outDir: '../../dist/libs/blockchain',
  //   emptyOutDir: true,
  //   reportCompressedSize: true,
  //   commonjsOptions: {
  //     transformMixedEsModules: true,
  //   },
  //   lib: {
  //     entry: 'src/index.ts',
  //     name: 'blockchain',
  //     fileName: 'index',
  //     formats: ['es', 'cjs'],
  //   },
  //   rollupOptions: {
  //     external: ['react', 'react-dom', 'react/jsx-runtime'],
  //   },
  // },
});
