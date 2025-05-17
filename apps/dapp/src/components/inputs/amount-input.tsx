import React, { useEffect } from 'react';
import { ActionType, TokenType, useBalance } from '@defi-token/blockchain';
import { Dai, Input, Usdc } from '@defi-token/ui';
import { validDaiDecimals, validUsdcDecimals } from '../../utils/constants';

interface AmountInputProps {
  amount: string;
  disabled: boolean;
  selectedToken: TokenType;
  action?: ActionType;
  setAmount: React.Dispatch<React.SetStateAction<string>>;
  setIsValidAmount: React.Dispatch<React.SetStateAction<boolean>>;
}

const AmountInput: React.FC<AmountInputProps> = ({
  amount,
  selectedToken,
  disabled,
  action,
  setAmount,
  setIsValidAmount,
}) => {
  const { getBalance } = useBalance();
  const allowance = Number(getBalance(selectedToken).allowance) || 0;
  const balance = Number(getBalance(selectedToken).data) || 0;

  const handleAmountValidation = () => {
    if (!amount) return 'Amount is required';
    if (Number(amount) <= 0 || amount === '0')
      return 'Amount must be greater than 0';
    if (action === 'TRANSFER' && Number(amount) > balance)
      return 'Not enough funds on balance';
    if (action === 'TRANSFER' && Number(amount) > allowance)
      return 'Insufficient allowance, need to approve token first';
    if (selectedToken === 'DAI' && !amount.match(validDaiDecimals))
      return 'Invalid amount, for DAI use up to 18 decimals';
    if (selectedToken === 'USDC' && !amount.match(validUsdcDecimals))
      return 'Invalid amount, for USDC use up to 6 decimals';
    return '';
  };

  const isValidAmount = handleAmountValidation().length === 0;

  useEffect(() => {
    setIsValidAmount(isValidAmount);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isValidAmount]);

  return (
    <Input
      data-testid="amount-input"
      required
      className="w-full"
      label={`${selectedToken} Amount`}
      value={amount}
      onChange={(e) => setAmount(e.target.value)}
      type="number"
      min="0"
      icon={selectedToken === 'DAI' ? <Dai /> : <Usdc />}
      placeholder={'0.00'}
      step={selectedToken === 'DAI' ? '.000000000000000001' : '.000001'}
      pattern={
        selectedToken === 'DAI'
          ? validDaiDecimals.source
          : validUsdcDecimals.source
      }
      error={handleAmountValidation()}
      onBlur={() => {
        if (amount === '0') setAmount('');
        return;
      }}
      disabled={disabled}
    />
  );
};

export default AmountInput;
