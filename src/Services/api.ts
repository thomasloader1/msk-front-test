import axios from "axios";
import { AxiosResponse } from "axios";
import {
  ALL_PRODUCTS_MX,
  API_URL,
  BEST_SELLERS_MX,
  IP_API,
  NOTE_SPECIALITIES,
  baseUrl,
} from "data/api";
import { ContactUs, SignUp, Newsletter } from "data/types";
import { Login } from "data/types";
import countryStates from "data/jsons/__countryStates.json";
import { BodyNewPassword } from "containers/PageMSK/PageNewPassword";
import { ContactFormSchema } from "hooks/useYupValidation";
import { useContext } from "react";
import { CountryContext } from "context/country/CountryContext";

const { PROD, VITE_MSK_WP_API } = import.meta.env;
const COUNTRY = localStorage.getItem("country") || "mx";

const WP_URL = VITE_MSK_WP_API;
const apiSignUpURL = `${baseUrl}/api/signup`;
const apiSignInURL = `${baseUrl}/api/login`;
const apiRecoverURL = `${baseUrl}/api/RequestPasswordChange`;
const apiNewPassword = `${baseUrl}/api/newPassword`;
const apiProfileUrl = `${baseUrl}/api/profile`;

class ApiService {
  baseUrl = apiSignUpURL;
  token = localStorage.getItem("tokenLogin");

  async get(endpoint: string) {
    const response = await axios.get(`${this.baseUrl}/${endpoint}`, {
      headers: { Authorization: `Bearer ${this.token}` },
    });
    return response;
  }

  async post(endpoint: string, body: any) {
    const response = await axios.post(`${this.baseUrl}${endpoint}`, {
      body,
    });
    return response;
  }

  async postSignUp(jsonData: SignUp) {
    try {
      const { data } = await axios.post(apiSignUpURL, jsonData);
      return data;
    } catch (e) {
      return e;
    }
  }

  async postLogin(jsonData: Login): Promise<AxiosResponse<any>> {
    try {
      return await axios.post(apiSignInURL, jsonData);
    } catch (error: any) {
      return error.response;
    }
  }

  async postRecover(jsonData: { email: string }): Promise<AxiosResponse<any>> {
    try {
      return await axios.post(apiRecoverURL, jsonData);
    } catch (error: any) {
      return error;
    }
  }

  async getEmailByIdZohoCRM(module: string, email: string) {
    try {
      const { data } = await axios.get(
        `${baseUrl}/api/crm/GetByEmail/${module}/${email}`
      );
      return data;
    } catch (e) {
      return e;
    }
  }

  async postContactUs(jsonData: ContactUs | ContactFormSchema) {
    try {
      return await axios.post(
        `${baseUrl}/api/crm/CreateLeadHomeContactUs`,
        jsonData
      );
      // return jsonData;
    } catch (e) {
      return e;
    }
  }

  async postNewsletter(jsonData: Newsletter) {
    try {
      return await axios.post(
        `${baseUrl}/api/crm/CreateLeadHomeNewsletter`,
        jsonData
      );
    } catch (e) {
      return e;
    }
  }
  // Aquí puedes agregar más métodos según tus necesidades

