import React, { ReactNode } from "react";
import UTMContext, { UTMContextType } from "./UTMContext";
import { deleteCookie, getCookie, setCookie } from "utils/cookies";

interface UTMProviderProps {
  children: ReactNode;
  values: UTMContextType;
}

const UTMProvider: React.FC<UTMProviderProps> = ({ children, values }) => {
  const sourceCookie = getCookie("utm_source");
  const mediumCookie = getCookie("utm_medium");
  const campaignCookie = getCookie("utm_campaign");
  const contentCookie = getCookie("utm_content");

  if (!values.utm_source && sourceCookie) {
    values.utm_source = sourceCookie;
  }
  if (!values.utm_medium && mediumCookie) {
    values.utm_medium = mediumCookie;
  }
  if (!values.utm_campaign && campaignCookie) {
    values.utm_campaign = campaignCookie;
  }
  if (!values.utm_content && contentCookie) {
    values.utm_content = contentCookie;
  }
  if (
    values.utm_source &&
    (!sourceCookie || values.utm_source != sourceCookie)
  ) {
    setCookie("utm_source", values.utm_source, 7);
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
  return <UTMContext.Provider value={values}>{children}</UTMContext.Provider>;
};

export default UTMProvider;
