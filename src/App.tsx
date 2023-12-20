import { StoreFiltersProvider } from "context/storeFilters/StoreFiltersProvider";
import AuthProvider from "context/user/AuthProvider";
import { Helmet } from 'react-helmet';
import MyRouter from "routers";
import { CountryProvider } from "context/country/CountryProvider";
import UTMProvider from "context/utm/UTMProvider";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

function App() {
  const isDevEnvironment = window.location.hostname === 'dev.msklatam.com';
  return (
    <div className="bg-white text-base dark:bg-neutral-900 text-neutral-900 dark:text-neutral-200">
       <Helmet>
        {isDevEnvironment && <meta name="robots" content="noindex, follow" />}
      </Helmet>
      <GoogleReCaptchaProvider reCaptchaKey={import.meta.env.VITE_RECAPTCHA_PK}>
        <UTMProvider>
          <CountryProvider>
            <AuthProvider>
              <StoreFiltersProvider>
                <MyRouter />
              </StoreFiltersProvider>
            </AuthProvider>
          </CountryProvider>
        </UTMProvider>
      </GoogleReCaptchaProvider>
    </div>
  );
}

export default App;
