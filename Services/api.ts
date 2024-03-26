import {
  ALL_PRODUCTS_MX,
  API_URL,
  BEST_SELLERS_MX,
  IP_API,
  NOTE_SPECIALITIES,
  baseUrl,
} from "@/data/api";
import { Login, ContactUs, SignUp, Newsletter, AuthState } from "@/data/types";
import countryStates from "@/data/jsons/__countryStates.json";
import { BodyNewPassword } from "@/components/MSK/PageNewPassword";
import { ContactFormSchema } from "@/hooks/useYupValidation";
import { countries } from "@/data/countries";

let validCountries = countries.map((item) => item.id);
const PROD = process.env.PROD;
const LSCountry =
  typeof window !== "undefined" ? localStorage.getItem("country") : null;
let COUNTRY = "int";
if (LSCountry) {
  COUNTRY = LSCountry;
}

const tempURL = "https://msklatam.com/msk-laravel/public";

const WP_URL = API_URL;
const apiSignUpURL = `${baseUrl}/api/signup`;
const apiSignInURL = `${baseUrl}/api/login`;
const apiRecoverURL = `${baseUrl}/api/RequestPasswordChange`;
const apiNewPassword = `${baseUrl}/api/newPassword`;
const apiProfileUrl = `${baseUrl}/api/profile`;
const apiEnrollCourse = `${baseUrl}/api/course/enroll`;
const apiEnrollCourseStatus = `${baseUrl}/api/coursesProgress`;
const apiCancelTrialContract = `${baseUrl}/api/crm/contracts/trial/cancel`;

class ApiService {
  baseUrl = apiSignUpURL;
  token =
    typeof window !== "undefined" ? localStorage.getItem("tokenLogin") : null;

