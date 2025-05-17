import { create } from 'zustand';
import { storage } from '../libs/local-storage';
import {
  defaultColorPreset,
  defaultMode,
  IThemeItem,
  MODE,
} from '../themes/config';

export interface ITheme {
  mode: MODE;
  preset: IThemeItem;
  setMode: (mode: MODE) => void;
  setPreset: (preset: IThemeItem) => void;
}

export const useTheme = create<ITheme>((set) => {
  const settings: ITheme = storage.get('settings') || null;
  return {
    mode: settings?.mode || defaultMode,
    preset: settings?.preset || defaultColorPreset,
    setMode: (mode: MODE) =>
      set((state) => {
        storage.set('settings', { ...state, mode });
        return { mode };
      }),
    setPreset: (preset: IThemeItem) =>
      set((state) => {
        storage.set('settings', { ...state, preset });
        return { preset };
      }),
  };
});
