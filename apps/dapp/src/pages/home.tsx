import { useState } from 'react';
import BalanceCard from '../components/cards/balance-card';
import MintCard from '../components/cards/mint-card';
import TransferCard from '../components/cards/transfer-card';
import Layout from '../components/layout';
import {
  ActionType,
  useApprove,
  useMint,
  useTransfer,
} from '@defi-token/blockchain';
import ActionSelector from '../components/inputs/action-selector';
import ApproveCard from '../components/cards/approve-card';
import { environment } from '../utils/constants';

function Home() {
  const [selectedAction, setSelectedAction] = useState<ActionType>('APPROVE');
  const { isPending: isTransferPending } = useTransfer();
  const { isPending: isApprovePending } = useApprove();
  const { isPending: isMintPending } = useMint();

  const isPending = isTransferPending || isApprovePending || isMintPending;

  const actionSelectorProps = {
    selectedAction,
    setSelectedAction,
    disabled: isPending,
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 my-8 space-y-8 w-full max-w-2xl">
        <BalanceCard />
        <ActionSelector {...actionSelectorProps} />
        {selectedAction === 'APPROVE' && <ApproveCard />}
        {selectedAction === 'TRANSFER' && <TransferCard />}
        {selectedAction === 'MINT' && environment === 'develop' && <MintCard />}
      </div>
    </Layout>
  );
}

export default Home;
