import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { sepolia } from 'wagmi/chains';
import { createConfig, http } from 'wagmi';
import {
  APP_NAME,
  SEPOLIA_CUSTOM_RPC_URL,
  WALLET_CONNECT_PROJECT_ID,
} from '../utils';
import { metaMask, walletConnect } from 'wagmi/connectors';

const projectId = WALLET_CONNECT_PROJECT_ID;
const rpcUrl = SEPOLIA_CUSTOM_RPC_URL || sepolia.rpcUrls.default.http[0];

export const rainbowConfig = getDefaultConfig({
  appName: APP_NAME,
  projectId,
  chains: [sepolia],
  transports: {
    [sepolia.id]: http(rpcUrl),
  },
});

export const config = createConfig({
  chains: [sepolia],
  connectors: [walletConnect({ projectId }), metaMask()],
  transports: {
    [sepolia.id]: http(rpcUrl),
  },
});
