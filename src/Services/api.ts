import axios from "axios";
import { AxiosResponse } from "axios";
import { API_URL } from "data/api";
import { ContactUs, SignUp, Newsletter } from "data/types";
import { Login } from "data/types";

const { PROD, VITE_PUBLIC_URL, VITE_PUBLIC_URL_DEV } = import.meta.env;
const baseUrl = PROD ? VITE_PUBLIC_URL : 'http://localhost:8000';

const apiSignUpURL = `${baseUrl}/msk-laravel/public/api/signup`;
const apiSignInURL = `${baseUrl}/msk-laravel/public/api/login`;
const apiProfileUrl = `${baseUrl}/msk-laravel/public/api/profile`;

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

  async getEmailByIdZohoCRM(module: string, email: string) {
    try {
      const { data } = await axios.get(
        `${baseUrl}/msk-laravel/public/api/crm/GetByEmail/${module}/${email}`
      );
      return data;
    } catch (e) {
      return e;
    }
  }

  async postContactUs(jsonData: ContactUs) {
    try {
      const { data } = await axios.post(
        `${baseUrl}/msk-laravel/public/api/crm/CreateLeadHomeContactUs`,
        jsonData
      );
      return data;
      // return jsonData;
    } catch (e) {
      return e;
    }
  }

  async postNewsletter(jsonData: Newsletter) {
    try {
      const { data } = await axios.post(
        `${baseUrl}/msk-laravel/public/api/crm/CreateLeadHomeNewsletter`,
        jsonData
      );
      return data;
      // return jsonData;
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
      return error;
    }
  }

  async getAllCourses() {
    try {
      const courses = await axios.get(
        `${API_URL}/products?limit=-1&country=mx`
      );
      return courses.data.products;
    } catch (error) {
      return error;
    }
  }
  async getBestSellers() {
    try {
      const bestSellers = await axios.get(
        `${API_URL}/home/best-sellers?country=mx`
      );
      return bestSellers.data.products;
    } catch (error) {
      return error;
    }
  }

  async getProfessions() {
    try {
      const res = await axios.get(
        `${baseUrl}/msk-laravel/public/api/professions`
      );

      return res.data;
    } catch (error) {
      return error;
    }
  }

  async getStoreProfessions() {
    try {
      const res = await axios.get(
        `${baseUrl}/msk-laravel/public/api/store/professions`
      );
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
      const res = await axios.get(
        `${baseUrl}/msk-laravel/public/api/specialities`
      );
      return res.data;
    } catch (error) {
      return error;
    }
  }

  async getNewsletterSpecialties() {
    try {
      const res = await axios.get(
        `${baseUrl}/msk-laravel/public/api/newsletter/specialities`
      );
      return res.data;
    } catch (error) {
      return error;
    }
  }
}

export default new ApiService();
