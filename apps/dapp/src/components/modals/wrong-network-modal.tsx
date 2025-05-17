import React, { useEffect } from 'react';
import { useWallet } from '@defi-token/blockchain';
import { Modal, useToastStore } from '@defi-token/ui';

const WrongNetworkModal = () => {
  const { isConnected, isWrongNetwork, switchToSepolia } = useWallet();
  const { addToast } = useToastStore();

  useEffect(() => {
    if (isWrongNetwork && isConnected) {
      addToast({
        id: 'wrong-network',
        variant: 'destructive',
        title: 'Wrong Network',
        message: 'Please switch to the Sepolia Network',
      });
    }
  }, [isWrongNetwork, addToast, isConnected]);

  return (
    <Modal
      title="Wrong Network"
      description={`Please switch to the Sepolia Network`}
      isOpen={isWrongNetwork && isConnected}
      confirmButtonAction={() => switchToSepolia()}
      confirmButtonText="Switch Network"
    />
  );
};

export default WrongNetworkModal;
