import React, { useEffect, useReducer, useState } from "react";
import { CountryContext } from "./CountryContext";
import { countryReducer } from "./CountryReducer";
import { CountryState } from "data/types";
import axios from "axios";
import { IP_API } from "data/api";

interface Props {
  children: React.ReactNode;
}

export const CountryProvider: React.FC<Props> = ({ children }) => {
  const initialState: CountryState = {
    country: localStorage.getItem("country") || "",
  };

  const [state, dispatch] = useReducer(countryReducer, initialState);
  const [bypassRedirect, setBypassRedirect] = useState(
    localStorage.getItem("bypassRedirect")
  );
  useEffect(() => {
    const fetchData = async () => {
      try {
        let currentCountry = "";
        let validCountries = ["mx", "cl", "ar", "ec"];
        if (bypassRedirect == "1") {
          const currentUrl = window.location.pathname;
          const validCountryUrl = validCountries.filter(
            (country) =>
              currentUrl.includes("/" + country + "/") ||
              currentUrl.includes("/" + country)
          );
          if (validCountryUrl.length) {
            currentCountry = validCountryUrl[0];
          }
        } else {
          const ip = await axios.get("https://api.ipify.org/?format=json");
          const { data } = await axios.post(
            `https://pro.ip-api.com/json/?fields=61439&key=OE5hxPrfwddjYYP`
          );
          // const { data } = await axios.post(`${IP_API}?ip=${ip.data.ip}`);
          currentCountry = data.countryCode.toLowerCase();
        }
        localStorage.setItem("country", currentCountry);
        if (!validCountries.includes(currentCountry)) {
          currentCountry = "";
        }

        if (state.country != currentCountry) {
          const urlParams = window.location.href.split("/");
          window.location.href = `/${currentCountry}/${
            urlParams[urlParams.length - 1]
          }`;
        }

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
