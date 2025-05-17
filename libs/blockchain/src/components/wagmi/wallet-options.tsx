import { Button, Modal } from '@defi-token/ui';
import * as React from 'react';
import { Connector, useConnect } from 'wagmi';

export function WalletOptions({ label }: { label?: string }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const { connectors, connect } = useConnect();

  return (
    <>
      <Button shape="rounded" onClick={() => setIsOpen(true)}>
        {label || 'Connect Wallet'}
      </Button>
      <Modal
        title="Connect Wallet"
        description={'Please select a wallet to connect'}
        isOpen={isOpen}
        setIsOpen={() => setIsOpen(false)}
        backButtonText="Back"
        backButtonAction={() => setIsOpen(false)}
      >
        <div className="space-y-4 pt-4">
          {connectors.map((connector) => (
            <WalletOption
              key={connector.uid}
              connector={connector}
              onClick={() => {
                connect({ connector });
                setIsOpen(false);
              }}
            />
          ))}
        </div>
      </Modal>
    </>
  );
}

function WalletOption({
  connector,
  onClick,
}: {
  connector: Connector;
  onClick: () => void;
}) {
  const [ready, setReady] = React.useState(false);

  React.useEffect(() => {
    (async () => {
      const provider = await connector.getProvider();
      setReady(!!provider);
    })();
  }, [connector]);

  return (
    <>
      <Button className="w-full" disabled={!ready} onClick={onClick}>
        {connector.name}
      </Button>
    </>
  );
}

export default WalletOptions;
