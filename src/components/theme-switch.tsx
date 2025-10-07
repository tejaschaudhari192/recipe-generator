'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Switch } from '@/components/ui/switch';
import { Moon, Sun } from 'lucide-react';

interface ThemeSwitchProps {
  type: 'switch' | 'icon';
}

export default function ThemeSwitch({ type }: ThemeSwitchProps) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  // Wait until after mount to avoid hydration mismatch
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    document.cookie = `theme=${theme}; path=/`;
  }, [theme]);

  if (!isMounted) return null;

  const isDark = resolvedTheme === 'dark';
  switch (type) {
    case 'switch':
      return (
        <Switch
          checked={isDark}
          onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
        />
      );
    case 'icon':
      return (
        <div onClick={() => setTheme(!isDark ? 'dark' : 'light')}>
          {theme == 'light' ? <Moon /> : <Sun />}
        </div>
      );

    default:
      return (
        <Switch
          checked={isDark}
          onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
        />
      );
  }
}
