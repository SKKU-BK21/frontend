"use client";

import { useState, type PropsWithChildren, useEffect, useContext, createContext } from "react";

const isMockingMode = process.env.NODE_ENV === "development";

interface MSWContextType {
  mswReady: boolean;
}

const MSWContext = createContext<MSWContextType | undefined>(undefined);

export const MSWProvider = ({ children }: PropsWithChildren) => {
  const [mswReady, setMSWReady] = useState(() => !isMockingMode);

  useEffect(() => {
    const init = async () => {
      if (isMockingMode) {
        const initMocks = await import("./index").then((res) => res.initMocks);
        await initMocks();
        setMSWReady(true);
      }
    };

    if (!mswReady) {
      init();
    }
  }, [mswReady]);

  if (!mswReady) {
    return null;
  }

  return <MSWContext.Provider value={{ mswReady }}>{children}</MSWContext.Provider>;
};

export function useMSW() {
  const context = useContext(MSWContext);
  if (context === undefined) {
    throw new Error("useMSW must be used within a MSWProvider");
  }
  return context;
}
