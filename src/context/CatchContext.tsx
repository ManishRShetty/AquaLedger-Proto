"use client";

import { createContext, useState, ReactNode, FC } from "react";
import type { CatchResult } from "@/types";

interface CatchContextType {
  catches: CatchResult[];
  addCatch: (newCatch: CatchResult) => void;
  getCatchById: (id: string) => CatchResult | undefined;
}

export const CatchContext = createContext<CatchContextType | undefined>(undefined);

interface CatchProviderProps {
  children: ReactNode;
}

export const CatchProvider: FC<CatchProviderProps> = ({ children }) => {
  const [catches, setCatches] = useState<CatchResult[]>([]);

  const addCatch = (newCatch: CatchResult) => {
    setCatches((prevCatches) => [newCatch, ...prevCatches]);
  };

  const getCatchById = (id: string): CatchResult | undefined => {
    return catches.find((c) => c.id === id);
  };
  
  return (
    <CatchContext.Provider value={{ catches, addCatch, getCatchById }}>
      {children}
    </CatchContext.Provider>
  );
};
