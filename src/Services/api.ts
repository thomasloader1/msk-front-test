import axios from "axios";
import { AxiosResponse } from "axios";
import { API_URL } from "data/api";
import { ContactUs, SignUp, Newsletter } from "data/types";
import { Login } from "data/types";
const { PROD, VITE_PUBLIC_URL, VITE_PUBLIC_URL_DEV } = import.meta.env;
const COUNTRY = localStorage.getItem("country") || "mx";
const baseUrl = PROD
  ? `${VITE_PUBLIC_URL}/msk-laravel/public`
  : VITE_PUBLIC_URL_DEV;

const apiSignUpURL = `${baseUrl}/api/signup`;
const apiSignInURL = `${baseUrl}/api/login`;
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

  async postContactUs(jsonData: ContactUs) {
    try {
      const { data } = await axios.post(
        `${baseUrl}/api/crm/CreateLeadHomeContactUs`,
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
        `${baseUrl}/api/crm/CreateLeadHomeNewsletter`,
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
      localStorage.removeItem("token");
      console.log({ error });
    }
  }

  async getAllCourses() {
    try {
      const courses = await axios.get(
        `${API_URL}/products?limit=-1&country=${COUNTRY}`
      );
      return courses.data.products;
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

  async getNewsletterSpecialties() {
    try {
      const res = await axios.get(`${baseUrl}/api/newsletter/specialities`);
      return res.data;
    } catch (error) {
      return error;
    }
  }

  async getLinkLMS(cod_curso: string, email: string) {
    try {
      const { data } = await axios.post(`${baseUrl}/api/sso/link`, {
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
}

export default new ApiService();
