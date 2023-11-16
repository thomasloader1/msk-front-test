import { createContext, Dispatch } from "react";
import { CountryState, AuthAction } from "data/types";

export const CountryContext = createContext<{
  state: CountryState;
  dispatch: Dispatch<AuthAction>;
}>({
  state: {
    country: "",
    error: "",
  },
  dispatch: () => {},
});
