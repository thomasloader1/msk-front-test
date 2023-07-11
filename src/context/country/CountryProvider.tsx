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
        console.log('fetching country from IP');
        const res = await axios.get("https://api.ipify.org/?format=json");
        const { data } = await axios.get(
          `http://ip-api.com/json/${res.data.ip}`
        );
        const currentCountry = data.countryCode.toLowerCase();
        localStorage.setItem("country", currentCountry);
        //Todo: if I get a valid country visitor, if I'm not on that country already, redirect there if he's not on the right country
        //if it's an invalid country, redirect to the default country
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
