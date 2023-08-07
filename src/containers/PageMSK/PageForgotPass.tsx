import React, { FC } from "react";
import LayoutPage from "components/LayoutPage/LayoutPage";
import Input from "components/Input/Input";
import ButtonPrimary from "components/Button/ButtonPrimary";
import NcLink from "components/NcLink/NcLink";
import { Helmet } from "react-helmet";
import api from "Services/api";

export interface PageForgotPassProps {
  className?: string;
}

interface Recover {
  email: string;
}

const PageForgotPass: FC<PageForgotPassProps> = ({ className = "" }) => {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);

    const jsonData: Recover = {
      email: "",
    };

    formData.forEach((value, key, parent) => {
      if (key === "email") {
        jsonData.email = value as string;
      }
    });

    const { data, status } = await api.postRecover(jsonData);

    if (status == 200) {
      console.log(data);
    } else {
      console.log("error");
    }
  };
  return (
    <div
      className={`nc-PageForgotPass ${className}`}
      data-nc-id="PageForgotPass"
    >
      <Helmet>
        <title>MSK | Olvidaste la contraseña</title>
      </Helmet>
      <LayoutPage
        heading="Cambiar contraseña"
        subHeading="Te enviaremos un correo para que puedas crear una nueva"
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
                Email
              </span>
              <Input
                type="email"
                placeholder="Ingresar e-mail"
                className="mt-1"
              />
            </label>
            <ButtonPrimary type="submit">Confirmar</ButtonPrimary>
          </form>

          {/* ==== */}
          <span className="block text-center text-neutral-700 dark:text-neutral-300">
            Volver a {` `}
            <NcLink to="/iniciar-sesion" className="underline">
              Iniciar sesión
            </NcLink>
          </span>
        </div>
      </LayoutPage>
    </div>
  );
};

export default PageForgotPass;
