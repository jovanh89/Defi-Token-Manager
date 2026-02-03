import { useCallback } from 'react';
import { useAccount, useReadContract } from 'wagmi';
import { formatUnits } from 'viem';
import { TokenType } from '../types';
import { handleContract } from '../utils/functions';

export function useBalance() {
  const { address } = useAccount();

  const useGetTokenBalance = (token: TokenType) =>
    useReadContract({
      address: handleContract(token).address,
      abi: handleContract(token).abi,
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
        select: (data) => formatUnits(data, handleContract(token).decimals),
      },
    });

  const useGetTokenAllowance = (token: TokenType) =>
    useReadContract({
      address: handleContract(token).address,
      abi: handleContract(token).abi,
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
        select: (data) => formatUnits(data, handleContract(token).decimals),
      },
    });

  const daiBalance = useGetTokenBalance('DAI');
  const usdcBalance = useGetTokenBalance('USDC');
  const tucuBalance = useGetTokenBalance('TUCU');

  const usdcAllowance = useGetTokenAllowance('USDC');
  const daiAllowance = useGetTokenAllowance('DAI');
  const tucuAllowance = useGetTokenAllowance('TUCU');

  const getBalance = useCallback(
    (token: TokenType) => {
      switch (token) {
        case 'DAI':
          return {
            data: Number(daiBalance?.data)?.toPrecision(8) || '0.00',
            allowance: Number(daiAllowance?.data)?.toPrecision(8) || '0.00',
            isLoading: daiBalance.isLoading || daiBalance.isLoadingError,
            isError: daiBalance.isError || daiAllowance.isError,
            isFetching: daiBalance.isFetching || daiAllowance.isFetching,
            error: daiBalance.error || daiAllowance.error,
          };
        case 'USDC':
          return {
            data: Number(usdcBalance?.data)?.toPrecision(8) || '0.00',
            allowance: Number(usdcAllowance?.data)?.toPrecision(8) || '0.00',
            isLoading: usdcBalance.isLoading || usdcAllowance.isLoading,
            isError: usdcBalance.isError || usdcAllowance.isError,
            isFetching: usdcBalance.isFetching || usdcAllowance.isFetching,
            error: usdcBalance.error || usdcAllowance.error,
          };
        case 'TUCU':
          return {
            data: Number(tucuBalance?.data)?.toPrecision(8) || '0.00',
            allowance: Number(tucuAllowance?.data)?.toPrecision(8) || '0.00',
            isLoading: tucuBalance.isLoading || tucuAllowance.isLoading,
            isError: tucuBalance.isError || tucuAllowance.isError,
            isFetching: tucuBalance.isFetching || tucuAllowance.isFetching,
            error: tucuBalance.error || tucuAllowance.error,
          };
        default:
          return {
            data: '0.00',
            allowance: '0.00',
            isLoading: false,
            isError: false,
            isFetching: false,
            error: null,
          };
      }
    },
    [
      daiBalance,
      daiAllowance,
      usdcBalance,
      usdcAllowance,
      tucuBalance,
      tucuAllowance,
    ]
  );

  return {
    daiBalance,
    usdcBalance,
    tucuBalance,
    daiAllowance,
    usdcAllowance,
    tucuAllowance,
    useGetTokenBalance,
    useGetTokenAllowance,
    getBalance,
  };
}
