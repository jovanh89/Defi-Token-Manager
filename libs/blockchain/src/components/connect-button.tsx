import React from 'react';
import RainbowConnectButton from './rainbow/rainbow-connect-button';
import WagmiConnectButton from './wagmi/wagmi-connect-button';

interface ConnectButtonProps {
  label: string;
  provider?: 'rainbow' | 'wagmi';
}

export const ConnectButton: React.FC<ConnectButtonProps> = ({
  label,
  provider = 'wagmi',
}) => {
  return (
    <>
      {provider === 'rainbow' && <RainbowConnectButton label={label} />}
      {provider === 'wagmi' && <WagmiConnectButton label={label} />}
    </>
  );
};

export default ConnectButton;
