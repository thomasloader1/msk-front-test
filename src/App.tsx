import { StoreFiltersProvider } from "context/storeFilters/StoreFiltersProvider";
import AuthProvider from "context/user/AuthProvider";
import MyRouter from "routers";
import { CountryProvider } from "context/country/CountryProvider";
import UTMProvider from "context/utm/UTMProvider";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import DataProvider from "context/data/DataProvider";
import PageHead from "containers/PageMSK/PageHead";
import { Provider } from "react-redux";
import { store } from "app/store";
function App() {
  return (
    <div className="bg-white text-base dark:bg-neutral-900 text-neutral-900 dark:text-neutral-200">
      <PageHead title="Medical & Scientific Knowledge" />
      <Provider store={store}>
        <GoogleReCaptchaProvider
          reCaptchaKey={import.meta.env.VITE_RECAPTCHA_PK}
        >
          <DataProvider>
            <UTMProvider>
              <CountryProvider>
                <AuthProvider>
                  <StoreFiltersProvider>
                    <MyRouter />
                  </StoreFiltersProvider>
                </AuthProvider>
              </CountryProvider>
            </UTMProvider>
          </DataProvider>
        </GoogleReCaptchaProvider>
      </Provider>
    </div>
  );
}

export default App;
