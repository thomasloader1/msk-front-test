import { Switch, Route, BrowserRouter } from "react-router-dom";
import { Page } from "./types";
import ScrollToTop from "./ScrollToTop";
import Page404 from "containers/Page404/Page404";
import PageProfile from "containers/PageMSK/PageProfile";
import PageAccount from "containers/PageMSK/PageAccount";
import PageLogin from "containers/PageMSK/PageLogin";
import PageSignUp from "containers/PageMSK/PageSignUp";
import PageForgotPass from "containers/PageMSK/PageForgotPass";
import HeaderContainer from "containers/HeaderContainer/HeaderContainer";
import MediaRunningContainer from "containers/MediaRunningContainer/MediaRunningContainer";
import PageHome from "containers/PageMSK/PageHome";
import FooterEduman from "components/Footer/FooterMSK";
import PageStore from "containers/PageMSK/PageStore";
import PageSingleProduct from "containers/PageSingleProduct/PageSingleProduct";
import PageMission from "containers/PageMSK/PageMission";
import PageBlog from "containers/PageMSK/PageBlog";
import PageThankYou from "containers/PageMSK/PageThankYou";
import PageNota from "containers/PageMSK/PageNota";
import { CountryContext } from "context/country/CountryContext";
import { useContext, useEffect, useState } from "react";
import countryReducer from "context/country/CountryReducer";
import { AuthContext } from "context/user/AuthContext";
import axios from "axios";

export const pages: Page[] = [
  { path: "/", exact: true, component: PageHome, auth: false },
  { path: "/#", exact: true, component: PageHome, auth: false },
  { path: "/mision", component: PageMission, auth: false },
  { path: "/tienda", component: PageStore, auth: false },
  { path: "/curso/:slug", component: PageSingleProduct, auth: false },
  { path: "/page404", component: Page404, auth: false },
  { path: "/blog", exact: true, component: PageBlog, auth: false },
  { path: "/blog/:slug", component: PageNota, auth: false },
  { path: "/iniciar-sesion", component: PageLogin, auth: false },
  { path: "/crear-cuenta", component: PageSignUp, auth: false },
  { path: "/recuperar", component: PageForgotPass, auth: false },
  { path: "/mi-cuenta", component: PageAccount, auth: true },
  { path: "/mi-perfil", component: PageProfile, auth: true },
  { path: "/gracias", component: PageThankYou, auth: false },
  { path: "/politicas-de-privacidad", component: PageMission, auth: false },
];

const Routes = () => {
  const [country, setCountry] = useState(localStorage.getItem("country") || "");
  const authContext = useContext(AuthContext);
  const { isAuthenticated } = authContext.state;
  const authenticatedRoutes = pages.filter((page) => {
    if (page.auth && isAuthenticated) {
      return true;
    }
    if (!page.auth) {
      return true;
    }
    return false;
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("https://api.ipify.org/?format=json");
        const { data } = await axios.get(
          `http://ip-api.com/json/${res.data.ip}`
        );
        const currentCountry = data.countryCode.toLowerCase();
        localStorage.setItem("country", currentCountry);
        setCountry(currentCountry);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <BrowserRouter basename={`/${country}`}>
      <MediaRunningContainer />
      <ScrollToTop />
      <HeaderContainer />
      <Switch>
        {authenticatedRoutes.map(({ component, path, exact }) => {
          return (
            <Route
              key={path}
              component={component}
              exact={!!exact}
              path={path}
            />
          );
        })}
        <Route component={Page404} />
      </Switch>
      <FooterEduman />
      {/* <Footer /> */}
      {/* MEDIA */}
    </BrowserRouter>
  );
};

export default Routes;
