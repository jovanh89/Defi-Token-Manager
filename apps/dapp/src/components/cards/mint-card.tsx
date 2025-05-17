import React, { useEffect, useState } from 'react';
import { TokenType, useMint } from '@defi-token/blockchain';
import { Button } from '@defi-token/ui';
import AmountInput from '../inputs/amount-input';
import ActionCard from './action-card';
import useResetNotifications from '../../hooks/use-reset-notifications';

const MintCard: React.FC = () => {
  const { mint, isPending, isSuccess, isError } = useMint();
  const { reset } = useResetNotifications();

  const [selectedToken, setSelectedToken] = useState<TokenType>('USDC');
  const [amount, setAmount] = useState<string>('');
  const [isValidAmount, setIsValidAmount] = useState<boolean>(false);

  const handleDisabled = () => {
    if (!isValidAmount) return true;
    if (!amount) return true;
    if (isPending) return true;
    return false;
  };

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
  }, [isError, isSuccess]);

  return (
    <ActionCard
      title="Mint Tokens"
      disabled={isPending}
      selectedToken={selectedToken}
      setSelectedToken={setSelectedToken}
    >
      <AmountInput {...amountInputProps} />
      <Button
        shape="rounded"
        className="w-full"
        onClick={() => mint(selectedToken, amount)}
        disabled={handleDisabled()}
        isLoading={isPending}
      >
        Mint {selectedToken}
      </Button>
    </ActionCard>
  );
};

export default MintCard;
