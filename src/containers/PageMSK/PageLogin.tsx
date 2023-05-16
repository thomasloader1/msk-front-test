import LayoutPage from "components/LayoutPage/LayoutPage";
import React, { FC } from "react";
import Input from "components/Input/Input";
import ButtonPrimary from "components/Button/ButtonPrimary";
import NcLink from "components/NcLink/NcLink";
import { Helmet } from "react-helmet";
import api from "../../Services/api";
import {Login} from "../../data/types";

export interface PageLoginProps {
  className?: string;
}


const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  const formData = new FormData(event.target as HTMLFormElement);
  console.log({ formData, target: event.target });

  const jsonData: Login = {
    email: '',
    password: '',
  }

  formData.forEach((value, key, parent) => {
    if (key === 'email') {
      jsonData.email = value as string;
    }
    if (key === 'password') {
      jsonData.password = value as string;
    }
  });
  console.log(jsonData);

  const { response } = await api.postLogin(jsonData);
  console.log(response);

  if (response.data.status != 200){
    console.log('error');
  }else{
    console.log('login');
  }

  //changeRoute("/gracias?origen=contact")
};

//const { response } = await api.postContactUs(jsonData);

const PageLogin: FC<PageLoginProps> = ({ className = "" }) => {
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
          <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6" action="#" method="post">
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
                <NcLink to="/forgot-pass" className="text-sm">
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
          <span className="block text-center text-neutral-700 dark:text-neutral-300">
            ¿No tienes una cuenta? {` `}
            <NcLink to="/signup">Créala aquí</NcLink>
          </span>
        </div>
      </LayoutPage>
    </div>
  );
};

export default PageLogin;
