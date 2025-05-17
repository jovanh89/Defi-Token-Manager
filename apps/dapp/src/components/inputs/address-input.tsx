import React, { useEffect } from 'react';
import { TokenType } from '@defi-token/blockchain';
import { Input, Wallet } from '@defi-token/ui';
import { validAddress } from '../../utils/constants';

interface AddressInputProps {
  targetAddress: string;
  disabled: boolean;
  selectedToken: TokenType;
  setTargetAddress: React.Dispatch<React.SetStateAction<string>>;
  setIsValidAddress: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddressInput: React.FC<AddressInputProps> = ({
  targetAddress,
  selectedToken,
  disabled,
  setTargetAddress,
  setIsValidAddress,
}) => {
  const handleAddressValidation = () => {
    if (!targetAddress) return 'Address is required';
    if (!targetAddress.startsWith('0x')) return 'Address must start with 0x';
    if (!validAddress.test(targetAddress))
      return 'Invalid address, must be hexadecimal and 42 characters long';
    return '';
  };

  const isValidAddress = handleAddressValidation().length === 0;

  useEffect(() => {
    setIsValidAddress(isValidAddress);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isValidAddress]);

  return (
    <Input
      data-testid="address-input"
      required
      label={`${selectedToken} Target Address`}
      value={targetAddress}
      onChange={(e) => setTargetAddress(e.target.value)}
      placeholder="0x..."
      pattern={validAddress.source}
      error={handleAddressValidation()}
      disabled={disabled}
      icon={<Wallet />}
    />
  );
};

export default AddressInput;
