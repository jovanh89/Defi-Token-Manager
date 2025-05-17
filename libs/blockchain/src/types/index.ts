export type TokenType = 'DAI' | 'USDC';

export type ActionType = 'APPROVE' | 'TRANSFER' | 'MINT';

export interface IQueryStatus {
  isError: boolean;
  isSuccess: boolean;
  isPending: boolean;
  tx?: string;
  error?: string | unknown;
  token?: TokenType | null;
  amount?: string;
  targetAddress?: string;
}
