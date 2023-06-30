import Button from "components/Button/Button";
import Input from "components/Input/Input";
import Label from "components/Label/Label";
import { ChangeEvent, FC, useState } from "react";
import "react-phone-number-input/style.css";
import PhoneInput, { parsePhoneNumber } from "react-phone-number-input";
import { Contact, Profession, Specialty, User } from "../../../data/types";
import api from "Services/api";

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
  const [isFormComplete, setIsFormComplete] = useState(false);

  const [showInputProfession, setShowInputProfession] = useState(false);
  const [showInputSpecialties, setShowInputSpecialties] = useState(false);
  const [localUser, setLocalUser] = useState<Contact>(user.contact as Contact);
  const [updateStatusMessage, setUpdateStatusMessage] = useState({
    message: "",
    type: "",
  });
  const [selectedOptionProfession, setSelectedOptionProfession] =
    useState<string>(user.contact?.profession || "");
  const [selectedOptionSpecialty, setSelectedOptionSpecialty] =
    useState<string>(user.contact?.speciality || "");
  const [phoneNumber, setPhoneNumber] = useState<string>(
    user?.contact?.phone || ""
  );
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

  const handleOptionProfessionChange = (
    event: ChangeEvent<HTMLSelectElement>
  ) => {
    const { value } = event.target;
    setSelectedOptionProfession(value);
    setShowInputProfession(value === "Otra profesión");
    checkFormCompletion();
  };

  const handleOptionSpecialtyChange = (
    event: ChangeEvent<HTMLSelectElement>
  ) => {
    const { value } = event.target;
    setSelectedOptionSpecialty(value);
    setShowInputSpecialties(value === "Otra Especialidad");
    checkFormCompletion();
  };

  const handleInputChange = (fieldName: string, value: string) => {
    setLocalUser((prevUser: Contact) => ({
      ...prevUser,
      [fieldName]: value,
    }));

    // Verificar si el campo de entrada está vacío
    const isFieldEmpty = value.trim() === "";

    // Comprobar si todos los campos requeridos están completos
    const requiredFields = [
      localUser.name,
      localUser.last_name,
      localUser.email,
      phoneNumber,
      selectedOptionProfession,
      selectedOptionSpecialty,
      localUser.address,
      localUser.country,
      localUser.state,
      localUser.postal_code,
      localUser.rfc,
      localUser.fiscal_regime,
    ];
    const isComplete =
      requiredFields.every((field) => field !== "") && !isFieldEmpty;

    setIsFormComplete(isComplete);
  };

  const submitForm = async (event: any) => {
    event?.preventDefault();
    const profession =
      selectedOptionProfession === "Otra profesión"
        ? localUser.profession
        : selectedOptionProfession;

    const speciality =
      selectedOptionSpecialty === "Otra Especialidad"
        ? localUser.speciality
        : selectedOptionSpecialty;

    const jsonData: Contact = {
      ...localUser,
      profession,
      speciality,
      phone: phoneNumber,
    };
    try {
      const res = await api.updateUserData(jsonData);
      if (res.status === 200) {
        console.log("Se actualizó el usuario correctamente", res.data);
        setUpdateStatusMessage({
          message: "Se actualizó correctamente.",
          type: "success",
        });
      } else {
        console.log("Hubo un error al actualizar el usuario", res);
        setUpdateStatusMessage({
          message: "Hubo un error al actualizar el usuario.",
          type: "error",
        });
      }
    } catch (error) {
      console.log("Hubo un error al actualizar el usuario", error);
      setUpdateStatusMessage({
        message: "Hubo un error al actualizar el usuario.",
        type: "error",
      });
    }
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
    {
      id: "cl",
      name: "Chile",
    },
    {
      id: "ec",
      name: "Ecuador",
    },
  ];

  const checkFormCompletion = () => {
    const requiredFields = [
      localUser.name,
      localUser.last_name,
      localUser.email,
      phoneNumber,
      selectedOptionProfession,
      selectedOptionSpecialty,
      localUser.address,
      localUser.country,
      localUser.state,
      localUser.postal_code,
      localUser.rfc,
      localUser.fiscal_regime,
    ];

    const isComplete = requiredFields.every((field) => field !== "");

    setIsFormComplete(isComplete);
  };

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
            value={localUser?.name}
            onChange={(event) => handleInputChange("name", event.target.value)}
          />
        </label>
        <label className="block">
          <Label>Apellido</Label>
          <Input
            placeholder="Ingresar apellido"
            type="text"
            className="mt-1"
            id="Last_Name"
            name="Last_Name"
            value={localUser?.last_name}
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
            value={localUser?.email}
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
            value={phoneNumber}
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
              value={selectedOptionProfession}
              onChange={handleOptionProfessionChange}
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
            <label className="block">
              <Input
                type="text"
                className="mt-4"
                id="Last_Name"
                name="Otra_profesion"
                placeholder="Ingresar profesion"
                value={localUser?.profession || ""}
                onChange={(event) =>
                  handleInputChange("profession", event.target.value)
                }
              />
            </label>
          )}
        </label>
        <label>
          <Label>Especialidad</Label>
          <div className="profile-contact-select mt-1">
            <select
              className=""
              id="speciality"
              name="speciality"
              value={selectedOptionSpecialty}
              onChange={handleOptionSpecialtyChange}
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
            <label className="block">
              <Input
                type="text"
                className="mt-4"
                id="Last_Name"
                name="Otra_especialidad"
                placeholder="Ingresar especialidad"
                value={localUser?.speciality || ""}
                onChange={(event) =>
                  handleInputChange("speciality", event.target.value)
                }
              />
            </label>
          )}
        </label>
        <span className="dark:text-primary-500 forgot-password col-span-2">
          ¿Necesitas cambiar tu contraseña?{" "}
          <a
            className="nc-NcLink underline text-primary-6000 hover:text-primary-800 dark:text-primary-500 dark:hover:text-primary-6000"
            href="/recuperar"
          >
            Hazlo aquí
          </a>
        </span>

        <label className="block">
          <Label>Dirección</Label>
          <Input
            placeholder="Ingresar dirección"
            type="text"
            className="mt-1"
            id="address"
            name="address"
            value={localUser?.address || ""}
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
              value={localUser?.country}
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
          <Input
            placeholder="Ingresar Provincia"
            type="text"
            className="mt-1"
            value={localUser?.state}
            onChange={(event) => handleInputChange("state", event.target.value)}
          />
        </label>
        <label className="block">
          <Label>Código postal</Label>
          <Input
            placeholder="Ingresar código postal"
            type="text"
            className="mt-1"
            value={localUser?.postal_code}
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
            value={localUser?.rfc}
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
            value={localUser?.fiscal_regime}
            onChange={(event) =>
              handleInputChange("fiscal_regime", event.target.value)
            }
          />
        </label>

        <Button
          className={
            isFormComplete
              ? "md:col-span-2 bg-primary-6000 text-neutral-100"
              : "md:col-span-2 bg-neutral-200 text-neutral-500"
          }
          type="submit"
          disabled={!isFormComplete}
        >
          Guardar cambios
        </Button>
        {updateStatusMessage.message && (
          <p
            className={
              updateStatusMessage.type == "error"
                ? "text-red-500 text-center md:col-span-2"
                : "text-green-500 text-center md:col-span-2"
            }
          >
            {updateStatusMessage.message}
          </p>
        )}
      </form>
    </div>
  );
};

export default DashboardEditProfile;
