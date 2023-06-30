import React, { useEffect, useReducer } from "react";
import { CountryContext, CountryState } from "./CountryContext";
import countryReducer from "./CountryReducer";

// Define el proveedor del contexto del país
interface Props {
  children: React.ReactNode;
}
export const CountryProvider: React.FC<Props> = ({ children }) => {
  const initialState: CountryState = {
    country: "mx", // Valor predeterminado: México (mx)
  };

  const [state, dispatch] = useReducer(countryReducer, initialState);

  return (
    <CountryContext.Provider value={{ state, dispatch }}>
      {children}
    </CountryContext.Provider>
  );
};
