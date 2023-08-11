import Button from "components/Button/Button";
import Input from "components/Input/Input";
import Label from "components/Label/Label";
import { ChangeEvent, FC, useContext, useEffect, useState } from "react";
import "react-phone-number-input/style.css";
import PhoneInput, { parsePhoneNumber } from "react-phone-number-input";
import { Contact, Profession, Specialty, User } from "../../../data/types";
import api from "Services/api";
import NcLink from "components/NcLink/NcLink";
import { CountryContext } from "context/country/CountryContext";
import { CountryCode } from "libphonenumber-js/types";
interface Props {
  user: User;
}

const DashboardEditProfile: FC<Props> = ({ user }) => {
  const { state } = useContext(CountryContext);
  const [isFormComplete, setIsFormComplete] = useState(false);
  const [showInputProfession, setShowInputProfession] = useState(false);
  const [showInputSpecialties, setShowInputSpecialties] = useState(false);
  const [localUser, setLocalUser] = useState<Contact>(user.contact as Contact);
  const [updateStatusMessage, setUpdateStatusMessage] = useState({
    message: "",
    type: "",
  });
  const [currentStates, setCurrentStates] = useState<string[] | undefined>([]);
  const [selectedOptionProfession, setSelectedOptionProfession] =
    useState<string>(user.contact?.profession || "");
  const [selectedOptionSpecialty, setSelectedOptionSpecialty] =
    useState<string>(user.contact?.speciality || "");
  const [phoneNumber, setPhoneNumber] = useState<string>(
    user?.contact?.phone || ""
  );
  const [specialties, setSpecialties] = useState<Specialty[]>([]);
  const [professions, setProfessions] = useState<Profession[]>([]);
  const [specialtiesGroup, setSpecialtiesGroup] = useState<Specialty[]>([]);
  const [selectedProfessionId, setSelectedProfessionId] = useState<string>("");
  const [currentGroup, setCurrentGroup] = useState<any>([]);
  const [studentInputs, setStudentInputs] = useState(false);
  const [studentYear, setStudentYear] = useState();
  const [selectedCareer, setSelectedCareer] = useState("");
  const [selectedCountry, setSelectedCountry] = useState<string>("");

  const fetchProfessions = async () => {
    const professionList = await api.getProfessions();
    setProfessions(professionList);
  };
  const fetchSpecialties = async () => {
    const response = await api.getSpecialtiesAndGroups();
    setSpecialties(response.specialities);
    setSpecialtiesGroup(response.specialities_group);
  };

  const handleOptionCareerChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { value } = event.target;
    setSelectedCareer(value);
    checkFormCompletion();
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

  const handleOptionProfessionChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { value } = event.target;
    if (value && value.length) {
      const values = value.split("/");
      const profession = values[0];
      const id = values[1];
      setSelectedOptionProfession(profession);
      setSelectedProfessionId(id);
      setShowInputProfession(profession === "Otra profesión");
      setStudentInputs(profession === "Estudiante");
      const groups =
        specialtiesGroup[parseInt(id) as keyof typeof specialtiesGroup];
      setCurrentGroup([]);
      setCurrentGroup(groups);
    } else {
      setSelectedOptionProfession("");
      setSelectedProfessionId("");
    }
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

    if (fieldName == "country") {
      getStates(value);
    }

    const isFieldEmpty = value.trim() === "";
    let identification = null;

    switch (localUser.country) {
      case "Argentina":
        identification = localUser.dni;
        break;
      case "Chile":
        identification = localUser.rut;
        break;
      default:
        identification = localUser.rfc;
        break;
    }

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
      identification,
      localUser.fiscal_regime,
      localUser.state,
      selectedOptionProfession.includes("Otra ")
        ? localUser?.other_profession
        : null,
      selectedOptionSpecialty.includes("Otra ")
        ? localUser?.other_speciality
        : null,
    ];

    const isComplete =
      requiredFields.every((field) => field !== "") && !isFieldEmpty;
    setIsFormComplete(isComplete);
  };

  const submitForm = async (event: any) => {
    event?.preventDefault();
    const profession =
      selectedOptionProfession === "Otra profesión"
        ? "Otra profesión"
        : selectedOptionProfession;

    const speciality =
      selectedOptionSpecialty === "Otra Especialidad"
        ? "Otra Especialidad"
        : selectedOptionSpecialty;

    const otherInputs = {
      other_profession:
        selectedOptionProfession !== "Otra profesión"
          ? ""
          : localUser.other_profession,
      other_speciality:
        selectedOptionSpecialty !== "Otra Especialidad"
          ? ""
          : localUser.other_speciality,
    };

    const jsonData: Contact = {
      ...localUser,
      ...otherInputs,
      profession,
      speciality,
      phone: phoneNumber,
      Career: selectedCareer,
      Year: studentYear,
    };
    try {
      const res = await api.updateUserData(jsonData);
      if ((res?.status as number) === 200) {
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

  useEffect(() => {
    const hasOtherProfession = selectedOptionProfession.includes("Otra ");
    const hasOtherSpeciality = selectedOptionSpecialty.includes("Otra ");
    setShowInputProfession(hasOtherProfession);
    setShowInputSpecialties(hasOtherSpeciality);

    return () => {
      setLocalUser((prevState) => ({
        ...prevState,
        other_profession: hasOtherProfession ? localUser.other_profession : "",
        other_speciality: hasOtherSpeciality ? localUser.other_speciality : "",
      }));
    };
  }, [selectedOptionProfession, selectedOptionSpecialty]);

  const getStates = async (country: string) => {
    const res = await api.getStatesFromCountry(country);
    setCurrentStates(res);
  };

  useEffect(() => {
    const selectedProfession = professions.find(
      (profession) => profession.name === selectedOptionProfession
    );
    if (selectedProfession) {
      setSelectedProfessionId(selectedProfession.id.toString());
    }
    setStudentInputs(selectedOptionProfession === "Estudiante");
  }, [selectedOptionProfession, professions]);

  const renderInputIdentification = () => {
    if (!localUser) return <></>;
    switch (localUser.country) {
      case "México":
        return (
          <>
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
          </>
        );
      case "Chile":
        return (
          <>
            <Label>RUT</Label>
            <Input
              placeholder="Ingresar RUT"
              type="text"
              className="mt-1"
              id="rut"
              name="rut"
              value={localUser?.rut}
              onChange={(event) => handleInputChange("rut", event.target.value)}
            />
          </>
        );
      default:
        return (
          <>
            <Label>DNI</Label>
            <Input
              placeholder="Ingresar DNI"
              type="text"
              className="mt-1"
              id="dni"
              name="dni"
              value={localUser?.dni}
              onChange={(event) => handleInputChange("dni", event.target.value)}
            />
          </>
        );
    }
  };

  const onChangeStudentYear = (e: any) => {
    setStudentYear(e.target.value);
  };

  useEffect(() => {
    if (localUser && localUser.country) {
      getStates(localUser.country);
    }
  }, [localUser]);

  const optionsArray = [1, 2, 3, 4, 5];
  const selectOptions = optionsArray.map((y) => (
    <option key={`st_year_${y}`} defaultValue={y}>
      {y}
    </option>
  ));

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

        <div className="grid grid-cols-2 col-span-2 gap-6">
          <div className="col-span-1">
            <span>Profesión</span>
            <div className="profile-contact-select mt-1">
              <select
                className=""
                id="profession"
                name="profession"
                value={`${selectedOptionProfession}/${selectedProfessionId}`}
                onChange={handleOptionProfessionChange}
              >
                <option defaultValue="" value="">
                  Seleccionar profesión
                </option>
                {professions
                  ? professions.map((p: Profession) => (
                      <option key={p.id} value={`${p.name}/${p.id}`}>
                        {p.name}
                      </option>
                    ))
                  : ""}
              </select>
            </div>
          </div>
          {showInputProfession && (
            <label className="block">
              <Input
                name="Otra_profesion"
                id="Otra_profesion"
                type="text"
                placeholder="Ingresar profesion"
                className="mt-7"
              />
            </label>
          )}
          {studentInputs ? (
            <div>
              <div className={`grid grid-cols-12 gap-2 mt-7`}>
                <div className="profile-contact-select col-span-6">
                  <select
                    id="Year"
                    name="Year"
                    defaultValue={studentYear}
                    onChange={(e) => onChangeStudentYear(e)}
                  >
                    <option defaultValue="">Seleccionar año</option>
                    {selectOptions}
                  </select>
                </div>
                <div className="profile-contact-select col-span-6">
                  <select
                    id="Career"
                    name="Career"
                    value={selectedCareer}
                    onChange={handleOptionCareerChange}
                  >
                    <option defaultValue="">Seleccionar carrera</option>
                    {currentGroup.map((s: any) => (
                      <option key={`st_carrer_${s.id}`} defaultValue={s.name}>
                        {s.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          ) : (
            <div className="col-span-1">
              <span>Especialidad</span>
              <div className="profile-contact-select mt-1">
                <select
                  className=""
                  id="speciality"
                  name="speciality"
                  value={selectedOptionSpecialty}
                  onChange={handleOptionSpecialtyChange}
                >
                  <option defaultValue="">Seleccionar especialidad</option>
                  {selectedOptionProfession && currentGroup.length
                    ? currentGroup.map((s: any) => (
                        <option key={`sp_group_${s.id}`} defaultValue={s.name}>
                          {s.name}
                        </option>
                      ))
                    : specialties.map((s: Specialty) => (
                        <option key={`sp_${s.id}`} defaultValue={s.name}>
                          {s.name}
                        </option>
                      ))}
                </select>
              </div>
              {showInputSpecialties && (
                <div className="contact-from-input my-4">
                  <input
                    type="text"
                    id="Otra_especialidad"
                    name="Otra_especialidad"
                    placeholder="Ingresar especialidad"
                  />
                </div>
              )}
            </div>
          )}
        </div>
        <span className="dark:text-primary-500 forgot-password col-span-2">
          ¿Necesitas cambiar tu contraseña?{" "}
          <NcLink
            to="/recuperar"
            className="nc-NcLink underline text-primary-6000 hover:text-primary-800 dark:text-primary-500 dark:hover:text-primary-6000"
          >
            Hazlo aquí
          </NcLink>
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
                <option key={s.id} value={s.name}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>
        </label>
        <label>
          <Label>Provincia</Label>
          <div className="profile-contact-select mt-1">
            {currentStates ? (
              <select
                className=""
                id="state"
                name="state"
                value={localUser?.state}
                onChange={(event) =>
                  handleInputChange("state", event.target.value)
                }
              >
                <option defaultValue="">Seleccionar provincia</option>
                {currentStates.map((s) => (
                  <option key={`state_${s}`} defaultValue={s}>
                    {s}
                  </option>
                ))}
              </select>
            ) : (
              <Input
                placeholder="Ingresar Provincia"
                type="text"
                className="mt-1"
                value={localUser?.state}
                onChange={(event) =>
                  handleInputChange("state", event.target.value)
                }
              />
            )}
          </div>
          {/* <Input
            placeholder="Ingresar Provincia"
            type="text"
            className="mt-1"
            value={localUser?.state}
            onChange={(event) => handleInputChange("state", event.target.value)}
          /> */}
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
        <label className="block">{renderInputIdentification()}</label>
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
            "md:col-span-2 bg-primary-6000 text-white disabled:bg-grey-disabled disabled:cursor-not-allowed"
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