  async getUserData() {
    const email = localStorage.getItem("email");
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const headers = {
          Authorization: `Bearer ${token}`,
        };
        const res = await axios.get(`${apiProfileUrl}/${email}`, { headers });
        return res.data.user;
      }
    } catch (error) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      console.log({ error });
    }
  }

  async getAllCourses(state?: any, dispatch?: any) {
    const tag = new URLSearchParams(window.location.search).get("tag");
    const countryParam = COUNTRY ? `&country=${COUNTRY}` : "";
    const tagParam = tag ? `&tag=${tag}` : "";

    try {
      const queryParams = [countryParam, tagParam].filter(Boolean).join("");

      const courses = await axios.get(
        `${API_URL}/products?limit=-1${queryParams}`
      );
      return courses.data.products;
    } catch (error) {
      if (tag && !countryParam.length && dispatch) {
        dispatch({
          type: "SET_ERROR",
          payload: `No se encontraron productos para el tag ${tag} y el pais ${COUNTRY}`,
        });
      }
      return error;
    }
  }

  async getAllProductsMX() {
    try {
      const courses = await axios.get(`${ALL_PRODUCTS_MX}`);
      return courses.data.products;
    } catch (error) {
      return error;
    }
  }
  async getBestSellersMX() {
    try {
      const res = await axios.get(`${BEST_SELLERS_MX}`);
      return res.data.products;
    } catch (error) {
      return error;
    }
  }

  async getBestSellers() {
    try {
      const bestSellers = await axios.get(
        `${API_URL}/home/best-sellers?country=${COUNTRY}`
      );
      return bestSellers.data.products;
    } catch (error) {
      return error;
    }
  }

  async getProfessions() {
    try {
      const res = await axios.get(`${baseUrl}/api/professions`);

      return res.data;
    } catch (error) {
      return error;
    }
  }

  async getStoreProfessions() {
    try {
      const res = await axios.get(`${baseUrl}/api/store/professions`);
      res.data.map((profession: any) => {
        switch (profession.name) {
          case "Personal médico":
            profession.slug = "medicos";
            break;
          case "Personal de enfermería y auxiliares":
            profession.slug = "enfermeros-auxiliares";
            break;
          case "Otra profesión":
            profession.slug = "otra-profesion";
            break;
        }
      });
      return res.data;
    } catch (error) {
      return error;
    }
  }

  async getSpecialties() {
    try {
      const res = await axios.get(`${baseUrl}/api/specialities`);
      return res.data.specialities;
    } catch (error) {
      return error;
    }
  }

  async getSpecialtiesAndGroups() {
    try {
      const res = await axios.get(`${baseUrl}/api/specialities`);
      return res.data;
    } catch (error) {
      return error;
    }
  }

  async getSpecialtiesStore() {
    try {
      const res = await axios.get(
        `${VITE_MSK_WP_API}/products-specialities?country=${COUNTRY}`
      );

      return res.data.specialities.map(
        (specialty: {
          speciality_name: string;
          products: number;
          image: string;
        }) => {
          return {
            name: specialty.speciality_name,
            products: specialty.products,
            image: specialty.image,
          };
        }
      );
    } catch (error) {
      return error;
    }
  }

  async getNewsletterSpecialties() {
    try {
      const res = await axios.get(`${baseUrl}/api/newsletter/specialities`);
      return res.data;
    } catch (error) {
      return error;
    }
  }

  async getLinkLMS(product_code: number, cod_curso: string, email: string) {
    try {
      const { data } = await axios.post(`${baseUrl}/api/sso/link`, {
        product_code,
        cod_curso,
        email,
      });
      return data;
    } catch (error) {
      return error;
    }
  }

  async updateUserData(data: any): Promise<any> {
    const userEmail = localStorage.getItem("email");
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const headers = {
          Authorization: `Bearer ${token}`,
        };
        const res = await axios.put(`${apiProfileUrl}/${userEmail}`, data, {
          headers,
        });
        return res;
      }
    } catch (error) {
      return error;
    }
  }

  async getPosts(country: string) {
    try {
      const iso = country.includes("") ? "int" : country;
      const res = await axios.get(`${API_URL}/posts?year=2023&country=${iso}`);
      const postsList = res.data.posts.map((post: any) => ({
        ...post,
        image: post.thumbnail,
      }));
      return postsList;
    } catch (error) {
      console.log({ error });
    }
  }

  async getSinglePost(slug: string) {
    try {
      const { data } = await axios.get(`${API_URL}/posts/${slug}`);
      return data.posts[0];
    } catch (error) {
      console.log({ error });
    }
  }

  async getSingleCourse(slug: string, country: string) {
    try {
      const { data } = await axios.get(
        `${API_URL}/product/${slug}?country=${country}`
      );
      return data;
    } catch (error) {
      console.log({ error });
    }
  }

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

  async getStatesFromCountry(country: string) {
    try {
      return countryStates[country as keyof typeof countryStates];
    } catch (error) {
      console.error("Error de red:", error);
    }
  }

  async postNewPassword(jsonData: BodyNewPassword) {
    return await axios.post(apiNewPassword, jsonData);
  }

  async getNotesSpecialities() {
    try {
      return await axios.get(NOTE_SPECIALITIES);
    } catch (e) {
      console.log({ e });
    }
  }

  async temarioDownload(body: any, url: string, slug?: string) {
    const regex = /wp\.msklatam\.com(\/.*)?/;
    const formattedUrl = `https://${url.match(regex)![0]}`;
    try {
      const response = await axios.get(formattedUrl, {
        responseType: "blob",
      });
      if (response?.status == 200) {
        const blob = new Blob([response.data], {
          type: "application/pdf",
        });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${slug || "temario_msk"}.pdf`;
        a.click();
        window.URL.revokeObjectURL(url);
      }
    } catch (e) {
      console.log({ e });
    }
  }

  async cancelSubscription(formData: any) {
    try {
      return axios.post(
        "https://ayuda.msklatam.com/support/WebToCase",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    } catch (e) {
      console.log("ERROR:", e);
    }
  }
}

export default new ApiService();
