import React from 'react';
import { useWallet } from '../../hooks';
import WalletAccount from './wallet-account';
import WalletOptions from './wallet-options';

interface WagmiConnectButtonProps {
  label: string;
}

export const WagmiConnectButton: React.FC<WagmiConnectButtonProps> = ({
  label,
}) => {
  const { isConnected } = useWallet();
  return (
    <>{isConnected ? <WalletAccount /> : <WalletOptions label={label} />}</>
  );
};

export default WagmiConnectButton;
