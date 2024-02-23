import { StoreFiltersProvider } from "context/storeFilters/StoreFiltersProvider";
import AuthProvider from "context/user/AuthProvider";
import MyRouter from "routers";
import { CountryProvider } from "context/country/CountryProvider";
import UTMProvider from "context/utm/UTMProvider";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import DataProvider from "context/data/DataProvider";
import PageHead from "containers/PageMSK/PageHead";
import { useContext } from "react";
import { DataContext } from "context/data/DataContext";

function App() {
  const { appRef } = useContext(DataContext);
  return (
    <div ref={appRef} className="bg-white text-base dark:bg-neutral-900 text-neutral-900 dark:text-neutral-200">
      <PageHead title="Medical & Scientific Knowledge" />
      
      <GoogleReCaptchaProvider reCaptchaKey={import.meta.env.VITE_RECAPTCHA_PK}>
        <DataProvider>
          <UTMProvider>
            <CountryProvider>
              <AuthProvider>
                <StoreFiltersProvider>
                  {/* <TrialProvider> */}
                   <MyRouter />
                 {/*  </TrialProvider> */}
                </StoreFiltersProvider>
              </AuthProvider>
            </CountryProvider>
          </UTMProvider>
        </DataProvider>
      </GoogleReCaptchaProvider>
    </div>
  );
}

export default App;
