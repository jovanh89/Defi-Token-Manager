import React from 'react';
import {
  ConnectButton as RainbowButton,
  WalletButton,
} from '@rainbow-me/rainbowkit';
import { useWallet } from '../../hooks';
import { Button } from '@defi-token/ui';

interface RainbowConnectButtonProps {
  label: string;
}

export const RainbowConnectButton: React.FC<RainbowConnectButtonProps> = ({
  label,
}) => {
  const { isConnected } = useWallet();
  return (
    <>
      {!isConnected ? (
        <WalletButton.Custom wallet="metamask">
          {({ ready, connect, loading }) => {
            return (
              <Button
                shape="rounded"
                size="medium"
                isLoading={loading}
                disabled={!ready}
                onClick={connect}
              >
                Connect Wallet
              </Button>
            );
          }}
        </WalletButton.Custom>
      ) : (
        <RainbowButton
          label={label}
          accountStatus="full"
          chainStatus={{
            largeScreen: 'full',
            smallScreen: 'icon',
          }}
          showBalance={{
            largeScreen: true,
            smallScreen: false,
          }}
        />
      )}
    </>
  );
};

export default RainbowConnectButton;
