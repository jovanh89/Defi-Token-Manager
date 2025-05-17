import React, { useCallback, useEffect, useState } from 'react';
import { TokenType, useTransfer } from '@defi-token/blockchain';
import { Button } from '@defi-token/ui';
import AmountInput from '../inputs/amount-input';
import AddressInput from '../inputs/address-input';
import ActionCard from './action-card';
import useResetNotifications from '../../hooks/use-reset-notifications';

const TransferCard: React.FC = () => {
  const { transferFrom, isPending, isSuccess, isError } = useTransfer();
  const { reset } = useResetNotifications();

  const [amount, setAmount] = useState('');
  const [targetAddress, setTargetAddress] = useState('');
  const [selectedToken, setSelectedToken] = useState<TokenType>('USDC');
  const [isValidAmount, setIsValidAmount] = useState(false);
  const [isValidAddress, setIsValidAddress] = useState(false);

  const handleDisabled = () => {
    if (isPending) return true;
    if (!isValidAddress) return true;
    if (!isValidAmount) return true;
    if (!amount) return true;
    if (!targetAddress) return true;
    return false;
  };

  const handleTransfer = useCallback(async () => {
    const data = await transferFrom(
      selectedToken,
      targetAddress as `0x${string}`,
      amount
    );
    return data;
  }, [transferFrom, selectedToken, targetAddress, amount]);

  const amountInputProps = {
    amount,
    selectedToken,
    disabled: isPending,
    setAmount,
    setIsValidAmount,
  };

  const addressInputProps = {
    targetAddress,
    selectedToken,
    disabled: isPending,
    setTargetAddress,
    setIsValidAddress,
  };

  useEffect(() => {
    reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isSuccess || isError) {
      setAmount('');
      setTargetAddress('');
    }
  }, [isSuccess, isError]);

  return (
    <ActionCard
      title="Transfer Tokens"
      disabled={isPending}
      selectedToken={selectedToken}
      setSelectedToken={setSelectedToken}
    >
      <AddressInput {...addressInputProps} />
      <AmountInput {...amountInputProps} action="TRANSFER" />
      <Button
        shape="rounded"
        className="w-full"
        onClick={() => handleTransfer()}
        disabled={handleDisabled()}
        isLoading={isPending}
      >
        Transfer {selectedToken}
      </Button>
    </ActionCard>
  );
};

export default TransferCard;
