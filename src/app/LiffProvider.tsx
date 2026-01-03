'use client';

import { useEffect, useState } from 'react';
import type { Liff } from '@line/liff';
import { createContext, useContext } from 'react';

const LiffContext = createContext<{
  liff: Liff | null;
  error: string | null;
}>({ liff: null, error: null });

export function LiffProvider({ children }: { children: React.ReactNode }) {
  const [liff, setLiff] = useState<Liff | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Execute liff.init() when the app is initialized
  useEffect(() => {
    // to avoid `window is not defined` error
    import('@line/liff')
      .then((m) => m.default)
      .then((liff) => {
        liff
          .init({ liffId: process.env.NEXT_PUBLIC_LIFF_ID! })
          .then(() => setLiff(liff))
          .catch((e) => setError(e.toString()));
      });
  }, []);

  // Provide `liff` object and `liffError` object
  // to page component as property
  return <LiffContext.Provider value={{ liff, error }}>{children}</LiffContext.Provider>;
}

export const useLiff = () => useContext(LiffContext);