  async get(endpoint: string) {
    const response = await fetch(`${this.baseUrl}/${endpoint}`, {
      headers: { Authorization: `Bearer ${this.token}` },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch data from ${endpoint}`);
    }

    return response.json();
  }

  async post(endpoint: string, body: any) {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Add any other headers you may need, such as authorization
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`Failed to post data to ${endpoint}`);
    }

    return response.json();
  }

  async postSignUp(jsonData: SignUp) {
    try {
      const response = await fetch(apiSignUpURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jsonData),
      });

      if (!response.ok) {
        throw new Error(`Failed to sign up. HTTP status ${response.status}`);
      }

      return await response.json();
    } catch (e) {
      return e;
    }
  }

  async postLogin(jsonData: Login): Promise<{
    data: {
      token: string;
      name: string;
      speciality: string;
      token_type: string;
    };
    status: number;
  }> {
    try {
      const response = await fetch(apiSignInURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jsonData),
      });

      if (!response.ok) {
        throw new Error(`Failed to login. HTTP status ${response.status}`);
      }
      const data = await response.json();
      return { data: data, status: response.status };
    } catch (error) {
      // @ts-ignore
      return error.response;
    }
  }

  async postRecover(jsonData: { email: string }): Promise<Response> {
    try {
      const response = await fetch(apiRecoverURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jsonData),
      });

      if (!response.ok) {
        throw new Error(`Failed to recover. HTTP status ${response.status}`);
      }

      return response;
    } catch (error) {
      // @ts-ignore
      return error;
    }
  }

  async getEmailByIdZohoCRM(module: string, email: string) {
    try {
      const response = await fetch(
        `${baseUrl}/api/crm/GetByEmail/${module}/${email}`
      );

      if (!response.ok) {
        throw new Error(
          `Failed to get email by ID from Zoho CRM. HTTP status ${response.status}`
        );
      }

      return await response.json();
    } catch (error) {
      return error;
    }
  }

  async postContactUs(jsonData: ContactUs | ContactFormSchema) {
    try {
      const response = await fetch(
        `${baseUrl}/api/crm/CreateLeadHomeContactUs`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(jsonData),
        }
      );

      if (!response.ok) {
        throw new Error(
          `Failed to post contact us data. HTTP status ${response.status}`
        );
      }

      return await response.json();
    } catch (error) {
      return error;
    }
  }

  async postNewsletter(jsonData: Newsletter) {
    try {
      const response = await fetch(
        `${baseUrl}/api/crm/CreateLeadHomeNewsletter`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(jsonData),
        }
      );

      if (!response.ok) {
        throw new Error(
          `Failed to post newsletter data. HTTP status ${response.status}`
        );
      }

      return await response.json();
    } catch (error) {
      return error;
    }
  }

  async getUserData() {
    if (typeof window !== "undefined") {
      const email = localStorage.getItem("email");
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const headers = {
            Authorization: `Bearer ${token}`,
          };
          const response = await fetch(`${apiProfileUrl}/${email}`, {
            headers: {
              ...headers,
              "Content-Type": "application/json",
            },
          });

          if (!response.ok) {
            throw new Error(
              `Failed to get user data. HTTP status ${response.status}`
            );
          }

          const data = await response.json();
          return data.user;
        }
      } catch (error) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        // console.log({error});
      }
    }
  }

  async getAllCourses(state?: any, dispatch?: any) {
    const tag = new URLSearchParams(window.location.search).get("tag");
    let validCountries = countries.map((item) => item.id);
    let siteEnv = window.location.hostname !== "msklatam.com";

    const countryParam = validCountries.includes(COUNTRY)
      ? `&country=${COUNTRY}`
      : `&country=int`;
    const tagParam = tag ? `&tag=${tag}` : "";
    const filterParam = siteEnv ? `&filter=all` : "";

    try {
      const queryParams = [countryParam, tagParam, filterParam]
        .filter(Boolean)
        .join("");

      const response = await fetch(
        `${API_URL}/products?limit=-1${queryParams}`
      );

      if (!response.ok) {
        throw new Error(
          `Failed to fetch courses. HTTP status ${response.status}`
        );
      }

      const courses = await response.json();
      return courses.products;
    } catch (error) {
      if (tag && !countryParam.length && dispatch) {
        dispatch({
          type: "SET_ERROR",
          payload: `No se encontraron productos para el tag ${tag} y el país ${COUNTRY}`,
        });
      }
      return error;
    }
  }

  async getAllProductsMX() {
    try {
      const response = await fetch(ALL_PRODUCTS_MX);

      if (!response.ok) {
        throw new Error(
          `Failed to fetch products. HTTP status ${response.status}`
        );
      }

      const data = await response.json();
      return data.products;
    } catch (error) {
      return error;
    }
  }

  async getAllTestCourses() {
    const tag = new URLSearchParams(window.location.search).get("tag");
    const tagParam = tag ? `&tag=${tag}` : "";

    try {
      const queryParams = [tagParam].filter(Boolean).join("");
      const response = await fetch(
        `${API_URL}/products?limit=-1${queryParams}&country=int&type=course&filter=test`
      );

      if (!response.ok) {
        throw new Error(
          `Failed to fetch test courses. HTTP status ${response.status}`
        );
      }

      const data = await response.json();
      return data.products;
    } catch (error) {
      return error;
    }
  }

  async getBestSellersMX() {
    try {
      const response = await fetch(BEST_SELLERS_MX);

      if (!response.ok) {
        throw new Error(
          `Failed to fetch best sellers. HTTP status ${response.status}`
        );
      }

      const data = await response.json();
      return data.products;
    } catch (error) {
      return error;
    }
  }

  async getBestSellers() {
    try {
      const countryParam = validCountries.includes(COUNTRY) ? COUNTRY : "int";
      const response = await fetch(
        `${API_URL}/home/best-sellers?country=${countryParam}`
      );

      if (!response.ok) {
        throw new Error(
          `Failed to fetch best sellers. HTTP status ${response.status}`
        );
      }

      const data = await response.json();
      return data.products;
    } catch (error) {
      return error;
    }
  }

  async getProfessions() {
    try {
      const response = await fetch(`${tempURL}/api/professions`);

      if (!response.ok) {
        throw new Error(
          `Failed to fetch professions. HTTP status ${response.status}`
        );
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return error;
    }
  }

  async getStoreProfessions() {
    try {
      const response = await fetch(`${baseUrl}/api/store/professions`);

      if (!response.ok) {
        throw new Error(
          `Failed to fetch store professions. HTTP status ${response.status}`
        );
      }

      const data = await response.json();

      // Modify slug based on profession name
      data.map((profession: any) => {
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

      return data;
    } catch (error) {
      return error;
    }
  }

  async getSpecialties() {
    try {
      const response = await fetch(`${tempURL}/api/specialities`);

      if (!response.ok) {
        throw new Error(
          `Failed to fetch specialties. HTTP status ${response.status}`
        );
      }

      const data = await response.json();
      return data.specialities;
    } catch (error) {
      return error;
    }
  }

  async getSpecialtiesAndGroups() {
    try {
      const response = await fetch(`${tempURL}/api/specialities`);

      if (!response.ok) {
        throw new Error(
          `Failed to fetch specialties and groups. HTTP status ${response.status}`
        );
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return error;
    }
  }

  async getSpecialtiesStore() {
    try {
      let validCountries = countries.map((item) => item.id);
      const countryParam = validCountries.includes(COUNTRY)
        ? `&country=${COUNTRY}`
        : `&country=int`;

      const response = await fetch(
        `${API_URL}/products-specialities?${countryParam}`
      );

      if (!response.ok) {
        throw new Error(
          `Failed to fetch specialties store. HTTP status ${response.status}`
        );
      }

      const data = await response.json();

      return data.specialities.map(
        (specialty: {
          speciality_name: string;
          products: number;
          image: string;
        }) => ({
          name: specialty.speciality_name,
          products: specialty.products,
          image: specialty.image,
        })
      );
    } catch (error) {
      console.error("Network error:", error);
      return error;
    }
  }

  async getNewsletterSpecialties() {
    try {
      const response = await fetch(`${baseUrl}/api/newsletter/specialities`);

      if (!response.ok) {
        throw new Error(
          `Failed to fetch newsletter specialties. HTTP status ${response.status}`
        );
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return error;
    }
  }

  async getLinkLMS(product_code: number, cod_curso: string, email: string) {
    try {
      const response = await fetch(`${baseUrl}/api/sso/link`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          product_code,
          cod_curso,
          email,
        }),
      });

      if (!response.ok) {
        throw new Error(
          `Failed to get LMS link. HTTP status ${response.status}`
        );
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return error;
    }
  }

  async updateUserData(data: any): Promise<any> {
    if (typeof window !== "undefined") {
      const userEmail = localStorage.getItem("email");
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const headers = {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json", // Add Content-Type header
          };
          const response = await fetch(`${apiProfileUrl}/${userEmail}`, {
            method: "PUT",
            headers: headers,
            body: JSON.stringify(data), // Convert data to JSON format
          });

          if (!response.ok) {
            throw new Error(
              `Failed to update user data. HTTP status ${response.status}`
            );
          }

          const updatedData = await response.json();
          return updatedData;
        }
      } catch (error) {
        return error;
      }
    }
  }

  async getPosts(country?: string) {
    try {
      let currentYear = new Date().getFullYear();
      let validCountries = countries.map((item) => item.id);
      const countryParam = validCountries.includes(COUNTRY || "")
        ? COUNTRY
        : "int";

      const response = await fetch(
        `${API_URL}/posts?year=${currentYear}&country=${countryParam}`
      );

      if (!response.ok) {
        throw new Error(
          `Failed to fetch posts. HTTP status ${response.status}`
        );
      }

      const data = await response.json();

      const postsList = data.posts.map((post: any) => ({
        ...post,
        image: post.thumbnail,
      }));

      return postsList;
    } catch (error) {
      // console.log({error});
    }
  }

  async getSinglePost(slug: string) {
    try {
      const response = await fetch(`${API_URL}/posts/${slug}`);

      if (!response.ok) {
        throw new Error(
          `Failed to fetch single post. HTTP status ${response.status}`
        );
      }

      const data = await response.json();
      return data.posts[0];
    } catch (error) {
      // console.log({error});
    }
  }

  async getSingleCourse(slug: string, country: string) {
    try {
      const response = await fetch(
        `${API_URL}/product/${slug}?country=${country}`
      );

      if (!response.ok) {
        throw new Error(
          `Failed to fetch single course. HTTP status ${response.status}`
        );
      }

      const data = await response.json();
      return data;
    } catch (error) {
      // console.log({error});
    }
  }

  async getCountryCode() {
    try {
      const ipResponse = await fetch("https://api.ipify.org/?format=json");
      const ipData = await ipResponse.json();
      const ip = ipData.ip;

      let response;
      if (PROD) {
        response = await fetch(`${IP_API}?ip=${ip}`);
      } else {
        response = await fetch(
          `https://pro.ip-api.com/json/?fields=61439&key=OE5hxPrfwddjYYP`
        );
      }

      if (!response.ok) {
        throw new Error(
          `Failed to fetch country code. HTTP status ${response.status}`
        );
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

  async getStatesFromCountry(country: string) {
    try {
      return countryStates[country as keyof typeof countryStates];
    } catch (error) {
      console.error("Network error:", error);
      return [];
    }
  }

  async postNewPassword(jsonData: BodyNewPassword) {
    try {
      const response = await fetch(apiNewPassword, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jsonData),
      });

      if (!response.ok) {
        throw new Error(
          `Failed to post new password. HTTP status ${response.status}`
        );
      }

      return response.json();
    } catch (error) {
      console.error("Network error:", error);
      return error;
    }
  }

