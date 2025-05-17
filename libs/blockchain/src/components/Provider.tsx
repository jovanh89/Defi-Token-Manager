import { FC, useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Config, WagmiProvider } from 'wagmi';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { config as wagmiConfig, rainbowConfig } from '../config';
import '@rainbow-me/rainbowkit/styles.css';
import Toast from 'libs/ui/src/components/alerts/toast';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ProviderType, useProviderStore } from '../store/useProviderStore';

interface ProviderProps {
  children: React.ReactNode;
  queryClient: QueryClient;
  configProvider?: ProviderType;
  customConfig?: Config;
}

export const Provider: FC<ProviderProps> = ({
  children,
  queryClient,
  configProvider = 'wagmi',
  customConfig,
}) => {
  const config = configProvider === 'wagmi' ? wagmiConfig : rainbowConfig;
  const { setProvider } = useProviderStore();

  useEffect(() => {
    if (configProvider) setProvider(configProvider);
  }, [configProvider, setProvider]);

  return (
    <WagmiProvider reconnectOnMount={true} config={customConfig || config}>
      <QueryClientProvider client={queryClient}>
        {configProvider === 'wagmi' ? (
          children
        ) : (
          <RainbowKitProvider>{children}</RainbowKitProvider>
        )}
        <ReactQueryDevtools initialIsOpen={true} />
      </QueryClientProvider>
      <Toast />
    </WagmiProvider>
  );
};

export default Provider;
