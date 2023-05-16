import React, { FC, useState } from "react";
import LayoutPage from "components/LayoutPage/LayoutPage";
import Input from "components/Input/Input";
import ButtonPrimary from "components/Button/ButtonPrimary";
import NcLink from "components/NcLink/NcLink";
import { Helmet } from "react-helmet";
import axios from "axios";
import Checkbox from "components/Checkbox/Checkbox";
import {Login, SignUp} from "../../data/types";
import api from "../../Services/api";

export interface PageSignUpProps {
  className?: string;
}

const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  const formData = new FormData(event.target as HTMLFormElement);
  console.log({ formData, target: event.target });

  const jsonData: SignUp = {
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    phone: '',
  }

  const allowedKeys: (keyof SignUp)[] = ['first_name', 'last_name', 'email', 'password', 'phone'];

  formData.forEach((value, key) => {
    const formDataKey = key as keyof SignUp;
    if (allowedKeys.includes(formDataKey)) {
      jsonData[formDataKey] = value as string;
    }
  });
  console.log(jsonData);

  const { response } = await api.postSignUp(jsonData);
  console.log(response);

  if (response.data.status != 200){
    console.log('error');
  }else{
    console.log('login');
  }

  //changeRoute("/gracias?origen=contact")
};
const PageSignUp: FC<PageSignUpProps> = ({ className = "" }) => {
  return (
    <div className={`nc-PageSignUp ${className}`} data-nc-id="PageSignUp">
      <Helmet>
        <title>MSK | Crear cuenta</title>
      </Helmet>
      <LayoutPage
        subHeading="Regístrate y disfruta al máximo de nuestra propuesta educativa"
        heading="Crear cuenta"
      >
        <div className="max-w-md mx-auto space-y-6">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6" method="post">
            <label className="block">
              <span className="text-neutral-800 dark:text-neutral-200">
                Nombre
              </span>
              <Input
                  name="first_name"
                type="text"
                placeholder="Ingresar nombre"
                className="mt-1"
              />
            </label>
            <label className="block">
              <span className="text-neutral-800 dark:text-neutral-200">
                Apellido
              </span>
              <Input
                  name="last_name"
                type="text"
                placeholder="Ingresar apellido"
                className="mt-1"
              />
            </label>
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
              <span className="text-neutral-800 dark:text-neutral-200">
                Teléfono
              </span>
              <Input
                  name="phone"
                type="text"
                placeholder="Ingresar teléfono"
                className="mt-1"
              />
            </label>
            <label className="block">
              <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
                Password
              </span>
              <Input name="password" type="password" className="mt-1" />
            </label>
            <div className="flex gap-1 mt-2 mb-4 mx-auto">
              <Checkbox name="telephone" label="Acepto las" />
              <a className="text-primary text-sm underline">
                condiciones de privacidad
              </a>
            </div>
            <ButtonPrimary type="submit">Crear</ButtonPrimary>
          </form>
        </div>
      </LayoutPage>
    </div>
  );
};

export default PageSignUp;
