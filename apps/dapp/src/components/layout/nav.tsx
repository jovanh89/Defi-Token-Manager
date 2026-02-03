// base css file
import 'libs/ui/src/assets/css/scrollbar.css';
import 'libs/ui/src/assets/css/globals.css';
import 'libs/ui/src/assets/css/fonts.css';
import { useToastStore } from '@defi-token/ui';
import {
  ConnectButton,
  useProviderStore,
  useWallet,
} from '@defi-token/blockchain';
import { appName } from '../../utils/constants';
import { useEffect } from 'react';

export function Nav() {
  const { addToast } = useToastStore();
  const { isConnected } = useWallet();
  const { provider } = useProviderStore();

  useEffect(() => {
    if (!isConnected) {
      addToast({
        id: 'disconnected',
        title: 'Disconnected',
        message: 'Yore are disconnected from the Sepolia Network',
        variant: 'warning',
      });
    }
  }, [addToast, isConnected]);

  return (
    <nav className="flex justify-between items-center mb-8 fixed top-0 left-0 right-0 z-10 px-2 sm:px-6 h-20 border-b-2 border-brand bg-white dark:bg-gray-900">
      <div className="text-2xl font-bold dark:text-white hidden sm:flex items-center gap-2">
        <img src="/logo.svg" alt="logo" className="w-10 h-10" />
        {appName}
      </div>
      <div className="text-2xl font-bold dark:text-white flex sm:hidden">
        <img src="/logo.svg" alt="logo" className="w-10 h-10" />
      </div>
      <div className="flex items-center sm:space-x-2">
        <ConnectButton label="Connect Wallet" provider={provider} />
      </div>
    </nav>
  );
}

export default Nav;
