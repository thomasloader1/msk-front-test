import api from "../Services/api";
import { NextRequest, NextResponse } from "next/server";
import { i18nRouter } from "next-i18n-router";
// @ts-ignore
import i18nConfig from "./i18nConfig";

const protectedRoutes = ["/mi-cuenta", "mi-perfil"];

export function middleware(request: NextRequest) {
  return i18nRouter(request, i18nConfig);
}

// only applies this middleware to files in the app directory
export const config = {
  matcher: "/((?!api|static|.*\\..*|_next).*)",
};

export const fetchUserData = async () => {
  try {
    // console.log("MIDDLEWARE FETCH DATA");
    const res = await api.getUserData();
    if (!res.message) {
      localStorage.setItem(
        "user",
        JSON.stringify({
          name: res.name,
          speciality: res.contact.speciality,
        })
      );
      localStorage.setItem("bypassRedirect", res.test);
      return {
        name: res.name,
        speciality: res.contact.speciality,
        profile: res.contact,
      };
    } else {
      // console.log(res.response.status);
      return null;
    }
  } catch (e) {
    console.error({ e });
    localStorage.removeItem("email");
    localStorage.removeItem("user");
    return null;
  }
};
