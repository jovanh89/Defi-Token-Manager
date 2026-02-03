import React from 'react';
import { MetaMaskProvider as Provider } from '@metamask/sdk-react';
import { APP_NAME, INFURA_API_KEY } from '../../utils/constants';

export const MetaMaskProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <Provider
      debug={false}
      sdkOptions={{
        dappMetadata: {
          name: APP_NAME,
          url: window.location.href,
        },
        infuraAPIKey: INFURA_API_KEY,
        // Other options
      }}
    >
      {children}
    </Provider>
  );
};

export default MetaMaskProvider;
