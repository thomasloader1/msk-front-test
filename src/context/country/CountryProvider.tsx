import React, { useEffect, useReducer } from "react";
import { CountryContext } from "./CountryContext";
import { countryReducer } from "./CountryReducer";
import { CountryState } from "data/types";
import axios from "axios";

interface Props {
  children: React.ReactNode;
}

export const CountryProvider: React.FC<Props> = ({ children }) => {
  const initialState: CountryState = {
    country: localStorage.getItem("country") || "",
  };

  const [state, dispatch] = useReducer(countryReducer, initialState);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("https://api.ipify.org/?format=json");
        const { data } = await axios.get(
          `http://ip-api.com/json/${res.data.ip}`
        );
        const currentCountry = data.countryCode.toLowerCase();
        localStorage.setItem("country", currentCountry);
        dispatch({ type: "SET_COUNTRY", payload: { country: currentCountry } });
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <CountryContext.Provider value={{ state, dispatch }}>
      {children}
    </CountryContext.Provider>
  );
};

export default CountryProvider;
