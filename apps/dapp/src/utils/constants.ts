import {
  DAI_DECIMALS,
  TUCU_DECIMALS,
  USDC_DECIMALS,
} from '@defi-token/blockchain';

export const appName = import.meta.env.VITE_APP_NAME;
export const environment = import.meta.env.VITE_APP_ENVIRONMENT;
export const validAddress = new RegExp('^0x[a-fA-F0-9]{40}$');
export const validDaiDecimals = new RegExp(
  `^[0-9]*[.,]?[0-9]{0,${DAI_DECIMALS}}$`
);
export const validUsdcDecimals = new RegExp(
  `^[0-9]*[.,]?[0-9]{0,${USDC_DECIMALS}}$`
);
export const validTucuDecimals = new RegExp(
  `^[0-9]*[.,]?[0-9]{0,${TUCU_DECIMALS}}$`
);
