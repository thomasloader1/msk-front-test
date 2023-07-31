const { VITE_MSK_WP_API, VITE_PUBLIC_URL, PROD } = import.meta.env;
const API_URL = VITE_MSK_WP_API;
const API_BACKEND_LARAVEL = PROD
  ? `${VITE_PUBLIC_URL}/msk-laravel/public/api`
  : "https://dev.msklatam.com/msk-laravel/public/api";
const API_BACKEND_URL = API_BACKEND_LARAVEL;
const IP_API = `${API_BACKEND_LARAVEL}/getCountryByIP`;
const COUNTRY = localStorage.getItem("country") || "mx";
export const ALL_PRODUCTS_MX = `${API_URL}/products?limit=-1&country=${COUNTRY}&type=course`;
export const BEST_SELLERS_MX = `${API_URL}/home/best-sellers?country=${COUNTRY}`;

export { API_URL, API_BACKEND_URL, IP_API };
