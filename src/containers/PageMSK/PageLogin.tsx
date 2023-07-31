import LayoutPage from "components/LayoutPage/LayoutPage";
import React, { FC, useContext, useState } from "react";
import Input from "components/Input/Input";
import ButtonPrimary from "components/Button/ButtonPrimary";
import NcLink from "components/NcLink/NcLink";
import { Helmet } from "react-helmet";
import api from "../../Services/api";
import { Login } from "../../data/types";
import { useHistory } from "react-router-dom";
import { AuthContext } from "context/user/AuthContext";

export interface PageLoginProps {
  className?: string;
}

//const { response } = await api.postContactUs(jsonData);

const PageLogin: FC<PageLoginProps> = ({ className = "" }) => {
  const [loginError, setLoginError] = useState<string>("");
  const { state, dispatch } = useContext(AuthContext);

  const history = useHistory();

  const changeRoute = (newRoute: string): void => {
    history.push(newRoute);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    console.log({ formData, target: event.target });

    const jsonData: Login = {
      email: "",
      password: "",
    };

    formData.forEach((value, key, parent) => {
      if (key === "email") {
        jsonData.email = value as string;
      }
      if (key === "password") {
        jsonData.password = value as string;
      }
    });
    console.log(jsonData);

    const { data, status } = await api.postLogin(jsonData);

    if (status == 200) {
      const loginData = { ...data, email: jsonData.email };
      dispatch({ type: "LOGIN", payload: loginData });
      changeRoute("/mi-perfil");
    } else {
      console.log("error");
      setLoginError(data.message);
    }
  };

  return (
    <div className={`nc-PageLogin ${className}`} data-nc-id="PageLogin">
      <Helmet>
        <title>MSK | Iniciar sesión</title>
      </Helmet>
      <LayoutPage
        subHeading="Accede a tu perfil personal"
        heading="Iniciar sesión"
      >
        <div className="max-w-md mx-auto space-y-6">
          {/* FORM */}
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 gap-6"
            action="#"
            method="post"
          >
            <label className="block">
              <span className="text-neutral-800 dark:text-neutral-200">
                E-mail
              </span>
              <Input
                name="email"
                type="email"
                placeholder="Ingresar e-mail"
                className="mt-1"
              />
            </label>
            <label className="block">
              <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
                Contraseña
                <NcLink to="/recuperar" className="text-sm">
                  ¿Olvidaste tu contraseña?
                </NcLink>
              </span>
              <Input
                name="password"
                type="password"
                placeholder="Ingresar contraseña"
                className="mt-1"
              />
            </label>
            <ButtonPrimary type="submit">Acceder</ButtonPrimary>
          </form>

          {/* ==== */}
          <span className="red block text-center">{loginError}</span>

          <span className="block text-center text-neutral-700 dark:text-neutral-300">
            ¿No tienes una cuenta? {` `}
            <NcLink to="/crear-cuenta">Créala aquí</NcLink>
          </span>
        </div>
      </LayoutPage>
    </div>
  );
};

export default PageLogin;