  async getNotesSpecialities() {
    try {
      const response = await fetch(NOTE_SPECIALITIES);

      if (!response.ok) {
        throw new Error(
          `Failed to fetch notes specialities. HTTP status ${response.status}`
        );
      }

      return response.json();
    } catch (error) {
      console.error("Network error:", error);
      return error;
    }
  }

  async temarioDownload(body: any, url: string, slug?: string) {
    const regex = /wp\.msklatam\.com(\/.*)?/;
    const formattedUrl = `https://${url.match(regex)![0]}`;
    try {
      const response = await fetch(formattedUrl);

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${slug || "temario_msk"}.pdf`;
        a.click();
        window.URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  }

  async cancelSubscription(formData: any) {
    try {
      return fetch("https://ayuda.msklatam.com/support/WebToCase", {
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    } catch (error) {
      console.error("Network error:", error);
    }
  }

  async getWpImages(kind: string, country?: string) {
    try {
      const countryParam = country ? `?country=${country}` : "";
      const response = await fetch(`${API_URL}/banners${countryParam}`);

      if (!response.ok) {
        throw new Error(
          `Failed to fetch WP images. HTTP status ${response.status}`
        );
      }

      const data = await response.json();

      const formattedResponse = data[kind].map((img: any) => {
        const url =
          typeof img.url_banner == "string"
            ? { href: img.url_banner }
            : { href: img.url_banner.url };
        return { ...img, url };
      });

      return formattedResponse;
    } catch (error) {
      console.error("Network error:", error);
      return [];
    }
  }

  async enrollCourse(product_code: number, email: string) {
    try {
      const response = await fetch(apiEnrollCourse, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          product_code,
          email,
        }),
      });

      if (!response.ok) {
        throw new Error(
          `Failed to enroll course. HTTP status ${response.status}`
        );
      }

      return response.json();
    } catch (error) {
      console.error("Network error:", error);
      return error;
    }
  }

  async getCoursesProgressStatus(email: string, product_code: number) {
    try {
      const response = await fetch(
        `${apiEnrollCourseStatus}/${email}/${product_code}`
      );

      if (!response.ok) {
        throw new Error(
          `Failed to get courses progress status. HTTP status ${response.status}`
        );
      }

      return response.json();
    } catch (error) {
      console.error("Network error:", error);
      return error;
    }
  }

  async cancelTrialCourse(product: any, authState: AuthState) {
    try {
      const response = await fetch(apiCancelTrialContract, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          product,
          authState,
        }),
      });

      if (!response.ok) {
        throw new Error(
          `Failed to cancel trial course. HTTP status ${response.status}`
        );
      }

      const data = await response.json();
      // console.log({ data });
      return data;
    } catch (error) {
      console.error("Network error:", error);
      return error;
    }
  }
}

export default new ApiService();
