'use client'; // This directive marks the file as a client-side component

import { useEffect, useState } from 'react';
import { connectStatus } from '@/lib/api';
import { toast } from 'sonner';
import SplashScreen from '@/components/loaders/splash-screen';

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [connected, setConnected] = useState<boolean | null>(null);

  useEffect(() => {
    const checkConnection = async () => {
      const isConnected = await connectStatus();
      if (isConnected) {
        toast('Connected');
      }
      setConnected(isConnected);
    };

    checkConnection();
  }, []);

  if (connected === null) {
    return <SplashScreen />;
  }

  return <div>{children}</div>;
}
