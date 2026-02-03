/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect } from 'react';
import { useWriteContract } from 'wagmi';
import { parseUnits } from 'viem';
import { useToastStore } from '@defi-token/ui';
import { TokenType } from '../types';
import { ETHERSCAN_URL, extractDetailsMessage, handleContract } from '../utils';
import { useBalance } from './use-balance';
import { waitForTransactionReceipt } from '@wagmi/core';
import { config } from '../config';
import { useWallet } from './use-wallet';
import { useActionStore } from '../store';

export function useTransfer() {
  const { address } = useWallet();
  const { addToast, dismissToast } = useToastStore();
  const { writeContractAsync, reset } = useWriteContract();
  const { useGetTokenBalance, useGetTokenAllowance } = useBalance();
  const { transferStatus, setTransferStatus, resetTransferStatus } =
    useActionStore();

  const tokenBalance = useGetTokenBalance(
    (transferStatus?.token as TokenType) || 'DAI'
  );
  const tokenAllowance = useGetTokenAllowance(
    (transferStatus?.token as TokenType) || 'DAI'
  );

  const refetchBalances = useCallback(async () => {
    if (tokenBalance) {
      await tokenBalance.refetch();
      await tokenAllowance.refetch();
    }

    addToast({
      id: 'transfer-success',
      title: `Transfer Successful`,
      message: `
      Amount: ${transferStatus?.amount} ${transferStatus?.token} \n
      To: ${transferStatus?.targetAddress} \n
      Transaction hash: ${transferStatus?.tx}
      `,
      variant: 'success',
      timeout: 15000,
      button: {
        label: 'View on Etherscan',
        onClick: () => {
          window.open(
            `${ETHERSCAN_URL}/tx/${transferStatus?.tx}`,
            '_blank',
            'noopener,noreferrer'
          );
        },
      },
    });

    resetTransferStatus();
    reset();
  }, [
    transferStatus?.token,
    transferStatus?.amount,
    transferStatus?.targetAddress,
    transferStatus?.tx,
    tokenBalance,
    tokenAllowance,
    addToast,
    resetTransferStatus,
    reset,
  ]);

  const showErrorAlert = useCallback(() => {
    addToast({
      id: 'transfer-error',
      title: `Transfer Error`,
      message: `
      Amount: ${transferStatus?.amount} ${transferStatus?.token} \n
      To: ${transferStatus?.targetAddress} \n
      Error: ${transferStatus?.error}
      `,
      variant: 'destructive',
      timeout: 60000,
    });

    resetTransferStatus();
    reset();
  }, [
    addToast,
    transferStatus?.amount,
    transferStatus?.token,
    transferStatus?.targetAddress,
    transferStatus?.error,
    resetTransferStatus,
    reset,
  ]);

  const showPendingAlert = useCallback(() => {
    addToast({
      id: 'transfer-pending',
      title: `Transferring, please wait...`,
      message: `
      Amount: ${transferStatus?.amount} ${transferStatus?.token} \n
      To: ${transferStatus?.targetAddress} \n
      Transaction hash: ${transferStatus?.tx}
      `,
      variant: 'info',
      timeout: 60000,
      button: {
        label: 'View on Etherscan',
        onClick: () => {
          window.open(
            `${ETHERSCAN_URL}/tx/${transferStatus?.tx}`,
            '_blank',
            'noopener,noreferrer'
          );
        },
      },
    });
  }, [
    addToast,
    transferStatus?.amount,
    transferStatus.targetAddress,
    transferStatus?.token,
    transferStatus?.tx,
  ]);

  const transfer = useCallback(
    async (token: TokenType, to: `0x${string}`, amount: string) => {
      dismissToast('transfer-error');
      dismissToast('transfer-success');

      setTransferStatus({
        isPending: true,
        token,
        amount,
        targetAddress: to,
      });

      try {
        const tx = await writeContractAsync({
          address: handleContract(token).address,
          abi: handleContract(token).abi,
          functionName: 'transfer',
          args: [to, parseUnits(amount, handleContract(token).decimals)],
        });

        setTransferStatus({
          tx,
        });

        await waitForTransactionReceipt(config, { hash: tx });
        return tx;
      } catch (error: any) {
        console.error(error);
        dismissToast('transfer-pending');
        setTransferStatus({
          isPending: false,
          isError: true,
          error: error?.message,
        });
      } finally {
        dismissToast('transfer-pending');
        setTransferStatus({
          isPending: false,
          isSuccess: true,
        });
      }
    },
    [dismissToast, setTransferStatus, writeContractAsync]
  );

  const transferFrom = useCallback(
    async (token: TokenType, to: `0x${string}`, amount: string) => {
      dismissToast('transfer-error');
      dismissToast('transfer-success');

      setTransferStatus({
        isPending: true,
        token,
        amount,
        targetAddress: to,
      });

      try {
        const tx = await writeContractAsync({
          address: handleContract(token).address,
          abi: handleContract(token).abi,
          functionName: 'transferFrom',
          args: [
            address as `0x${string}`,
            to,
            parseUnits(amount, handleContract(token).decimals),
          ],
        });

        setTransferStatus({
          tx,
        });

        await waitForTransactionReceipt(config, { hash: tx });
        return tx;
      } catch (error: any) {
        console.error(error);
        const detailsMessages = extractDetailsMessage(error);
        dismissToast('transfer-pending');
        setTransferStatus({
          isPending: false,
          isError: true,
          error: detailsMessages || 'An error occurred',
        });
      } finally {
        dismissToast('transfer-pending');
        setTransferStatus({
          isPending: false,
          isSuccess: true,
        });
      }
    },
    [dismissToast, setTransferStatus, writeContractAsync, address]
  );

  useEffect(() => {
    if (transferStatus.isPending && transferStatus?.tx) showPendingAlert();
    if (transferStatus.isError) showErrorAlert();
    if (transferStatus.isSuccess && !transferStatus.isError) refetchBalances();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    transferStatus?.tx,
    transferStatus.isError,
    transferStatus.isSuccess,
    transferStatus.isPending,
  ]);

  return {
    transfer,
    transferFrom,
    resetTransferStatus,
    isPending: transferStatus.isPending,
    isSuccess: transferStatus.isSuccess,
    isError: transferStatus.isError,
  };
}
