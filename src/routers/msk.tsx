import { Switch, Route, HashRouter, BrowserRouter } from "react-router-dom";
import { Page } from "./types";
import ScrollToTop from "./ScrollToTop";
import Page404 from "containers/Page404/Page404";
import PageProfile from "containers/PageMSK/PageProfile";
import PageAccount from "containers/PageMSK/PageAccount";
import PageSearch from "containers/PageSearch/PageSearch";
import PageSingleHasSidebar from "containers/PageSingle/PageSingleHasSidebar";
import PageAbout from "containers/PageAbout/PageAbout";
import PageContact from "containers/PageContact/PageContact";
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

export const pages: Page[] = [
  { path: "/", exact: true, component: PageHome },
  { path: "/blog", exact: true, component: PageBlog },
  { path: "/blog/1", component: PageSingleHasSidebar },
  { path: "/#", exact: true, component: PageHome },
  //
  { path: "/mision", component: PageMission },

  { path: "/page404", component: Page404 },
  { path: "/login", component: PageLogin },
  { path: "/signup", component: PageSignUp },
  { path: "/forgot-pass", component: PageForgotPass },
  { path: "/mi-cuenta", component: PageAccount },
  { path: "/mi-perfil", component: PageProfile },
  { path: "/tienda", component: PageStore },
  { path: "/curso/:slug", component: PageSingleProduct },
];

const Routes = () => {
  return (
    <HashRouter basename={"/"}>
      <MediaRunningContainer />

      <ScrollToTop />
      <HeaderContainer />
      <Switch>
        {pages.map(({ component, path, exact }) => {
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
    </HashRouter>
  );
};

export default Routes;
