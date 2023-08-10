import { createContext, useContext } from "react";

export interface UTMContextType {
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_content: string;
}

const UTMContext = createContext<UTMContextType | undefined>(undefined);

export const useUTMContext = () => {
  const context = useContext(UTMContext);
  if (!context) {
    throw new Error("useUTMContext must be used within a UTMProvider");
  }
  return context;
};

export default UTMContext;
