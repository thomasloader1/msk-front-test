import React, { useEffect, useReducer, useState } from "react";
import { CountryContext } from "./CountryContext";
import { countryReducer } from "./CountryReducer";
import { CountryState } from "data/types";
import api from "Services/api";
import { countries } from "data/countries";
import { getCountryFromURL } from "lib/getContryFromURL";

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
      let redirectUrl = "";
      const currentLocationUrl = window.location.href;
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
          currentCountry = await api.getCountryCode();
          console.log("CurrentCountry obtained from IP: " + currentCountry);
          console.log(window.location.pathname);
          const currentPathName = window.location.pathname.replace("/", "");

          console.log(currentPathName);
          if (currentCountry && currentCountry == currentPathName) return; //Special use case for homepage.
          if (!validCountries.includes(currentCountry)) {
            currentCountry = "";
          }

          localStorage.setItem("country", currentCountry);

          console.log("stateCountry: " + state.country);
          console.log("currentCountry: " + currentCountry);

          if (
            state.country != currentCountry ||
            getCountryFromURL(currentLocationUrl) != currentCountry
          ) {
            if (
              validCountries.includes(currentPathName) &&
              currentPathName != currentCountry
            ) {
              redirectUrl = "/" + currentCountry;
            } else {
              redirectUrl = "/" + currentCountry + window.location.pathname;
            }
            console.log("redirectUrl1: " + redirectUrl);
            if (getCountryFromURL(currentLocationUrl) != "") {
              redirectUrl = window.location.href
                .replace(
                  "/" + getCountryFromURL(currentLocationUrl) + "/",
                  "/" + currentCountry + "/"
                )
                .replace(/(https?:\/\/.*?)\/+/g, "$1/");
            }
            console.log("redirectUrl2: " + redirectUrl);
          }
          if (
            window.location.protocol === "http:" &&
            window.location.hostname !== "localhost"
          ) {
            window.location.href =
              "https:" +
              window.location.href.substring(window.location.protocol.length);
          }

          dispatch({
            type: "SET_COUNTRY",
            payload: { country: currentCountry },
          });
          if (redirectUrl) {
            window.location.href = redirectUrl;
          }
        }
      } catch (error) {
        console.error(error);
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
