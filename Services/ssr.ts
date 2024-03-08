import axios from "axios";
// import { AxiosResponse } from "axios";
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
    const ip = await axios.get("https://api.ipify.org/?format=json");
    const { data } = PROD
      ? await axios.post(`${IP_API}?ip=${ip.data.ip}`)
      : await axios.post(
          `https://pro.ip-api.com/json/?fields=61439&key=OE5hxPrfwddjYYP`
        );
    if (PROD) {
      return data.data;
    }
    if (data.countryCode) {
      return data.countryCode.toLowerCase();
    }
    return "";
  }
  async getAllCourses(country?: string, tag?: string) {
    // tag = new URLSearchParams(window.location.search).get("tag");
    let validCountries = countries.map((item) => item.id);
    // let siteEnv = window.location.hostname !== "msklatam.com";

    let countryParam = "&country=int";
    if (country && validCountries.includes(country)) {
      countryParam = `&country=${country}`;
    }
    const tagParam = tag ? `&tag=${tag}` : "";
    // const filterParam = siteEnv ? `&filter=all` : "";

    try {
      const queryParams = [
        countryParam,
        tagParam,
        // , filterParam
      ]
        .filter(Boolean)
        .join("");

      const courses = await axios.get(
        `${API_URL}/products?limit=-1${queryParams}`
      );
      return courses.data.products;
    } catch (error) {
      // if (tag && !countryParam.length && dispatch) {
      //   dispatch({
      //     type: "SET_ERROR",
      //     payload: `No se encontraron productos para el tag ${tag} y el pais ${COUNTRY}`,
      //   });
      // }
      return error;
    }
  }
  async getBestSellers(country?: string, tag?: string) {
    try {
      let countryParam = "int";
      if (country && validCountries.includes(country)) {
        countryParam = `${country}`;
      }
      const bestSellers = await axios.get(
        `${API_URL}/home/best-sellers?country=${countryParam}`
      );
      return bestSellers.data.products;
    } catch (error) {
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
      const res = await axios.get(
        `${API_URL}/posts?year=${currentYear}&country=${countryParam}`
      );
      const postsList = res.data.posts.map((post: any) => ({
        ...post,
        image: post.thumbnail,
      }));
      return postsList;
    } catch (error) {
      console.log({ error });
    }
  }
  async getSingleProduct(slug: string, country: string) {
    try {
      const response = await axios.get(
        `${API_URL}/product/${slug}?country=${country}`
      );
      response.data;
      return { product: response.data };
    } catch (error) {
      console.log(error);
      return { error };
    }
  }
  async getSinglePost(slug: string) {
    try {
      const { data } = await axios.get(`${API_URL}/posts/${slug}`);
      return data.posts[0];
    } catch (error) {
      console.log(error);
      return { error };
    }
  }
  async fetchPostsSpecialities(): Promise<{
    fiveSpecialtiesGroup: any;
    allSpecialtiesGroup: any;
  }> {
    try {
      const res = await axios.get(NOTE_SPECIALITIES);
      const allSpecialtiesGroup = res?.data.specialities;
      const fiveSpecialtiesGroup = res?.data.specialities.slice(0, 5);
      return { allSpecialtiesGroup, fiveSpecialtiesGroup };
    } catch (e) {
      console.log({ e });
    }
  }
}

export default new ApiSSRService();
