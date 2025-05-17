import React from 'react';
import { TOKENS, TokenType } from '@defi-token/blockchain';
import { Button } from '@defi-token/ui';

interface TokenSelectorProps {
  selectedToken: TokenType;
  setSelectedToken: (token: TokenType) => void;
  disabled: boolean;
}

const TokenSelector: React.FC<TokenSelectorProps> = ({
  selectedToken,
  setSelectedToken,
  disabled,
}) => {
  return (
    <div className="flex space-x-4">
      {TOKENS.map((token, index) => (
        <Button
          key={index}
          onClick={() => (disabled ? null : setSelectedToken(token))}
          className="w-full"
          size="mini"
          variant={selectedToken === token ? 'solid' : 'ghost'}
          disabled={disabled}
        >
          {token}
        </Button>
      ))}
    </div>
  );
};

export default TokenSelector;
