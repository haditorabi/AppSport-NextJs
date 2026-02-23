'use client';

import { useEffect } from 'react';
import { useAuthStore } from '@/lib/stores/useAuthStore';
import { subscribeToAuthChanges } from '@/lib/firebase/auth';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { setUser, setInitialized } = useAuthStore();

  useEffect(() => {
    const unsubscribe = subscribeToAuthChanges((user) => {
      setUser(user);
      setInitialized(true);
    });

    return () => unsubscribe();
  }, [setUser, setInitialized]);

  return <>{children}</>;
}
