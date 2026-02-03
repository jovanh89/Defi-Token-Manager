import { IQueryStatus } from '../types';

export const CHAIN_ID = Number(import.meta.env.VITE_APP_SEPOLIA_CHAIN_ID);
export const DAI_CONTRACT_ADDRESS = import.meta.env
  .VITE_APP_DAI_TOKEN_CONTRACT_ADDRESS as `0x${string}`;
export const USDC_CONTRACT_ADDRESS = import.meta.env
  .VITE_APP_USDC_TOKEN_CONTRACT_ADDRESS as `0x${string}`;
export const TUCU_CONTRACT_ADDRESS = import.meta.env
  .VITE_APP_TUCU_TOKEN_CONTRACT_ADDRESS as `0x${string}`;

export const TUCU_DECIMALS = 18;
export const DAI_DECIMALS = 18;
export const USDC_DECIMALS = 6;

export const WALLET_CONNECT_PROJECT_ID =
  (import.meta.env.VITE_APP_WALLET_CONNECT_PROJECT_ID as string) || '';
export const APP_NAME = (import.meta.env.VITE_APP_NAME as string) || '';
export const ENVIRONMENT = import.meta.env.VITE_APP_ENVIRONMENT;
export const INFURA_API_KEY =
  (import.meta.env.VITE_APP_INFURA_API_KEY as string) || '';

export const ETHERSCAN_URL =
  (import.meta.env.VITE_APP_ETHERSCAN_URL as string) || '';
export const SEPOLIA_CUSTOM_RPC_URL =
  (import.meta.env.VITE_APP_SEPOLIA_CUSTOM_RPC_URL as string) || '';

export const DEFAULT_QUERY_STATUS: IQueryStatus = {
  isError: false,
  isSuccess: false,
  isPending: false,
  tx: '',
  amount: '',
  error: '',
  token: null,
  targetAddress: '',
};

export const TOKENS = ['USDC', 'DAI', 'TUCU'] as const;
export const ACTIONS = ['APPROVE', 'TRANSFER', 'MINT'] as const;
