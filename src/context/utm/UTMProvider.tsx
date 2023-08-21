import React, { useEffect, useReducer, useState } from "react";
import { UTMContext } from "./UTMContext";
import { utmInitialState, utmReducer } from "./UTMReducer";
import { getCookie, setCookie } from "utils/cookies";

interface Props {
  children: React.ReactNode;
}

export const UTMProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(utmReducer, utmInitialState);

  useEffect(() => {
    setCookie("utm_source", state.utm_source, 7);
    setCookie("utm_medium", state.utm_medium, 7);
    setCookie("utm_campaign", state.utm_campaign, 7);
    setCookie("utm_content", state.utm_content, 7);
  }, [state]);

  return (
    <UTMContext.Provider value={{ state, dispatch }}>
      {children}
    </UTMContext.Provider>
  );
};

export default UTMProvider;
