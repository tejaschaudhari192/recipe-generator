'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

interface SplashScreenProps {
  isLoading?: boolean;
}

export default function SplashScreen({ isLoading }: SplashScreenProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isLoading === false) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev < 100) return prev + 1;
        clearInterval(interval);
        return prev;
      });
    }, 20);

    return () => clearInterval(interval);
  }, [isLoading]);

  if (isLoading === true || isLoading === undefined) {
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center bg-white z-50">
        <div className="text-center">
          <Image
            src="/anime/logo-t.png"
            alt="App Logo"
            width={200}
            height={200}
            priority
          />
        </div>
        <div className="w-1/2 mt-6">
          <div className="h-2 bg-gray-200 rounded-full">
            <div
              className="h-2 bg-blue-500 rounded-full"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </div>
    );
  }

  if (isLoading === false) {
    return null;
  }

  return null;
}
