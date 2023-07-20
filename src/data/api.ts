const { VITE_MSK_WP_API, VITE_PUBLIC_URL, PROD, VITE_IP_API_KEY } = import.meta
  .env;
const API_URL = VITE_MSK_WP_API;
const API_BACKEND_LARAVEL = PROD
  ? `${VITE_PUBLIC_URL}/msk-laravel/public/api`
  : "http://localhost:8000/api";
const API_BACKEND_URL = API_BACKEND_LARAVEL;
const IP_API = `https://pro.ip-api.com/json/?fields=61439&key=${VITE_IP_API_KEY}`;
const COUNTRY = localStorage.getItem("country") || "mx";
export const ALL_PRODUCTS_MX = `${API_URL}/products?limit=-1&country=${COUNTRY}&type=course`;
export const BEST_SELLERS_MX = `${API_URL}/home/best-sellers?country=${COUNTRY}`;

export { API_URL, API_BACKEND_URL, IP_API };
