import { useEffect } from 'react';
import { ColorPreset, useTheme, useThemeColor } from '@defi-token/ui';

const useLayoutTheme = () => {
  const { mode, preset, setMode, setPreset } = useTheme();
  useThemeColor(preset ? preset.value : '#14161a');
  const htmlTag = document.documentElement;
  const isDark = mode === 'dark';

  const handleRandomColor = () => {
    const index = Math.floor(Math.random() * 6);
    setPreset(ColorPreset[index]);
  };

  useEffect(() => {
    if (htmlTag) {
      if (mode === 'dark') {
        htmlTag.classList.remove('light');
        htmlTag.classList.add('dark');
      } else {
        htmlTag.classList.remove('dark');
        htmlTag.classList.add('light');
      }
    }
  }, [htmlTag, mode]);
  return { isDark, setMode, setPreset, handleRandomColor };
};

export default useLayoutTheme;
