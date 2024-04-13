"use client";
import React, { useEffect, useReducer, useState } from "react";
import { CountryContext } from "./CountryContext";
import { countryReducer } from "./CountryReducer";
import { CountryState } from "@/data/types";
import { countries } from "@/data/countries";
import api from "../../../Services/api";
import { parse } from "cookie";

interface Props {
  children: React.ReactNode;
}

export const CountryProvider: React.FC<Props> = ({ children }) => {
  const initialState: CountryState = {
    country:
      typeof window !== "undefined"
        ? localStorage.getItem("country") || ""
        : "",
  };

  const [state, dispatch] = useReducer(countryReducer, initialState);
  const [bypassRedirect, setBypassRedirect] = useState(
    typeof window !== "undefined"
      ? localStorage.getItem("bypassRedirect") || ""
      : ""
  );

  const validCountries = countries.map((item) => item.id);

  useEffect(() => {
    console.log("Country Provider UseEffect 2");
    const fetchData = async () => {
      let redirectUrl = "";
      try {
        let currentCountry = "";
        if (bypassRedirect == "1") {
          console.log("bypassRedirect");
          const currentUrl = window.location.pathname;
          const validCountryUrl = validCountries.filter(
            (country) =>
              currentUrl.includes("/" + country + "/") ||
              currentUrl.endsWith("/" + country)
          );

          if (validCountryUrl.length) {
            console.log('its on a valid country');
            dispatch({
              type: "SET_COUNTRY",
              payload: { country: validCountryUrl[0] },
            });
          }
          // console.log("Country Provider", currentCountry);
        } else {
          currentCountry = await api.getCountryCode();
          // console.log("CurrentCountry obtained from IP: " + currentCountry);
          // console.log(window.location.pathname);
          const currentPathName = window.location.pathname.replace("/", "");

          // console.log(currentPathName);
          if (currentCountry && currentCountry == currentPathName) return; //Special use case for homepage.
          if (!validCountries.includes(currentCountry)) {
            currentCountry = "";
          }
          if (typeof window !== "undefined") {
            localStorage.setItem("country", currentCountry);
          }

          // console.log("stateCountry: " + state.country);
          // console.log("currentCountry: " + currentCountry);

          if (
            state.country != currentCountry ||
            getCountryFromURL() != currentCountry
          ) {
            if (
              validCountries.includes(currentPathName) &&
              currentPathName != currentCountry
            ) {
              redirectUrl = "/" + currentCountry;
            } else {
              redirectUrl = "/" + currentCountry + window.location.pathname;
            }
            // console.log("redirectUrl1: " + redirectUrl);
            if (getCountryFromURL() != "") {
              redirectUrl = window.location.href
                .replace(
                  "/" + getCountryFromURL() + "/",
                  "/" + currentCountry + "/"
                )
                .replace(/(https?:\/\/.*?)\/+/g, "$1/");
            }
            // console.log("redirectUrl2: " + redirectUrl);
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
        // console.log(error);
      }
    };

    const getCountryFromURL = () => {
      const url = window.location.href;
      let validCountryUrl = validCountries.filter(
        (country) =>
          url.includes("/" + country + "/") ||
          url.endsWith("/" + country)
      );
      console.log(validCountryUrl);
      if (validCountryUrl.length) {
        return validCountryUrl[0];
      }
      return "";
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
