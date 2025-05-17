export interface IThemeItem {
  label: string;
  value: string;
}

export type MODE = 'light' | 'dark';

export const ColorPreset: IThemeItem[] = [
  {
    label: 'Blue',
    value: '#2a52be',
  },
  {
    label: 'Green',
    value: '#009e60',
  },
  {
    label: 'Black',
    value: '#323743',
  },
  {
    label: 'Red',
    value: '#e34234',
  },
  {
    label: 'Purple',
    value: '#9370DB',
  },
  {
    label: 'Orange',
    value: '#ffa500',
  },
];

export const defaultColorPreset = ColorPreset[0];

export const defaultMode = 'dark';
