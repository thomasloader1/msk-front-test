const API_URL = "https://wp.msklatam.com/wp-json/wp/api";
const API_BACKEND_URL = "https://msklatam.com/msk-laravel/public/api";

export const ALL_PRODUCTS_MX = `${API_URL}/products?limit=-1&country=mx&type=course`
export const BEST_SELLERS_MX = `${API_URL}/home/best-sellers?country=mx`

export { API_URL, API_BACKEND_URL };
