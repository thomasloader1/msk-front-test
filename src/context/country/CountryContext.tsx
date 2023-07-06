import React, { createContext, useContext, useReducer } from "react";

// Define la interfaz del estado del país
export interface CountryState {
  country: string;
}

// Define las acciones para el reductor
export type CountryAction = { type: "SET_COUNTRY"; payload: string };

// Crea el contexto del país
const CountryContext = createContext<
  { state: CountryState; dispatch: React.Dispatch<CountryAction> } | undefined
>(undefined);

export { CountryContext };
