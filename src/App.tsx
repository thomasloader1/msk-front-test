import { StoreFiltersProvider } from "context/storeFilters/StoreFiltersProvider";
import AuthProvider from "context/user/AuthProvider";
import React from "react";
import MyRouter from "routers";
import { CountryProvider } from "context/country/CountryProvider";
import UTMProvider from "context/utm/UTMProvider";

function App() {

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
