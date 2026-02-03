import React from 'react';
import { handleContract, useBalance } from '@defi-token/blockchain';
import Card from './card';
import TokenCard, { TokenCardProps } from './token-card';
import { Dai, Tucu, Usdc, useTheme } from '@defi-token/ui';

const BalanceCard: React.FC = () => {
  const { getBalance } = useBalance();
  const { mode } = useTheme();

  const isLoading =
    getBalance('DAI').isLoading ||
    getBalance('USDC').isLoading ||
    getBalance('TUCU').isLoading;
  const isError =
    getBalance('DAI').isError ||
    getBalance('USDC').isError ||
    getBalance('TUCU').isError;

  const tokens: TokenCardProps[] = [
    {
      name: 'DAI',
      symbol: 'DAI',
      icon: <Dai />,
      balance: getBalance('DAI').data,
      allowance: getBalance('DAI').allowance,
      isLoading: getBalance('DAI').isLoading || getBalance('DAI').isFetching,
      contractAddress: handleContract('DAI').address,
      isError: getBalance('DAI').isError,
      isBorder: true,
    },
    {
      name: 'USDC',
      symbol: 'USDC',
      icon: <Usdc />,
      balance: getBalance('USDC').data,
      allowance: getBalance('USDC').allowance,
      isLoading: getBalance('USDC').isLoading || getBalance('USDC').isFetching,
      contractAddress: handleContract('USDC').address,
      isError: getBalance('USDC').isError,
      isBorder: true,
    },
    {
      name: 'TUCU',
      symbol: 'TUCU',
      icon: <Tucu color={mode === 'dark' ? 'white' : 'black'} />,
      balance: getBalance('TUCU').data,
      allowance: getBalance('TUCU').allowance,
      isLoading: getBalance('TUCU').isLoading || getBalance('TUCU').isFetching,
      contractAddress: handleContract('TUCU').address,
      isError: getBalance('TUCU').isError,
      isBorder: true,
    },
  ];

  return (
    <Card title="Balances" isLoading={isLoading && !isError}>
      <div className="grid gap-4 sm:grid-cols-2">
        {tokens.map((token, index) => (
          <TokenCard key={index} {...token} />
        ))}
      </div>
    </Card>
  );
};

export default BalanceCard;
