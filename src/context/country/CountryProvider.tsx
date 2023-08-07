import React, { useEffect, useReducer, useState } from "react";
import { CountryContext } from "./CountryContext";
import { countryReducer } from "./CountryReducer";
import { CountryState } from "data/types";
import api from "Services/api";

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
        console.log('Country Provider');
        let currentCountry = "";
        let validCountries = ["mx", "cl", "ar", "ec"];
        if (bypassRedirect == "1") {
          console.log('bypassRedirect');
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
          console.log('Fetch Country from IP');
          currentCountry = await api.getCountryCode();
          console.log('CurrentCountry: ' + currentCountry);
        }
        console.log("currentCountry2: " + currentCountry);
        localStorage.setItem("country", currentCountry);
        if (!validCountries.includes(currentCountry)) {
          currentCountry = "";
        }

        console.log(state.country, currentCountry);
        const urlParams = window.location.href.split("/");
        if (state.country != currentCountry) {
          window.location.href = `/${currentCountry}/${
            urlParams[urlParams.length - 1]
          }`;
        } else {
          //Todo: this is a patch for when the state and currentCountry match, but we are not showing the country website
          console.log("urlParams[3]: " + urlParams[3]); //country from URL
          if (urlParams[3] != currentCountry) {
            window.location.href = `/${currentCountry}/${
              urlParams[urlParams.length - 1]
            }`;
          }
        }

        //Redirect to HTTPS only on non dev environment
        if (
          window.location.protocol === "http:" &&
          window.location.hostname !== "localhost"
        ) {
          window.location.href =
            "https:" +
            window.location.href.substring(window.location.protocol.length);
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
