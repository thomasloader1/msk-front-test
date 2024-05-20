"use client";
import { FC, useContext, useRef, useState } from "react";
import ButtonPrimary from "@/components/Button/ButtonPrimary";
import NcLink from "@/components/NcLink/NcLink";
import { AuthContext } from "@/context/user/AuthContext";
import { ErrorMessage, Field, Form, FormikProvider, useFormik } from "formik";
import * as Yup from "yup";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import api from "../../../../Services/api";
import LayoutPage from "@/components/MSK/LayoutPage";
import { useRouter } from "next/navigation";


export interface PageLoginProps {
  className?: string;
  lang?: string;
}
export const runtime = "edge";

const PageLogin: FC<PageLoginProps> = ({ className = "" }) => {
  // @ts-ignore
  const router = useRouter();
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [loginError, setLoginError] = useState<string>("");
  const [onRequest, setOnRequest] = useState<boolean>(false);
  const { state, dispatch } = useContext(AuthContext);
  const formRef = useRef<HTMLFormElement>(null);
  const initialValues = {
    email: "",
    password: "",
    recaptcha_token: "",
  };
  // const history = useHistory();
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Correo electrónico inválido")
      .required("El correo electrónico es requerido"),
    password: Yup.string().required("La contraseña es requerida"),
  });
  const changeRoute = (newRoute: string): void => {
    router.push(newRoute);
  };
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values: any) => {
      setOnRequest(true);
      try {
        if (executeRecaptcha) {
          const formData = {
            ...values,
            recaptcha_token: await executeRecaptcha("login"),
          };
          const { data, status } = await api.postLogin(formData);
          // @ts-ignore
          if (status == 200) {
            const { name, speciality, ...restData } = data;
            const loginData = {
              ...restData,
              email: formik.values.email,
              user: { name, speciality },
            };
            dispatch({ type: "LOGIN", payload: loginData });
            changeRoute("/mi-perfil");
          } else {
            setLoginError(data?.message as string);
          }
        }
      } catch (error) {
        console.error("Error al ejecutar reCAPTCHA:", error);
      } finally {
        setOnRequest(false);
      }
    },
  });

  return (
    <div
      className={`nc-PageLogin ${className} animate-fade-down`}
      data-nc-id="PageLogin"
    >
      <LayoutPage
        subHeading="Accede a tu perfil personal"
        heading="Iniciar sesión"
      >
        <div className="max-w-md mx-auto space-y-6">
          <FormikProvider value={formik}>
            <Form
              onSubmit={formik.handleSubmit}
              action="#"
              className=""
              autoComplete="off"
              ref={formRef}
            >
              <div className="form-input-std">
                <label className="text-neutral-800 dark:text-neutral-200 mb-1">
                  E-mail
                </label>
                <ErrorMessage name="email" component="span" className="error" />
                <Field type="text" name="email" placeholder="Ingresar e-mail" />
              </div>
              <div className="form-input-std my-4">
                <label className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
                  Contraseña
                  <NcLink href="/recuperar" className="text-sm">
                    ¿Olvidaste tu contraseña?
                  </NcLink>
                </label>
                <ErrorMessage
                  name="password"
                  component="span"
                  className="error"
                />
                <Field
                  name="password"
                  type="password"
                  placeholder="Ingresar contraseña"
                />
              </div>
              <ButtonPrimary
                type="submit"
                className="w-full"
                disabled={onRequest}
              >
                {onRequest ? "Accediendo ..." : "Acceder"}
              </ButtonPrimary>
            </Form>
          </FormikProvider>
          {/* {Boolean(loginError) && <ShowErrorMessage text={loginError} />} */}
          <span className="block text-center text-neutral-700 dark:text-neutral-300">
            ¿No tienes una cuenta? {` `}
            <NcLink href="/crear-cuenta">Créala aquí</NcLink>
          </span>
        </div>
      </LayoutPage>
    </div>
  );
};

export default PageLogin;
