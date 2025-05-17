/// <reference types='vitest' />
import { defineConfig, loadEnv } from 'vite';
import { generateViteConfigBase } from './src/utils/generate-vite-config-base';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  const port = parseInt(env.VITE_APP_PORT || '3000');
  return generateViteConfigBase(
    'dapp',
    env.VITE_APP_NAME || 'DeFi Token Manager',
    port
  );
});
