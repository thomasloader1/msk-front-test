import React, { ReactNode } from "react";
import UTMContext, { UTMContextType } from "./UTMContext";
import { deleteCookie, getCookie, setCookie } from "utils/cookies";

interface UTMProviderProps {
  children: ReactNode;
  values: UTMContextType;
}

const UTMProvider: React.FC<UTMProviderProps> = ({ children, values }) => {
  const oneWeekInMillis = 7 * 24 * 60 * 60 * 1000;

  const sourceCookie = getCookie("utm_source");
  const mediumCookie = getCookie("utm_medium");
  const campaignCookie = getCookie("utm_campaign");
  const contentCookie = getCookie("utm_content");

  if (
    values.utm_source &&
    (!sourceCookie || values.utm_source != sourceCookie)
  ) {
    setCookie("utm_source", values.utm_source, 7); // 7 días de duración
  }
  if (
    values.utm_medium &&
    (!mediumCookie || values.utm_medium != mediumCookie)
  ) {
    setCookie("utm_medium", values.utm_medium, 7);
  }
  if (
    values.utm_campaign &&
    (!campaignCookie || values.utm_campaign != campaignCookie)
  ) {
    setCookie("utm_campaign", values.utm_campaign, 7);
  }
  if (
    values.utm_content &&
    (!contentCookie || values.utm_content != contentCookie)
  ) {
    setCookie("utm_content", values.utm_content, 7);
  }

  if (sourceCookie && mediumCookie && campaignCookie && contentCookie) {
    setTimeout(() => {
      deleteCookie("utm_source");
      deleteCookie("utm_medium");
      deleteCookie("utm_campaign");
      deleteCookie("utm_content");
    }, oneWeekInMillis);
  }
  return <UTMContext.Provider value={values}>{children}</UTMContext.Provider>;
};

export default UTMProvider;
