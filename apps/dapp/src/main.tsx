import * as ReactDOM from 'react-dom/client';

import App from './app';
import { BrowserRouter } from 'react-router-dom';
import { MetaMaskProvider } from '@defi-token/blockchain';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <BrowserRouter>
    <MetaMaskProvider>
      <App />
    </MetaMaskProvider>
  </BrowserRouter>
);
