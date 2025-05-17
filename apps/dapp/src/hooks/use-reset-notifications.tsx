import { useApprove, useMint, useTransfer } from '@defi-token/blockchain';
import { useToastStore } from '@defi-token/ui';
import { useCallback } from 'react';

const useResetNotifications = () => {
  const { resetTransferStatus } = useTransfer();
  const { resetApproveStatus } = useApprove();
  const { resetMintStatus } = useMint();
  const { dismissToast } = useToastStore();

  const reset = useCallback(() => {
    resetApproveStatus();
    resetMintStatus();
    resetTransferStatus();
    dismissToast('approve-success');
    dismissToast('approve-error');
    dismissToast('transfer-success');
    dismissToast('transfer-error');
    dismissToast('mint-success');
    dismissToast('mint-error');
  }, [dismissToast, resetApproveStatus, resetMintStatus, resetTransferStatus]);

  return { reset };
};

export default useResetNotifications;
