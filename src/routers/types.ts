import { ComponentType } from "react";

export interface LocationStates {
  "/"?: {};
  "/home"?: {};
  "/contacto"?: {};
  "/blog"?: {};
  "/blog/:slug"?: {};
  "/archivo"?: {};
  "/nota"?: {};
  "/nota/:slug"?: {};
  "/mision"?: {};
  "/#/custom-home"?: {};
  "/#"?: {};
  "/archive/:slug"?: {};
  "/archive-video/:slug"?: {};
  "/archive-audio/:slug"?: {};
  //
  "/home-header-style1"?: {};
  "/home-header-style2"?: {};
  "/home-header-style2-logedin"?: {};
  //
  "/mi-perfil"?: {};
  "/mi-cuenta"?: {};
  "/gracias"?: {};
  "/politica-de-privacidad"?: {};
  "/terminos-y-condiciones"?: {};
  "/politica-de-cookies"?: {};
  "/condiciones-de-contratacion"?: {};
  "/author/:slug"?: {};
  "/author-v2/:slug"?: {};
  //
  "/single/:slug"?: {};
  "/single-template-2/:slug"?: {};
  "/single-template-3/:slug"?: {};
  "/single-sidebar/:slug"?: {};
  "/single-2-sidebar/:slug"?: {};
  "/single-3-sidebar/:slug"?: {};
  "/single-4-sidebar/:slug"?: {};
  "/single-gallery/:slug"?: {};
  "/single-audio/:slug"?: {};
  "/single-video/:slug"?: {};
  //
  "/search"?: {};
  "/search-v2"?: {};
  "/about"?: {};
  "/contact"?: {};
  "/iniciar-sesion"?: {};
  "/crear-cuenta"?: {};
  "/recuperar"?: {};
  "/change-pass/:token"?: {};
  "/correo-enviado"?: {};
  "/page404"?: {};
  "/dashboard"?: {};
  "/subscription"?: {};
  "/tienda"?: {};
  "/store"?: {};
  "/curso/:slug"?: {};
  //
  "/theme-cyan-blueGrey"?: {};
  "/theme-blue-blueGrey"?: {};
  "/theme-purple-blueGrey"?: {};
  "/theme-teal-blueGrey"?: {};
  "/theme-blueGrey-blueGrey"?: {};
  "/theme-red-warmGrey"?: {};
  "/theme-cyan-warmGrey"?: {};
  "/theme-blue-coolGrey"?: {};
  "/theme-lightBlue-coolGrey"?: {};
  "/theme-pink-coolGrey"?: {};
  "/theme-green-grey"?: {};
  "/theme-yellow-grey"?: {};
  "/theme-orange-grey"?: {};
  "/theme-fuchsia-blueGrey"?: {};
  //
  "/home-demo-1"?: {};
  "/home-demo-2"?: {};
  "/home-demo-3"?: {};
  "/home-demo-4"?: {};
  "/home-demo-5"?: {};
  "/home-demo-6"?: {};
  "/home-demo-7"?: {};
}

export type PathName = keyof LocationStates;

export interface Page {
  path: PathName;
  exact?: boolean;
  auth?: boolean;
  component: ComponentType<Object>;
}
