import React from 'react';
import { TokenType } from '@defi-token/blockchain';
import Card from './card';
import TokenSelector from '../inputs/token-selector';

interface ActionCardProps {
  title: string;
  children: React.ReactNode;
  disabled: boolean;
  selectedToken: TokenType;
  setSelectedToken: (token: TokenType) => void;
}

const ActionCard: React.FC<ActionCardProps> = ({
  title,
  children,
  disabled,
  selectedToken,
  setSelectedToken,
}) => {
  const tokenSelectorProps = {
    selectedToken,
    setSelectedToken,
    disabled,
  };

  return (
    <Card isLoading={disabled}>
      <div className="sm:flex sm:justify-between sm:items-center mb-8 gap-4">
        <h2 className="text-2xl font-bold mb-4 sm:mb-0">{title}</h2>
        <TokenSelector {...tokenSelectorProps} />
      </div>
      <div className="space-y-6">{children}</div>
    </Card>
  );
};

export default ActionCard;
