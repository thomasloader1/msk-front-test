const {VITE_MSK_WP_API, VITE_PUBLIC_URL} = import.meta.env

const API_URL = VITE_MSK_WP_API;
const API_BACKEND_URL = `${VITE_PUBLIC_URL}/msk-laravel/public/api`;

export const ALL_PRODUCTS_MX = `${API_URL}/products?limit=-1&country=mx&type=course`
export const BEST_SELLERS_MX = `${API_URL}/home/best-sellers?country=mx`

export { API_URL, API_BACKEND_URL };
