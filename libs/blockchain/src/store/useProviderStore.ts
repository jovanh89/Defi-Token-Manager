import { create } from 'zustand';

export type ProviderType = 'rainbow' | 'wagmi';

export interface IProviderStore {
  provider: ProviderType;
  setProvider: (provider: ProviderType) => void;
}

export const useProviderStore = create<IProviderStore>((set) => ({
  provider: 'wagmi',
  setProvider: (provider) => set({ provider }),
}));
