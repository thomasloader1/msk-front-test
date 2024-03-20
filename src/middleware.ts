import api from "../Services/api";
import { NextRequest, NextResponse } from "next/server";
import { i18nRouter } from "next-i18n-router";
// @ts-ignore
import i18nConfig from "./i18nConfig";

export function middleware(request: NextRequest) {
  // @ts-ignore
  return i18nRouter(request, i18nConfig);
}

// only applies this middleware to files in the app directory
export const config = {
  matcher: "/((?!api|static|.*\\..*|_next).*)",
};

export const getCoursesMiddleware = async (request: any) => {
  // try {
  //   // Obtener todas las cookies de la solicitud
  //   const cookieHeader = request.headers.get("Cookie");
  //   // Parsear las cookies en un objeto
  //   const cookies = parse(cookieHeader || "");
  //   // Acceder a una cookie específica, por ejemplo, la cookie "country"
  //   const countryCookie = cookies.country;
  //   // Hacer algo con la cookie, por ejemplo, imprimir su valor
  //   // console.log("Valor de la cookie 'country':", countryCookie);
  //   // Continuar con el flujo normal del middleware o realizar otras operaciones aquí
  //   // Puedes llamar a otras funciones, realizar verificaciones, etc.
  //   // Devolver un valor opcional del middleware
  //   return "Middleware ejecutado correctamente";
  // } catch (error) {
  //   console.error("Error en el middleware:", error);
  //   // Manejar errores aquí
  //   // Devolver una respuesta de error o realizar otra acción apropiada
  //   return new Response("Error interno del servidor", { status: 500 });
  // }
};

async function getLocale(request: NextRequest, response: NextResponse) {
  let cookie = request.cookies.get("NEXT_LOCALE");
  if (cookie) {
    return cookie.value;
  } else {
    /*let countryCode = await ssr.getCountryCode();
        countryCode = "mx";
        response.cookies.set('NEXT_LOCALE', countryCode);
        return countryCode;*/
  }
}

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
