import { createContext, useContext, useState } from "react";

interface ATHOSDynamicTableContextType {
  selectedData: any[] | null;
  setSelectedData: (data: any) => void;
}

export const ATHOSDynamicTableContext = createContext<ATHOSDynamicTableContextType | null>(null);

export const ATHOSDynamicTableProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedData, setSelectedData] = useState<any[] | null>(null);

  return <ATHOSDynamicTableContext.Provider value={{ selectedData, setSelectedData }}>{children}</ATHOSDynamicTableContext.Provider>;
};

export function useATHOSDynamicTableContext<T>() {
  const context = useContext(ATHOSDynamicTableContext);
  if (!context) {
    throw new Error("useATHOSDynamicTableContext must be used within a ATHOSDynamicTableProvider");
  }

  return { selectedData: context.selectedData as T[] };
}
