/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect } from 'react';
import { useWriteContract } from 'wagmi';
import { parseUnits } from 'viem';
import { useToastStore } from '@defi-token/ui';
import { useBalance } from './use-balance';
import { waitForTransactionReceipt } from '@wagmi/core';
import { config } from '../config';
import { TokenType } from '../types';
import { ETHERSCAN_URL, extractDetailsMessage, handleContract } from '../utils';
import { useWallet } from './use-wallet';
import { useActionStore } from '../store';

export function useMint() {
  const { address } = useWallet();
  const { addToast, dismissToast } = useToastStore();
  const { writeContractAsync, reset } = useWriteContract();
  const { useGetTokenBalance, useGetTokenAllowance } = useBalance();
  const { mintStatus, setMintStatus, resetMintStatus } = useActionStore();

  const tokenBalance = useGetTokenBalance(
    (mintStatus?.token as TokenType) || 'DAI'
  );
  const tokenAllowance = useGetTokenAllowance(
    (mintStatus?.token as TokenType) || 'DAI'
  );

  const refetchBalances = useCallback(async () => {
    if (tokenBalance) {
      await tokenBalance.refetch();
      await tokenAllowance.refetch();
    }

    addToast({
      id: 'mint-success',
      title: `Mint Successful`,
      message: `
      Amount: ${mintStatus?.amount} ${mintStatus?.token} \n
      Transaction hash: ${mintStatus?.tx}
      `,
      variant: 'success',
      timeout: 15000,
      button: {
        label: 'View on Etherscan',
        onClick: () => {
          window.open(
            `${ETHERSCAN_URL}/tx/${mintStatus?.tx}`,
            '_blank',
            'noopener,noreferrer'
          );
        },
      },
    });

    resetMintStatus();
    reset();
  }, [
    addToast,
    tokenBalance,
    tokenAllowance,
    mintStatus?.amount,
    mintStatus?.token,
    mintStatus?.tx,
    resetMintStatus,
    reset,
  ]);

  const showErrorAlert = useCallback(() => {
    addToast({
      id: 'mint-error',
      title: `Mint Error`,
      message: `
      Amount: ${mintStatus?.amount} ${mintStatus?.token} \n
      Error: ${mintStatus?.error}
      `,
      variant: 'destructive',
      timeout: 60000,
    });

    resetMintStatus();
    reset();
  }, [
    addToast,
    mintStatus?.amount,
    mintStatus?.error,
    mintStatus?.token,
    resetMintStatus,
    reset,
  ]);

  const showPendingAlert = useCallback(() => {
    addToast({
      id: 'minting',
      title: `Minting, please wait...`,
      message: `
      Amount: ${mintStatus?.amount} ${mintStatus?.token} \n
      Transaction hash: ${mintStatus?.tx}`,
      variant: 'info',
      timeout: 60000,
      button: {
        label: 'View on Etherscan',
        onClick: () => {
          window.open(
            `${ETHERSCAN_URL}/tx/${mintStatus?.tx}`,
            '_blank',
            'noopener,noreferrer'
          );
        },
      },
    });
  }, [addToast, mintStatus?.amount, mintStatus?.token, mintStatus?.tx]);

  const mint = useCallback(
    async (token: TokenType, amount: string) => {
      dismissToast('mint-error');
      dismissToast('mint-success');

      setMintStatus({
        isPending: true,
        token,
        amount,
      });

      try {
        const tx = await writeContractAsync({
          address: handleContract(token).address,
          abi: handleContract(token).abi,
          functionName: 'mint',
          args: [
            address as `0x${string}`,
            parseUnits(amount, handleContract(token).decimals),
          ],
        });

        setMintStatus({
          tx,
        });

        await waitForTransactionReceipt(config, { hash: tx });
        return tx;
      } catch (error: any) {
        console.error(error);
        const detailsMessages = extractDetailsMessage(error);
        dismissToast('minting');
        setMintStatus({
          isPending: false,
          isError: true,
          error: detailsMessages || 'An error occurred',
        });
      } finally {
        dismissToast('minting');
        setMintStatus({
          isPending: false,
          isSuccess: true,
        });
      }
    },
    [dismissToast, setMintStatus, writeContractAsync, address]
  );

  useEffect(() => {
    if (mintStatus.isPending && mintStatus?.tx) showPendingAlert();
    if (mintStatus.isError) showErrorAlert();
    if (mintStatus.isSuccess) refetchBalances();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    mintStatus?.tx,
    mintStatus.isError,
    mintStatus.isSuccess,
    mintStatus.isPending,
  ]);

  return {
    mint,
    resetMintStatus,
    isPending: mintStatus.isPending,
    isSuccess: mintStatus.isSuccess,
    isError: mintStatus.isError,
  };
}
