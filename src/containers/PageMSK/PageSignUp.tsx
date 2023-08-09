import React, { FC, useEffect, useState } from "react";
import LayoutPage from "components/LayoutPage/LayoutPage";
import Input from "components/Input/Input";
import ButtonPrimary from "components/Button/ButtonPrimary";
import { Helmet } from "react-helmet";
import Checkbox from "components/Checkbox/Checkbox";
import { Profession, SignUp, Specialty } from "../../data/types";
import api from "../../Services/api";
import PhoneInput from "react-phone-number-input";
import { parsePhoneNumber } from "react-phone-number-input";
import { useHistory } from "react-router-dom";

export interface PageSignUpProps {
  className?: string;
}

const PageSignUp: FC<PageSignUpProps> = ({ className = "" }) => {
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [selectedOptionSpecialty, setSelectedOptionSpecialty] = useState("");
  const [selectedOptionProfession, setSelectedOptionProfession] = useState("");
  const [showInputProfession, setShowInputProfession] = useState(false);
  const [showInputSpecialties, setShowInputSpecialties] = useState(false);
  const [specialties, setSpecialties] = useState<Specialty[]>([]);
  const [professions, setProfessions] = useState<Profession[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const history = useHistory();

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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    // console.log({ formData, target: event.target });
    const jsonData: SignUp = {
      name: "",
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      country: selectedCountry,
      profession: "",
      speciality: "",
      Otra_profesion: "",
      Otra_especialidad: "",
    };

    const allowedKeys: (keyof SignUp)[] = [
      "name",
      "first_name",
      "last_name",
      "email",
      "phone",
      "country",
      "profession",
      "speciality",
      "Otra_profesion",
      "Otra_especialidad",
    ];

    formData.forEach((value, key) => {
      const formDataKey = key as keyof SignUp;
      if (allowedKeys.includes(formDataKey)) {
        jsonData[formDataKey] = value as string;
      }
    });
    jsonData.name = `${jsonData.first_name} ${jsonData.last_name}`;
    console.log({ jsonData });

    try {
      const res = await api.postSignUp(jsonData);
      if (res.status !== 200) {
        setSuccess(false);
        setError(
          `Ocurrió un error. Por favor, revisa los campos e inténtalo de nuevo.`
        );
      } else {
        setError("");
        setSuccess(true);
        setTimeout(() => {
          history.push("/iniciar-sesion");
        }, 1500);
      }
    } catch (error) {
      console.log(error);
      setError(
        "Ocurrió un error. Por favor, revisa los campos e inténtalo de nuevo."
      );
    }
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
                name="phone"
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
              {error && (
                <p className="text-red-500 text-center w-full">{error}</p>
              )}

              {success ? (
                <p className="text-green-500 text-center w-full">
                  Registrado correctamente!
                </p>
              ) : (
                <div className="flex flex-wrap gap-4 mt-4">
                  {/* ... existing code ... */}
                </div>
              )}
            </div>
          </form>
        </div>
      </LayoutPage>
    </div>
  );
};

export default PageSignUp;
