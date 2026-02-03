import { TokenType } from '../types';
import {
  CHAIN_ID,
  DAI_CONTRACT_ADDRESS,
  DAI_DECIMALS,
  TUCU_CONTRACT_ADDRESS,
  TUCU_DECIMALS,
  USDC_CONTRACT_ADDRESS,
  USDC_DECIMALS,
} from './constants';
import { DAI_ABI, USDC_ABI, TUCU_ABI } from '@defi-token/contracts';

export const handleContract = (token: TokenType) => {
  switch (token) {
    case 'DAI':
      return {
        address: DAI_CONTRACT_ADDRESS,
        abi: DAI_ABI,
        decimals: DAI_DECIMALS,
        chainId: CHAIN_ID,
      };
    case 'USDC':
      return {
        address: USDC_CONTRACT_ADDRESS,
        abi: USDC_ABI,
        decimals: USDC_DECIMALS,
        chainId: CHAIN_ID,
      };
    case 'TUCU':
      return {
        address: TUCU_CONTRACT_ADDRESS,
        abi: TUCU_ABI,
        decimals: TUCU_DECIMALS,
        chainId: CHAIN_ID,
      };
    default:
      throw new Error('Invalid token');
  }
};

export function extractDetailsMessage(errorString: string): string[] {
  const regex = /Details:\s(.*?)(?:\n|$)/g;
  const matches = [];
  let match;

  while ((match = regex.exec(errorString))) {
    matches.push(match[1].trim());
  }

  return matches;
}
