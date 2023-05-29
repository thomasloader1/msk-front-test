import Button from "components/Button/Button";
import Input from "components/Input/Input";
import Label from "components/Label/Label";
import React, { FC, useState } from "react";
import "react-phone-number-input/style.css";
import PhoneInput, {
  Country,
  getCountryCallingCode,
  parsePhoneNumber,
} from "react-phone-number-input";
import { Profession, Specialty, User } from "../../../data/types";

interface Props {
  user: User;
  specialties: Specialty[];
  professions: Profession[];
}

const DashboardEditProfile: FC<Props> = ({
  user,
  specialties,
  professions,
}) => {
  const [showInputProfession, setShowInputProfession] = useState(false);
  const [showInputSpecialties, setShowInputSpecialties] = useState(false);

  const [localUser, setLocalUser] = useState<User>(user as User);

  const [selectedOptionProfession, setSelectedOptionProfession] =
    useState<string>("");
  const [selectedOptionSpecialty, setSelectedOptionSpecialty] =
    useState<string>("");
  const [acceptConditions, setAcceptConditions] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const handlePhoneChange = (value: string) => {
    setPhoneNumber(value);
    if (typeof value !== "undefined") {
      const parsedPhoneNumber = parsePhoneNumber(value);
      if (parsedPhoneNumber?.country) {
        setSelectedCountry(parsedPhoneNumber.country);
      }
    }
  };

  const handleInputChange = (fieldName: string, value: string) => {
    /*setLocalUser((prevUser) => ({
      ...prevUser,
      contact: {
        ...prevUser.contact,
        [fieldName]: value,
      },
    }));*/
  };

  const submitForm = () => {
    event?.preventDefault();
    console.log("submitForm", localUser);
  };

  const countries = [
    {
      id: "mx",
      name: "México",
    },
    {
      id: "ar",
      name: "Argentina",
    },
  ];

  return (
    <div className="rounded-xl md:border md:border-neutral-100 dark:border-neutral-800 md:p-6">
      <form
        className="grid md:grid-cols-2 gap-6 profile-contact-form"
        method="post"
        onSubmit={submitForm}
      >
        <label className="block">
          <Label>Nombre</Label>
          <Input
            placeholder="Ingresar nombre"
            type="text"
            className="mt-1"
            id="name"
            name="name"
            value={localUser?.contact?.name}
            onChange={(event) => handleInputChange("name", event.target.value)}
          />
        </label>
        <label className="block">
          <Label>Apellido</Label>
          <Input
            placeholder="Ingresar apellido"
            type="text"
            className="mt-1"
            id="last_name"
            name="last_name"
            value={localUser?.contact?.last_name}
            onChange={(event) =>
              handleInputChange("last_name", event.target.value)
            }
          />
        </label>
        <label className="block">
          <Label>E-mail</Label>
          <Input
            type="email"
            placeholder="Ingresar e-mail"
            className="mt-1"
            id="email"
            name="email"
            value={localUser?.contact?.email}
            onChange={(event) => handleInputChange("email", event.target.value)}
          />
        </label>
        <label className="block">
          <Label>Teléfono</Label>
          <PhoneInput
            name="Phone"
            id="Phone"
            placeholder="Ingresar número telefónico"
            defaultCountry="MX"
            className="phone-profile-input mt-1"
            value={localUser?.contact?.phone}
            onChange={handlePhoneChange}
          />
        </label>

        <label>
          <Label>Profesión</Label>
          <div className="profile-contact-select mt-1">
            <select
              className=""
              id="profession"
              name="profession"
              value={localUser?.contact?.profession || ""}
              onChange={(event) =>
                handleInputChange("profession", event.target.value)
              }
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
            <div className="contact-from-input my-4">
              <input
                type="text"
                name="Otra_profesion"
                placeholder="Ingresar profesion"
              />
            </div>
          )}
        </label>
        <label>
          <Label>Especialidad</Label>
          <div className="profile-contact-select mt-1">
            <select
              className=""
              id="speciality"
              name="speciality"
              value={localUser?.contact?.speciality || ""}
              onChange={(event) =>
                handleInputChange("speciality", event.target.value)
              }
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
            <div className="contact-from-input my-4">
              <input
                type="text"
                name="Otra_especialidad"
                placeholder="Ingresar especialidad"
              />
            </div>
          )}
        </label>
        <label className="block">
          <Label>Contraseña</Label>
          <Input
            placeholder="Ingresar contraseña"
            type="password"
            className="mt-1 mb-2"
          />
          <span className="dark:text-primary-500 text-sm forgot-password">
            ¿Olvidaste tu contraseña?{" "}
            <a
              className="nc-NcLink text-primary-6000 hover:text-primary-800 dark:text-primary-500 dark:hover:text-primary-6000 text-xs"
              href="/recuperar"
            >
              Restablecer
            </a>
          </span>
        </label>
        <label className="block">
          <Label>Confirmar contraseña</Label>
          <Input
            placeholder="Repetir contraseña"
            type="password"
            className="mt-1"
          />
        </label>

        <label className="block">
          <Label>Dirección</Label>
          <Input
            placeholder="Ingresar dirección"
            type="text"
            className="mt-1"
            id="address"
            name="address"
            value={localUser?.contact?.address || ""}
            onChange={(event) =>
              handleInputChange("address", event.target.value)
            }
          />
        </label>
        <label>
          <Label>País</Label>
          <div className="profile-contact-select mt-1">
            <select
              className=""
              id="country"
              name="country"
              value={localUser?.contact?.country}
              onChange={(event) =>
                handleInputChange("country", event.target.value)
              }
            >
              <option defaultValue="">Seleccionar país</option>
              {countries.map((s) => (
                <option key={s.id} defaultValue={s.name}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>
        </label>
        <label>
          <Label>Provincia</Label>
          <div className="profile-contact-select mt-1">
            <select
              className=""
              id="state"
              name="state"
              value={localUser?.contact?.state}
              onChange={(event) =>
                handleInputChange("state", event.target.value)
              }
            >
              <option defaultValue="">Seleccionar provincia</option>
              {specialties.map((s) => (
                <option key={s.id} defaultValue={s.name}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>
        </label>
        <label className="block">
          <Label>Código postal</Label>
          <Input
            placeholder="Ingresar código postal"
            type="text"
            className="mt-1"
            value={localUser?.contact?.postal_code}
            onChange={(event) =>
              handleInputChange("postal_code", event.target.value)
            }
          />
        </label>
        <label className="block">
          <Label>RFC</Label>
          <Input
            placeholder="Ingresar RFC"
            type="text"
            className="mt-1"
            id="rfc"
            name="rfc"
            value={localUser?.contact?.rfc}
            onChange={(event) => handleInputChange("rfc", event.target.value)}
          />
        </label>
        <label className="block">
          <Label>Régimen fiscal</Label>
          <Input
            placeholder="Ingresar régimen fiscal"
            type="text"
            className="mt-1"
            id="fiscal_regime"
            name="fiscal_regime"
            value={localUser?.contact?.fiscal_regime}
            onChange={(event) =>
              handleInputChange("fiscal_regime", event.target.value)
            }
          />
        </label>

        <Button
          className="md:col-span-2 bg-neutral-200 text-neutral-500"
          type="submit"
        >
          Guardar cambios
        </Button>
      </form>
    </div>
  );
};

export default DashboardEditProfile;
