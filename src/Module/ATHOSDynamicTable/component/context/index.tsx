import { createContext, useContext, useState } from "react";

interface ATHOSDynamicTableContextType {
  selectedData: any;
  setSelectedData: (data: any) => void;
}

const ATHOSDynamicTableContext = createContext<ATHOSDynamicTableContextType | null>(null);

export const ATHOSDynamicTableProvider = ({ children }) => {
  const [selectedData, setSelectedData] = useState<null | any>(null);

  return <ATHOSDynamicTableContext.Provider value={{ selectedData, setSelectedData }}>{children}</ATHOSDynamicTableContext.Provider>;
};

export const useATHOSDynamicTableContext = () => {
  const context = useContext(ATHOSDynamicTableContext);

  return context;
};
