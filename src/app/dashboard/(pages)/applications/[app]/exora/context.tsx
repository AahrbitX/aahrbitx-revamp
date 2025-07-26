"use client";

import React, { createContext, useContext } from "react";
import { useParams } from "next/navigation";

type AppContextType = {
  app: string;
};

const ExoraContext = createContext<AppContextType | undefined>(undefined);

export const useExoraContext = () => {
  const context = useContext(ExoraContext);
  if (!context)
    throw new Error("useExoraContext must be used within ExoraProvider");
  return context;
};

export function ExoraProvider({ children }: { children: React.ReactNode }) {
  const { app } = useParams<{ app: string }>();

  return (
    <ExoraContext.Provider value={{ app }}>{children}</ExoraContext.Provider>
  );
}
