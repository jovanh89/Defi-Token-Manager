import { create } from 'zustand';
import { IQueryStatus } from '../types';
import { DEFAULT_QUERY_STATUS } from '../utils/constants';

export interface IActionStore {
  approveStatus: IQueryStatus;
  mintStatus: IQueryStatus;
  transferStatus: IQueryStatus;
  isSomePending: boolean;
  setApproveStatus: (status: Partial<IQueryStatus>) => void;
  setMintStatus: (status: Partial<IQueryStatus>) => void;
  setTransferStatus: (status: Partial<IQueryStatus>) => void;
  resetApproveStatus: () => void;
  resetMintStatus: () => void;
  resetTransferStatus: () => void;
  resetAllStatus: () => void;
  setIsSomePending: () => void;
}

export const useActionStore = create<IActionStore>((set, get) => ({
  approveStatus: DEFAULT_QUERY_STATUS,
  mintStatus: DEFAULT_QUERY_STATUS,
  transferStatus: DEFAULT_QUERY_STATUS,
  isSomePending: false,
  setApproveStatus: (status: Partial<IQueryStatus>) => {
    const { approveStatus } = get();
    set({ approveStatus: { ...approveStatus, ...status } });
  },
  setMintStatus: (status: Partial<IQueryStatus>) => {
    const { mintStatus } = get();
    set({ mintStatus: { ...mintStatus, ...status } });
  },
  setTransferStatus: (status: Partial<IQueryStatus>) => {
    const { transferStatus } = get();
    set({ transferStatus: { ...transferStatus, ...status } });
  },
  resetApproveStatus: () => set({ approveStatus: DEFAULT_QUERY_STATUS }),
  resetMintStatus: () => set({ mintStatus: DEFAULT_QUERY_STATUS }),
  resetTransferStatus: () => set({ transferStatus: DEFAULT_QUERY_STATUS }),
  resetAllStatus: () =>
    set({
      approveStatus: DEFAULT_QUERY_STATUS,
      mintStatus: DEFAULT_QUERY_STATUS,
      transferStatus: DEFAULT_QUERY_STATUS,
    }),
  setIsSomePending: () => {
    const { approveStatus, mintStatus, transferStatus } = get();
    set({
      isSomePending:
        approveStatus.isPending ||
        mintStatus.isPending ||
        transferStatus.isPending,
    });
  },
}));
