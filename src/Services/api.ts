import axios from 'axios';
import { ContactUs, SignUp, Newsletter } from 'data/types';
import { Login } from 'data/types';

const baseURLLocal = 'http://localhost:8000/api/crm'
const baseURLPRD = 'https://msklatam.com/msk-laravel/public/api/crm'

const apiSignUpURL = `https://msklatam.com/msk-laravel/public/api/signup`;
const apiSignInURL = `https://msklatam.com/msk-laravel/public/api/login`;

class ApiService {
  baseUrl = apiSignUpURL;
  token = localStorage.getItem('tokenLogin');

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

  async postLogin(jsonData: Login) {
    try {
      const { data } = await axios.post(apiSignInURL, jsonData);
      return data;
    } catch (e) {
      return e;
    }
  }

  async getEmailByIdZohoCRM(module: string, email: string) {
    try {
      const { data } = await axios.get(`${baseURLPRD}/GetByEmail/${module}/${email}`);
      return data;
    } catch (e) {
      return e;
    }
  }

  async postContactUs(jsonData: ContactUs) {
    try {
      const { data } = await axios.post(`${baseURLPRD}/CreateLeadHomeContactUs`, jsonData);
      return data;
      // return jsonData;
    } catch (e) {
      return e;
    }
  };

  async postNewsletter(jsonData: Newsletter) {
    try {
      const { data } = await axios.post(`${baseURLPRD}/CreateLeadHomeNewsletter`, jsonData);
      return data;
      // return jsonData;
    } catch (e) {
      return e;
    }
  };
  // Aquí puedes agregar más métodos según tus necesidades
}

export default new ApiService();