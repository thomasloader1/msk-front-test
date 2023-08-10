import { StoreFiltersProvider } from "context/storeFilters/StoreFiltersProvider";
import AuthProvider from "context/user/AuthProvider";
import React, { useEffect } from "react";
import MyRouter from "routers";
import { CountryProvider } from "context/country/CountryProvider";
import queryString from "query-string";
import UTMProvider from "context/utm/UTMProvider";
import { deleteCookie, getCookie, setCookie } from "utils/cookies";

function App() {
  const queryParams = queryString.parse(window.location.search);
  const utmValues = {
    utm_source: queryParams.utm_source?.toString() || "",
    utm_medium: queryParams.utm_medium?.toString() || "",
    utm_campaign: queryParams.utm_campaign?.toString() || "",
    utm_content: queryParams.utm_content?.toString() || "",
  };

  useEffect(() => {
    const { VITE_OM_WP_API } = import.meta.env;

    const fetchData = async () => {
      const request = await fetch(`${VITE_OM_WP_API}/categories`);
      const data = await request.json();
      // console.log({ data });
    };

    fetchData();
  }, []);

  return (
    <div className="bg-white text-base dark:bg-neutral-900 text-neutral-900 dark:text-neutral-200">
      <UTMProvider values={utmValues}>
        <CountryProvider>
          <AuthProvider>
            <StoreFiltersProvider>
              <MyRouter />
            </StoreFiltersProvider>
          </AuthProvider>
        </CountryProvider>
      </UTMProvider>
    </div>
  );
}

export default App;
