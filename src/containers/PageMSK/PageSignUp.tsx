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
  const [acceptConditions, setAcceptConditions] = useState(false);

  const [specialtiesGroup, setSpecialtiesGroup] = useState<Specialty[]>([]);
  const [selectedProfessionId, setSelectedProfessionId] = useState<string>("");
  const [currentGroup, setCurrentGroup] = useState<any>([]);
  const [studentInputs, setStudentInputs] = useState(false);
  const [studentYear, setStudentYear] = useState("");
  const [selectedCareer, setSelectedCareer] = useState("");
  const [formError, setFormError] = useState("");
  const history = useHistory();

  const fetchProfessions = async () => {
    const professionList = await api.getProfessions();
    setProfessions(professionList);
  };
  const fetchSpecialties = async () => {
    const response = await api.getSpecialtiesAndGroups();
    setSpecialties(response.specialities);
    setSpecialtiesGroup(response.specialities_group);
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

  const handleOptionCareerChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { value } = event.target;
    setSelectedCareer(value);
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

  const fullCountry = (country: string): string => {
    return (
      countries.find((c) => c.id === country.toLowerCase())?.name || country
    );
  };
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);

    const jsonData: SignUp = {
      name: "",
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      country: fullCountry(selectedCountry),
      profession: "",
      speciality: "",
      Otra_profesion: "",
      Otra_especialidad: "",
      Career: "",
      Year: "",
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
      "Career",
      "Year",
    ];

    formData.forEach((value, key) => {
      const formDataKey = key as keyof SignUp;
      if (allowedKeys.includes(formDataKey)) {
        if (formDataKey == "profession") {
          const auxVal = value as string;
          const values = auxVal.split("/");
          value = values[0];
          if (value == "Estudiante") {
            jsonData["speciality"] = selectedCareer;
          }
        }
        jsonData[formDataKey] = value as string;
      }
    });
    jsonData.name = `${jsonData.first_name} ${jsonData.last_name}`;
    // console.log({ jsonData });

    try {
      const res = await api.postSignUp(jsonData);
      if (res.status !== 200) {
        setSuccess(false);

        const errorMessages = Object.values(res.response.data.errors)
          .map((errorMessage) => `- ${errorMessage}`)
          .join("<br />");

        setError(
          `Ocurrió un error. Por favor, revisa los campos e inténtalo de nuevo. <br />${errorMessages}`
        );
      } else {
        setError("");
        setSuccess(true);
        setTimeout(() => {
          history.push("/correo-enviado");
        }, 1500);
      }
    } catch (error) {
      console.log(error);
      setError(
        "Ocurrió un error. Por favor, revisa los campos e inténtalo de nuevo."
      );
    }
  };

  const optionsArray = [1, 2, 3, 4, 5];
  const selectOptions = optionsArray.map((y) => (
    <option key={`st_year_${y}`} defaultValue={y}>
      {y}
    </option>
  ));

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

            <div className="">
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
              {showInputProfession && (
                <label className="block">
                  <Input
                    name="Otra_profesion"
                    type="text"
                    placeholder="Ingresar profesion"
                    className="mt-2"
                  />
                </label>
              )}
              {studentInputs ? (
                <div className={`mt-2 grid grid-cols-12 gap-2`}>
                  <div className="profile-contact-select col-span-6">
                    <select id="Year" name="Year" defaultValue={studentYear}>
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
              ) : (
                <>
                  <div className={`col-xl-6 my-6`}>
                    <span>Especialidad</span>
                    <div className="profile-contact-select mt-1">
                      <select
                        className=""
                        id="speciality"
                        name="speciality"
                        value={selectedOptionSpecialty}
                        onChange={handleOptionSpecialtyChange}
                      >
                        <option defaultValue="">
                          Seleccionar especialidad
                        </option>
                        {selectedOptionProfession && currentGroup.length
                          ? currentGroup.map((s: any) => (
                              <option
                                key={`sp_group_${s.id}`}
                                defaultValue={s.name}
                              >
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
                          name="Otra_especialidad"
                          placeholder="Ingresar especialidad"
                        />
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
            <div className="flex flex-wrap gap-4 mt-4">
              <div className="flex text-center gap-1 mx-auto">
                <Checkbox
                  name="telephone"
                  label="Acepto las"
                  value={acceptConditions}
                  useStateCallback={setAcceptConditions}
                />
                <a className="text-primary text-sm underline">
                  condiciones de privacidad
                </a>
              </div>
              <ButtonPrimary
                type="submit"
                className="w-full"
                disabled={!acceptConditions}
              >
                Crear
              </ButtonPrimary>
              {error && (
                <p
                  className="text-red-500 text-center w-full"
                  dangerouslySetInnerHTML={{ __html: error }}
                ></p>
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
