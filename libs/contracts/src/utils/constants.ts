import dotenv from 'dotenv';
dotenv.config();

// Hardhat config
export const SEPOLIA_RPC_URL = process.env.HARDHAT_VAR_SEPOLIA_RPC_URL || '';
export const PRIVATE_KEY = process.env.HARDHAT_VAR_PRIVATE_KEY || '';
export const ETHERSCAN_API_KEY =
  process.env.HARDHAT_VAR_ETHERSCAN_API_KEY || '';
