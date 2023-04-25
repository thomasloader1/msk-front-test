import React from "react";
import { Switch, Route, HashRouter, BrowserRouter } from "react-router-dom";
import { Page } from "./types";
import ScrollToTop from "./ScrollToTop";
import Footer from "components/Footer/Footer";
import Page404 from "containers/Page404/Page404";
import PageArchive from "containers/PageArchive/PageArchive";
import PageAuthor from "containers/PageAuthor/PageAuthor";
import PageProfile from "containers/PageMSK/PageProfile";
import PageAccount from "containers/PageMSK/PageAccount";
import PageSearch from "containers/PageSearch/PageSearch";
import PageSingle from "containers/PageSingle/PageSingle";
import PageSingleHasSidebar from "containers/PageSingle/PageSingleHasSidebar";
import PageSingleTemplate2 from "containers/PageSingle/PageSingleTemp2";
import PageSingleTemp2Sidebar from "containers/PageSingle/PageSingleTemp2Sidebar";
import PageSingleTemplate3 from "containers/PageSingle/PageSingleTemp3";
import PageSingleTemp3Sidebar from "containers/PageSingle/PageSingleTemp3Sidebar";
import PageAbout from "containers/PageAbout/PageAbout";
import PageContact from "containers/PageContact/PageContact";
import PageLogin from "containers/PageMSK/PageLogin";
import PageSignUp from "containers/PageMSK/PageSignUp";
import PageForgotPass from "containers/PageMSK/PageForgotPass";
import PageDashboard from "containers/PageDashboard/PageDashboard";
import PageSubcription from "containers/PageSubcription/PageSubcription";
import HeaderContainer from "containers/HeaderContainer/HeaderContainer";
import PageHomeDemo2 from "containers/PageHome/PageHomeDemo2";
import PageHomeDemo3 from "containers/PageHome/PageHomeDemo3";
import PageAuthorV2 from "containers/PageAuthor/PageAuthorV2";
import PageHomeDemo4 from "containers/PageHome/PageHomeDemo4";
import PageSearchV2 from "containers/PageSearch/PageSearchV2";
import PageSingleGallery from "containers/PageSingleGallery/PageSingleGallery";
import PageSingleAudio from "containers/PageSingleAudio/PageSingleAudio";
import PageSingleVideo from "containers/PageSingleVideo/PageSingleVideo";
import PageArchiveVideo from "containers/PageArchive/PageArchiveVideo";
import PageArchiveAudio from "containers/PageArchive/PageArchiveAudio";
import PageHomeDemo5 from "containers/PageHome/PageHomeDemo5";
import PageHomeDemo6 from "containers/PageHome/PageHomeDemo6";
import PageHomeDemo7 from "containers/PageHome/PageHomeDemo7";
import PageSingleTemp4Sidebar from "containers/PageSingle/PageSingleTemp4Sidebar";
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

  { path: "/search", component: PageSearch },
  { path: "/about", component: PageAbout },
  { path: "/contact", component: PageContact },
  { path: "/page404", component: Page404 },
  { path: "/login", component: PageLogin },
  { path: "/signup", component: PageSignUp },
  { path: "/forgot-pass", component: PageForgotPass },
  { path: "/mi-cuenta", component: PageAccount },
  { path: "/mi-perfil", component: PageProfile },
  { path: "/store", component: PageStore },
  { path: "/curso/:slug", component: PageSingleProduct },
];

const Routes = () => {
  return (
    <BrowserRouter basename={"/"}>
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
    </BrowserRouter>
  );
};

export default Routes;
