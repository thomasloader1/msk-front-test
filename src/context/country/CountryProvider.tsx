import React, { useEffect, useReducer, useState } from "react";
import { CountryContext } from "./CountryContext";
import { countryReducer } from "./CountryReducer";
import { CountryState } from "data/types";
import api from "Services/api";
import { countries } from "data/countries";

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
        console.log("Country Provider");
        let currentCountry = "";
        let validCountries = countries.map((item) => item.id);
        if (bypassRedirect == "1") {
          console.log("bypassRedirect");
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
          console.log("Fetch Country from IP");
          currentCountry = await api.getCountryCode();
          console.log("CurrentCountry: " + currentCountry);
        }
        const currentPathName = window.location.pathname.replace("/", "");
        if (currentCountry && currentCountry == currentPathName) return;
        console.log("currentCountry2: " + currentCountry);
        localStorage.setItem("country", currentCountry);
        if (!validCountries.includes(currentCountry)) {
          currentCountry = "";
        }

        console.log(state.country, currentCountry);
        if (
          state.country != currentCountry ||
          getCountryFromURL() != currentCountry
        ) {
          let redirectUrl = "/" + currentCountry + window.location.pathname;
          if (getCountryFromURL() != "") {
            redirectUrl = window.location.href.replace(
              "/" + getCountryFromURL() + "/",
              "/" + currentCountry + "/"
            );
          }
          window.location.href = redirectUrl;
          console.log("redirectUrl: " + redirectUrl);
        }

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

    const getCountryFromURL = () => {
      const url = window.location.href;
      switch (true) {
        // case url.includes("/es/"):
        //   return "es";
        case url.includes("/cl/"):
          return "cl";
        case url.includes("/ar/"):
          return "ar";
        case url.includes("/ec/"):
          return "ec";
        case url.includes("/mx/"):
          return "mx";
        // Add more cases for other substrings
        default:
          return "";
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
