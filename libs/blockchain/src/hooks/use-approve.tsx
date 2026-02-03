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
import { useActionStore } from '../store/useActionStore';

export function useApprove() {
  const { address } = useWallet();
  const { addToast, dismissToast } = useToastStore();
  const { writeContractAsync, reset } = useWriteContract();
  const { useGetTokenBalance, useGetTokenAllowance } = useBalance();
  const { approveStatus, setApproveStatus, resetApproveStatus } =
    useActionStore();

  const tokenBalance = useGetTokenBalance(
    (approveStatus?.token as TokenType) || 'DAI'
  );
  const tokenAllowance = useGetTokenAllowance(
    (approveStatus?.token as TokenType) || 'DAI'
  );

  const refetchBalances = useCallback(async () => {
    if (tokenBalance) {
      await tokenBalance.refetch();
      await tokenAllowance.refetch();
    }

    addToast({
      id: 'approve-success',
      title: `Successful Approval`,
      message: `
      Amount: ${approveStatus?.amount} ${approveStatus?.token} \n
      Spender: ${approveStatus?.targetAddress} \n
      Transaction hash: ${approveStatus?.tx}
      `,
      variant: 'success',
      timeout: 600000,
      button: {
        label: 'View on Etherscan',
        onClick: () => {
          window.open(
            `${ETHERSCAN_URL}/tx/${approveStatus?.tx}`,
            '_blank',
            'noopener,noreferrer'
          );
        },
      },
    });

    resetApproveStatus();
    reset();
  }, [
    approveStatus?.token,
    approveStatus?.amount,
    approveStatus?.targetAddress,
    approveStatus?.tx,
    tokenBalance,
    tokenAllowance,
    addToast,
    resetApproveStatus,
    reset,
  ]);

  const showErrorAlert = useCallback(() => {
    addToast({
      id: 'approve-error',
      title: `Approval Error`,
      message: `
      Amount: ${approveStatus?.amount} ${approveStatus?.token} \n
      Error: ${approveStatus?.error}`,
      variant: 'destructive',
      timeout: 60000,
    });

    resetApproveStatus();
    reset();
  }, [
    addToast,
    approveStatus?.amount,
    approveStatus?.token,
    approveStatus?.error,
    resetApproveStatus,
    reset,
  ]);

  const showPendingAlert = useCallback(() => {
    addToast({
      id: 'approve-pending',
      title: `Approving, please wait...`,
      message: `
      Amount: ${approveStatus?.amount} ${approveStatus?.token} \n
      Spender: ${approveStatus?.targetAddress} \n
      Transaction hash: ${approveStatus?.tx}
      `,
      variant: 'info',
      timeout: 60000,
      button: {
        label: 'View on Etherscan',
        onClick: () => {
          window.open(
            `${ETHERSCAN_URL}/tx/${approveStatus?.tx}`,
            '_blank',
            'noopener,noreferrer'
          );
        },
      },
    });
  }, [
    addToast,
    approveStatus?.amount,
    approveStatus.targetAddress,
    approveStatus?.token,
    approveStatus?.tx,
  ]);

  const approve = useCallback(
    async (token: TokenType, amount: string, spender?: `0x${string}`) => {
      const spenderAddress = spender || (address as `0x${string}`);
      dismissToast('approve-error');
      dismissToast('approve-success');
      setApproveStatus({
        isPending: true,
        token,
        amount,
        targetAddress: spenderAddress,
      });

      try {
        const tx = await writeContractAsync({
          address: handleContract(token).address,
          abi: handleContract(token).abi,
          functionName: 'approve',
          args: [
            spenderAddress,
            parseUnits(amount, handleContract(token).decimals),
          ],
        });

        setApproveStatus({
          tx,
        });

        await waitForTransactionReceipt(config, { hash: tx });
        return tx;
      } catch (error: any) {
        console.error(error);
        const detailsMessages = extractDetailsMessage(error);
        dismissToast('approve-pending');
        setApproveStatus({
          isPending: false,
          isError: true,
          error: detailsMessages || 'An error occurred',
        });
      } finally {
        dismissToast('approve-pending');
        setApproveStatus({
          isPending: false,
          isSuccess: true,
        });
      }
    },
    [address, dismissToast, setApproveStatus, writeContractAsync]
  );

  useEffect(() => {
    if (approveStatus.isPending && approveStatus?.tx) showPendingAlert();
    if (approveStatus.isError) showErrorAlert();
    if (approveStatus.isSuccess && !approveStatus.isError) refetchBalances();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    approveStatus?.tx,
    approveStatus.isError,
    approveStatus.isSuccess,
    approveStatus.isPending,
  ]);

  return {
    approve,
    resetApproveStatus,
    isPending: approveStatus.isPending,
    isSuccess: approveStatus.isSuccess,
    isError: approveStatus.isError,
  };
}
