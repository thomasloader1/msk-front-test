import React, { FC, SetStateAction, useState } from "react";
import LayoutPage from "components/LayoutPage/LayoutPage";
import Input from "components/Input/Input";
import ButtonPrimary from "components/Button/ButtonPrimary";
import NcLink from "components/NcLink/NcLink";
import api from "Services/api";
import { useHistory } from "react-router-dom";
import PageHead from "./PageHead";
import ShowErrorMessage from "components/ShowErrorMessage";

export interface PageForgotPassProps {
  className?: string;
}

interface Recover {
  email: string;
}

const PageForgotPass: FC<PageForgotPassProps> = ({ className = "" }) => {
  const [email, setEmail] = useState<string>("");
  const history = useHistory();
  const [error, setError] = useState("");
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

    const res = await api.postRecover(jsonData);
    if (res?.status == 200) {
      setTimeout(() => {
        history.push("/correo-enviado");
      }, 1500);
    } else {
      console.error("Error:", { res });
      setError(res as SetStateAction<string>);
    }
  };

  return (
    <div
      className={`nc-PageForgotPass animate-fade-down ${className}`}
      data-nc-id="PageForgotPass"
    >
      <PageHead title="Olvidaste la contraseña" />

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
                name="email"
                id="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <ButtonPrimary type="submit">Confirmar</ButtonPrimary>
          </form>
          {Boolean(error) && <ShowErrorMessage text={error} />}

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
