'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Switch } from '@/components/ui/switch';

export default function ThemeSwitch() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  // Wait until after mount to avoid hydration mismatch
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  const isDark = resolvedTheme === 'dark';

  return (
    <Switch
      checked={isDark}
      onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
    />
  );
}
