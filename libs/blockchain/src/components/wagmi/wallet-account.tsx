import { Button, Wallet } from '@defi-token/ui';
import { useAccount, useDisconnect, useEnsAvatar, useEnsName } from 'wagmi';

export function WalletAccount() {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  const { data: ensName } = useEnsName({ address });
  const { data: ensAvatar } = useEnsAvatar({ name: ensName || undefined });

  return (
    <Button className="w-44" onClick={() => disconnect()}>
      <div className="flex justify-start items-center gap-2">
        {ensAvatar ? <img alt="ENS Avatar" src={ensAvatar} /> : <Wallet />}
        {address && (
          <span className="w-28 truncate">
            {ensName ? `${ensName} (${address})` : address}
          </span>
        )}
      </div>
    </Button>
  );
}

export default WalletAccount;
