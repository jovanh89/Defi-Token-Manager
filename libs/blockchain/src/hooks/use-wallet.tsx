import { useAccount, useConnect, useDisconnect, useSwitchChain } from 'wagmi';
import { CHAIN_ID } from '../utils';

export function useWallet() {
  const { address, isConnected, chainId: currentChainId } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  const { switchChain } = useSwitchChain();

  const isWrongNetwork = currentChainId !== CHAIN_ID;

  const switchToSepolia = () => {
    switchChain({ chainId: CHAIN_ID });
  };

  return {
    address,
    isConnected,
    connectors,
    isWrongNetwork,
    currentChainId,
    connect,
    disconnect,
    switchToSepolia,
  };
}
