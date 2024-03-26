import {
  //   ALL_PRODUCTS_MX,
  API_URL,
  //   BEST_SELLERS_MX,
  IP_API,
  NOTE_SPECIALITIES,
  baseUrl,
} from "@/data/api";
// import { Login, ContactUs, SignUp, Newsletter } from "@/data/types";
// import countryStates from "@/data/jsons/__countryStates.json";
// import { BodyNewPassword } from "@/components/MSK/PageNewPassword";
// import { ContactFormSchema } from "@/hooks/useYupValidation";
import { countries } from "@/data/countries";
import {
  setAllCourses,
  setLoadingBestSellers,
  setLoadingCourses,
} from "@/lib/allData";
let validCountries = countries.map((item) => item.id);
const PROD = process.env.PROD;

// const tempURL = "https://msklatam.com/msk-laravel/public";

// const WP_URL = API_URL;
const apiSignUpURL = `${baseUrl}/api/signup`;
// const apiSignInURL = `${baseUrl}/api/login`;
// const apiRecoverURL = `${baseUrl}/api/RequestPasswordChange`;
// const apiNewPassword = `${baseUrl}/api/newPassword`;
// const apiProfileUrl = `${baseUrl}/api/profile`;
// const apiEnrollCourse = `${baseUrl}/api/course/enroll`;
// const apiEnrollCourseStatus = `${baseUrl}/api/coursesProgress`;

class ApiSSRService {
  baseUrl = apiSignUpURL;
  token =
    typeof window !== "undefined" ? localStorage.getItem("tokenLogin") : null;

    async getCountryCode() {
        try {
            const ipResponse = await fetch("https://api.ipify.org/?format=json");
            const ipData = await ipResponse.json();
            const ip = ipData.ip;

            let response;
            if (PROD) {
                response = await fetch(`${IP_API}?ip=${ip}`);
            } else {
                response = await fetch(`https://pro.ip-api.com/json/?fields=61439&key=OE5hxPrfwddjYYP`);
            }

            if (!response.ok) {
                throw new Error(`Failed to fetch country code. HTTP status ${response.status}`);
            }

            const data = await response.json();

            if (PROD) {
                return data.data;
            }

            return data.countryCode ? data.countryCode.toLowerCase() : "";
        } catch (error) {
            console.error("Network error:", error);
            return "";
        }
    }

    async getAllCourses(country?: string, tag?: string) {
        setLoadingCourses(true);

        let validCountries = countries.map((item) => item.id);
        let countryParam = "&country=int";

        if (country && validCountries.includes(country)) {
            countryParam = `&country=${country}`;
        }
        const tagParam = tag ? `&tag=${tag}` : "";

        try {
            const queryParams = [
                countryParam,
                tagParam
            ].filter(Boolean).join("");

            console.log("Get all courses URL", `${API_URL}/products?limit=-1${queryParams}`);
            const response = await fetch(`${API_URL}/products?limit=-1${queryParams}`);
            //const responseBody = await response.text(); // Log the response body
            const statusCode = response.status;

            // Log the HTTP status code
            console.log("HTTP status code:", statusCode);
            //console.log("Response body:", responseBody);
            //console.log("Get all courses response", JSON.stringify(response));
            //console.debug(response);
            if (!response.ok) {
                //throw new Error(`Failed to fetch courses. HTTP status ${response.status}`);
            }

            console.log("Get all courses data0");
            const data = await response.text();
            console.log("Get all courses data", data);

            setAllCourses(data.products);
            setLoadingCourses(false);

            return data.products;
        } catch (error) {
            console.error("Network error:", error);
            //return error;
        }
    }

    async getBestSellers(country?: string, tag?: string) {
        setLoadingBestSellers(true);

        try {
            let countryParam = "int";
            let validCountries = countries.map((item) => item.id);

            if (country && validCountries.includes(country)) {
                countryParam = `${country}`;
            }

            const response = await fetch(`${API_URL}/home/best-sellers?country=${countryParam}`);

            if (!response.ok) {
                throw new Error(`Failed to fetch best sellers. HTTP status ${response.status}`);
            }

            const data = await response.json();

            setLoadingBestSellers(false);

            return data.products;
        } catch (error) {
            setLoadingBestSellers(false);
            console.error("Network error:", error);
            return error;
        }
    }

    async getPosts(country?: string) {
        try {
            let currentYear = new Date().getFullYear();
            let validCountries = countries.map((item) => item.id);
            let countryParam = "int";

            if (country && validCountries.includes(country)) {
                countryParam = `${country}`;
            }

            const response = await fetch(`${API_URL}/posts?year=${currentYear}&country=${countryParam}`);

            if (!response.ok) {
                throw new Error(`Failed to fetch posts. HTTP status ${response.status}`);
            }

            const data = await response.json();

            const postsList = data.posts.map((post: any) => ({
                ...post,
                image: post.thumbnail,
            }));

            return postsList;
        } catch (error) {
            console.error("Network error:", error);
            return [];
        }
    }

    async getSingleProduct(slug: string, country: string) {
        try {
            const response = await fetch(`${API_URL}/product/${slug}?country=${country}`);

            if (!response.ok) {
                throw new Error(`Failed to fetch single product. HTTP status ${response.status}`);
            }

            const data = await response.json();

            return { product: data };
        } catch (error) {
            console.error("Network error:", error);
            return { error };
        }
    }

    async getSinglePost(slug: string) {
        try {
            const response = await fetch(`${API_URL}/posts/${slug}`);

            if (!response.ok) {
                throw new Error(`Failed to fetch single post. HTTP status ${response.status}`);
            }

            const data = await response.json();
            return data.posts[0];
        } catch (error) {
            console.error("Network error:", error);
            return { error };
        }
    }

    async fetchPostsSpecialities(): Promise<{
        fiveSpecialtiesGroup: any;
        allSpecialtiesGroup: any;
    }> {
        try {
            const response = await fetch(NOTE_SPECIALITIES);

            if (!response.ok) {
                throw new Error(`Failed to fetch post specialties. HTTP status ${response.status}`);
            }

            const data = await response.json();
            const allSpecialtiesGroup = data.specialities;
            const fiveSpecialtiesGroup = data.specialities.slice(0, 5);
            return { allSpecialtiesGroup, fiveSpecialtiesGroup };
        } catch (error) {
            console.error("Network error:", error);
            return { allSpecialtiesGroup: [], fiveSpecialtiesGroup: [] };
        }
    }
}

export default new ApiSSRService();
