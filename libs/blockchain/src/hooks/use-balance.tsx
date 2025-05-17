import { useCallback } from 'react';
import { useAccount, useReadContract } from 'wagmi';
import { formatUnits } from 'viem';
import { TokenType } from '../types';
import { handleContract } from '../utils/functions';

export function useBalance() {
  const { address } = useAccount();

  const daiBalance = useReadContract({
    address: handleContract('DAI').address,
    abi: handleContract('DAI').abi,
    functionName: 'balanceOf',
    args: [address as `0x${string}`],
    query: {
      enabled: !!address,
      staleTime: 0,
      gcTime: 0,
      refetchOnMount: true,
      refetchOnWindowFocus: true,
      refetchOnReconnect: true,
      refetchInterval: 0,
      retry: 1,
      select: (data) => formatUnits(data, handleContract('DAI').decimals),
    },
  });

  const usdcBalance = useReadContract({
    address: handleContract('USDC').address,
    abi: handleContract('USDC').abi,
    functionName: 'balanceOf',
    args: [address as `0x${string}`],
    query: {
      enabled: !!address,
      staleTime: 0,
      gcTime: 0,
      refetchOnMount: true,
      refetchOnWindowFocus: true,
      refetchOnReconnect: true,
      refetchInterval: 0,
      retry: 1,
      select: (data) => formatUnits(data, handleContract('USDC').decimals),
    },
  });

  const usdcAllowance = useReadContract({
    address: handleContract('USDC').address,
    abi: handleContract('USDC').abi,
    functionName: 'allowance',
    args: [address as `0x${string}`, address as `0x${string}`],
    query: {
      enabled: !!address,
      staleTime: 0,
      gcTime: 0,
      refetchOnMount: true,
      refetchOnWindowFocus: true,
      refetchOnReconnect: true,
      refetchInterval: 0,
      retry: 1,
      select: (data) => formatUnits(data, handleContract('USDC').decimals),
    },
  });

  const daiAllowance = useReadContract({
    address: handleContract('DAI').address,
    abi: handleContract('DAI').abi,
    functionName: 'allowance',
    args: [address as `0x${string}`, address as `0x${string}`],
    query: {
      enabled: !!address,
      staleTime: 0,
      gcTime: 0,
      refetchOnMount: true,
      refetchOnWindowFocus: true,
      refetchOnReconnect: true,
      refetchInterval: 0,
      retry: 1,
      select: (data) => formatUnits(data, handleContract('DAI').decimals),
    },
  });

  const getBalance = useCallback(
    (token: TokenType) => {
      return token === 'DAI'
        ? {
            data: Number(daiBalance?.data)?.toPrecision(8) || '0.00',
            allowance: Number(daiAllowance?.data)?.toPrecision(8) || '0.00',
            isLoading: daiBalance.isLoading || daiBalance.isLoadingError,
            isError: daiBalance.isError || daiAllowance.isError,
            isFetching: daiBalance.isFetching || daiAllowance.isFetching,
            error: daiBalance.error || daiAllowance.error,
          }
        : {
            data: Number(usdcBalance?.data)?.toPrecision(8) || '0.00',
            allowance: Number(usdcAllowance?.data)?.toPrecision(8) || '0.00',
            isLoading: usdcBalance.isLoading || usdcAllowance.isLoading,
            isError: usdcBalance.isError || usdcAllowance.isError,
            isFetching: usdcBalance.isFetching || usdcAllowance.isFetching,
            error: usdcBalance.error || usdcAllowance.error,
          };
    },
    [daiBalance, daiAllowance, usdcBalance, usdcAllowance]
  );

  return {
    daiBalance,
    usdcBalance,
    daiAllowance,
    usdcAllowance,
    getBalance,
  };
}
