import { countries } from "./countries";

const { VITE_MSK_WP_API, VITE_PUBLIC_URL, PROD, VITE_PUBLIC_URL_DEV } =
  import.meta.env;
const API_URL = VITE_MSK_WP_API;
const API_BACKEND_LARAVEL = PROD
  ? `${VITE_PUBLIC_URL}/api`
  : `${VITE_PUBLIC_URL_DEV}/api`;

const baseUrl = PROD ? VITE_PUBLIC_URL : VITE_PUBLIC_URL_DEV;
const API_BACKEND_URL = API_BACKEND_LARAVEL;
const IP_API = `${API_BACKEND_LARAVEL}/getCountryByIP`;
const COUNTRY = localStorage.getItem("country");
let validCountries = countries.map((item) => item.id);
const countryParam = validCountries.includes(COUNTRY || "") ? COUNTRY : "int";
let isProductionEnv = window.location.hostname === "msklatam.com";
const filterProductsParam = isProductionEnv ? "" : "&filter=all";
export const ALL_PRODUCTS_MX = `${API_URL}/products?limit=-1&country=${countryParam}&type=course${filterProductsParam}`;
export const BEST_SELLERS_MX = `${API_URL}/home/best-sellers?country=${countryParam}`;
export const NOTE_SPECIALITIES = `${VITE_MSK_WP_API}/posts-specialities`;

export { baseUrl, API_URL, API_BACKEND_URL, IP_API };
