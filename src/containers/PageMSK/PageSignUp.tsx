import React, { FC, useState } from "react";
import LayoutPage from "components/LayoutPage/LayoutPage";
import facebookSvg from "images/Facebook.svg";
import twitterSvg from "images/Twitter.svg";
import googleSvg from "images/Google.svg";
import Input from "components/Input/Input";
import ButtonPrimary from "components/Button/ButtonPrimary";
import NcLink from "components/NcLink/NcLink";
import { Helmet } from "react-helmet";
import axios from "axios";
import { Profession, Specialty } from "data/types";
import Checkbox from "components/Checkbox/Checkbox";

export interface PageSignUpProps {
  className?: string;
}

const loginSocials = [
  {
    name: "Continue with Facebook",
    href: "#",
    icon: facebookSvg,
  },
  {
    name: "Continue with Twitter",
    href: "#",
    icon: twitterSvg,
  },
  {
    name: "Continue with Google",
    href: "#",
    icon: googleSvg,
  },
];

const PageSignUp: FC<PageSignUpProps> = ({ className = "" }) => {
  const [specialties, setSpecialties] = useState<Specialty[]>([]);
  const [professions, setProfessions] = useState<Profession[]>([]);
  axios
    .get("https://msklatam.com/msk-laravel/public/api/professions")
    .then((response) => {
      setProfessions(response.data);
    })
    .catch((error) => {
      console.log(error);
    });

  axios
    .get("https://msklatam.com/msk-laravel/public/api/specialities")
    .then((response) => {
      setSpecialties(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
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
          <form className="grid grid-cols-1 gap-6" action="#" method="post">
            <label className="block">
              <span className="text-neutral-800 dark:text-neutral-200">
                Nombre
              </span>
              <Input
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
                type="text"
                placeholder="Ingresar teléfono"
                className="mt-1"
              />
            </label>
            {/* <div className="couse-dropdown">
              <div className="course-drop-inner">
                <select className="w-full">
                  {specialties.map((specialty, index) => (
                    <option value="" key={`spe_${index}`}>
                      {specialty.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="couse-dropdown">
              <div className="course-drop-inner">
                <select className="w-full">
                  {professions.map((profession, index) => (
                    <option value="" key={`pro_${index}`}>
                      {profession.name}
                    </option>
                  ))}
                </select>
              </div>
            </div> */}
            <label className="block">
              <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
                Password
              </span>
              <Input type="password" className="mt-1" />
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
