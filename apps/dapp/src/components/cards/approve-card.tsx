import React, { useCallback, useEffect, useState } from 'react';
import { TokenType, useApprove } from '@defi-token/blockchain';
import { Button } from '@defi-token/ui';
import AmountInput from '../inputs/amount-input';
import ActionCard from './action-card';
import useResetNotifications from '../../hooks/use-reset-notifications';

const ApproveCard: React.FC = () => {
  const { approve, isPending, isSuccess, isError } = useApprove();
  const { reset } = useResetNotifications();

  const [amount, setAmount] = useState('');
  const [selectedToken, setSelectedToken] = useState<TokenType>('USDC');
  const [isValidAmount, setIsValidAmount] = useState(false);

  const handleDisabled = () => {
    if (isPending) return true;
    if (!isValidAmount) return true;
    if (!amount) return true;
    return false;
  };

  const handleApprove = useCallback(async () => {
    const data = await approve(selectedToken, amount);
    return data;
  }, [approve, selectedToken, amount]);

  const amountInputProps = {
    amount,
    selectedToken,
    disabled: isPending,
    setAmount,
    setIsValidAmount,
  };

  useEffect(() => {
    reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isSuccess || isError) setAmount('');
  }, [isSuccess, isError]);

  return (
    <ActionCard
      title="Approve Tokens"
      disabled={isPending}
      selectedToken={selectedToken}
      setSelectedToken={setSelectedToken}
    >
      <AmountInput {...amountInputProps} />
      <Button
        shape="rounded"
        className="w-full"
        disabled={handleDisabled()}
        onClick={() => handleApprove()}
        isLoading={isPending}
      >
        Approve {selectedToken}
      </Button>
    </ActionCard>
  );
};

export default ApproveCard;
