import React, { FC, useEffect, useState } from "react";
import LayoutPage from "components/LayoutPage/LayoutPage";
import Input from "components/Input/Input";
import ButtonPrimary from "components/Button/ButtonPrimary";
import NcLink from "components/NcLink/NcLink";
import { Helmet } from "react-helmet";
import axios from "axios";
import Checkbox from "components/Checkbox/Checkbox";
import { Login, Profession, SignUp, Specialty } from "../../data/types";
import api from "../../Services/api";
import Label from "components/Label/Label";
import PhoneInput from "react-phone-number-input";
import { parsePhoneNumber } from "react-phone-number-input";

export interface PageSignUpProps {
  className?: string;
}

const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  const formData = new FormData(event.target as HTMLFormElement);
  console.log({ formData, target: event.target });
  const jsonData: SignUp = {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    phone: "",
  };

  const allowedKeys: (keyof SignUp)[] = [
    "first_name",
    "last_name",
    "email",
    "password",
    "phone",
  ];

  formData.forEach((value, key) => {
    const formDataKey = key as keyof SignUp;
    if (allowedKeys.includes(formDataKey)) {
      jsonData[formDataKey] = value as string;
    }
  });
  console.log(jsonData);

  const { response } = await api.postSignUp(jsonData);
  console.log(response);

  if (response.data.status != 200) {
    console.log("error");
  } else {
    console.log("login");
  }

  //changeRoute("/gracias?origen=contact")
};
const PageSignUp: FC<PageSignUpProps> = ({ className = "" }) => {
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [selectedOptionSpecialty, setSelectedOptionSpecialty] = useState("");
  const [selectedOptionProfession, setSelectedOptionProfession] = useState("");
  const [showInputProfession, setShowInputProfession] = useState(false);
  const [showInputSpecialties, setShowInputSpecialties] = useState(false);
  const [specialties, setSpecialties] = useState<Specialty[]>([]);
  const [professions, setProfessions] = useState<Profession[]>([]);

  const fetchProfessions = async () => {
    const professionList = await api.getProfessions();
    setProfessions(professionList);
  };
  const fetchSpecialties = async () => {
    const specialtyList = await api.getSpecialties();
    setSpecialties(specialtyList);
  };

  useEffect(() => {
    fetchProfessions();
    fetchSpecialties();
  }, []);

  const handlePhoneChange = (value: string) => {
    setPhoneNumber(value);
    if (typeof value !== "undefined") {
      const parsedPhoneNumber = parsePhoneNumber(value);
      if (parsedPhoneNumber?.country) {
        setSelectedCountry(parsedPhoneNumber.country);
      }
    }
  };

  const handleOptionSpecialtyChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { value } = event.target;
    setSelectedOptionSpecialty(value);
    setShowInputSpecialties(value === "Otra Especialidad");
  };

  const handleOptionProfessionChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { value } = event.target;
    setSelectedOptionProfession(value);
    setShowInputProfession(value === "Otra profesión");
  };
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
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 gap-6"
            method="post"
          >
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
              <PhoneInput
                name="Phone"
                id="Phone"
                placeholder="Ingresar número telefónico"
                defaultCountry="MX"
                className="phone-profile-input mt-1"
                value={""}
                onChange={handlePhoneChange}
              />
            </label>

            <label>
              <span>Profesión</span>
              <div className="profile-contact-select mt-1">
                <select
                  className=""
                  id="profession"
                  name="profession"
                  value={selectedOptionProfession}
                  onChange={(event) => handleOptionProfessionChange(event)}
                >
                  <option defaultValue="">Seleccionar profesión</option>
                  {professions
                    ? professions.map((p) => (
                        <option key={p.id} value={p.name}>
                          {p.name}
                        </option>
                      ))
                    : ""}
                </select>
              </div>
              {showInputProfession && (
                <div className="my-4">
                  <Input
                    type="text"
                    name="Otra_profesion"
                    placeholder="Ingresar profesion"
                  />
                </div>
              )}
            </label>
            <label>
              <span>Especialidad</span>
              <div className="profile-contact-select mt-1">
                <select
                  className=""
                  id="speciality"
                  name="speciality"
                  value={selectedOptionSpecialty}
                  onChange={(event) => handleOptionSpecialtyChange(event)}
                >
                  <option defaultValue="">Seleccionar especialidad</option>
                  {specialties.map((s) => (
                    <option key={s.id} defaultValue={s.name}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </div>
              {showInputSpecialties && (
                <div className="my-4">
                  <Input
                    type="text"
                    name="Otra_especialidad"
                    placeholder="Ingresar especialidad"
                  />
                </div>
              )}
            </label>
            <div className="flex flex-wrap gap-4 mt-4">
              <div className="flex text-center gap-1 mx-auto">
                <Checkbox name="telephone" label="Acepto las" />
                <a className="text-primary text-sm underline">
                  condiciones de privacidad
                </a>
              </div>
              <ButtonPrimary type="submit" className="w-full">
                Crear
              </ButtonPrimary>
            </div>
          </form>
        </div>
      </LayoutPage>
    </div>
  );
};

export default PageSignUp;
