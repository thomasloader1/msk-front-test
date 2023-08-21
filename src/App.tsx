import { StoreFiltersProvider } from "context/storeFilters/StoreFiltersProvider";
import AuthProvider from "context/user/AuthProvider";
import React, { useContext, useEffect } from "react";
import MyRouter from "routers";
import { CountryProvider } from "context/country/CountryProvider";
import queryString from "query-string";
import UTMProvider from "context/utm/UTMProvider";

function App() {
  useEffect(() => {
    const { VITE_OM_WP_API } = import.meta.env;
    const fetchData = async () => {
      const request = await fetch(`${VITE_OM_WP_API}/categories`);
      const data = await request.json();
    };

    fetchData();
  }, []);

  return (
    <div className="bg-white text-base dark:bg-neutral-900 text-neutral-900 dark:text-neutral-200">
      <UTMProvider>
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
