import { HardhatUserConfig } from 'hardhat/config';
import '@nomicfoundation/hardhat-toolbox';
import {
  SEPOLIA_RPC_URL,
  PRIVATE_KEY,
  ETHERSCAN_API_KEY,
} from './src/utils/constants';

const config: HardhatUserConfig = {
  solidity: '0.8.28',
  //defaultNetwork: 'sepolia',
  networks: {
    sepolia: {
      url: SEPOLIA_RPC_URL,
      accounts: [PRIVATE_KEY],
    },
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  },
  paths: {
    sources: './contracts',
    tests: './test',
    cache: './cache',
    artifacts: './artifacts',
  },
  sourcify: {
    enabled: true,
  },
};

export default config;
