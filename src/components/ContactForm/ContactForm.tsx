import React, {
  useContext,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import "../../styles/scss/main.scss";
import ContactSidebar from "./ContactSidebar";
import Checkbox from "components/Checkbox/Checkbox";
import "react-phone-number-input/style.css";
import PhoneInput, {
  parsePhoneNumber,
  getCountries,
} from "react-phone-number-input";
import { Profession, Specialty } from "data/types";
import { API_BACKEND_URL } from "data/api";
import axios from "axios";
import Radio from "components/Radio/Radio";
import { ContactUs } from "../../data/types";
import api from "../../Services/api";
import { useHistory } from "react-router-dom";
import { getName } from "country-list";
import { CountryContext } from "context/country/CountryContext";
import { CountryCode } from "libphonenumber-js/types";
import { useUTMContext } from "context/utm/UTMContext";
import { UTMAction, utmReducer } from "context/utm/UTMReducer";

const ContactFormSection = ({
  hideHeader = false,
  productName = "",
  isEbook = false,
}) => {
  const { state } = useContext(CountryContext);
  const [specialties, setSpecialties] = useState<Specialty[]>([]);
  const [specialtiesGroup, setSpecialtiesGroup] = useState<Specialty[]>([]);
  const [professions, setProfessions] = useState<Profession[]>([]);
  const [showInputProfession, setShowInputProfession] = useState(false);
  const [showInputSpecialties, setShowInputSpecialties] = useState(false);
  const [selectedOptionProfession, setSelectedOptionProfession] =
    useState<string>("");
  const [selectedProfessionId, setSelectedProfessionId] = useState<string>("");
  const [currentGroup, setCurrentGroup] = useState<any>([]);
  const [selectedOptionSpecialty, setSelectedOptionSpecialty] =
    useState<string>("");
  const [selectedCareer, setSelectedCareer] = useState("");
  const [acceptConditions, setAcceptConditions] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [formSent, setFormSent] = useState(false);
  const [studentYear, setStudentYear] = useState("");
  const [studentInputs, setStudentInputs] = useState(false);
  const [formError, setFormError] = useState("");
  const { utm_source, utm_medium, utm_campaign, utm_content } = useUTMContext();
  const formRef = useRef<HTMLFormElement>(null);
  const [utmState, dispatchUTM] = useReducer(utmReducer, {
    utm_source,
    utm_medium,
    utm_campaign,
    utm_content,
  });

  const history = useHistory();
  const changeRoute = (newRoute: string): void => {
    history.push(newRoute);
  };

  const handlePhoneChange = (value: string) => {
    if (typeof value !== "undefined") {
      const parsedPhoneNumber = parsePhoneNumber(value);
      if (parsedPhoneNumber?.country) {
        const country = getName(parsedPhoneNumber.country) as string;
        setSelectedCountry(country);
        setPhoneNumber(value);
      }
    }
  };

  const resetForm = () => {
    if (formRef.current) {
      formRef.current.reset();
      setPhoneNumber("");
      setShowInputProfession(false);
      setShowInputSpecialties(false);
      setAcceptConditions(false);
      setSelectedOptionProfession("");
      setSelectedOptionSpecialty("");
      setSelectedCountry("");
      setStudentYear("");
      setSelectedCareer("");
      setFormSent(false);
      setFormError("");
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
      setCurrentGroup(groups);
    } else {
      setSelectedOptionProfession("");
      setSelectedProfessionId("");
    }
  };

  useEffect(() => {
    axios
      .get(`${API_BACKEND_URL}/professions`)
      .then((response) => {
        setProfessions(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(`${API_BACKEND_URL}/specialities`)
      .then((response) => {
        setSpecialties(response.data.specialities);
        setSpecialtiesGroup(response.data.specialities_group);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const clearUTMAction: UTMAction = {
    type: "CLEAR_UTM",
    payload: {},
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);

    const jsonData: ContactUs = {
      First_Name: "",
      Last_Name: "",
      Email: "",
      Profesion: "",
      Description: "",
      Especialidad: "",
      Phone: "",
      Preferencia_de_contactaci_n: "",
      Pais: "",
      utm_source: "",
      utm_medium: "",
      utm_campaign: "",
      utm_content: "",
      Year: "",
      Career: "",
      recaptcha_token: import.meta.env.VITE_RECAPTCHA_PK,
    };

    const selectedOption = (event.target as HTMLFormElement).querySelector(
      'input[name="Preferencia_de_contactaci_n"]:checked'
    ) as HTMLInputElement;

    if (selectedOption) {
      const label = selectedOption.id;
      jsonData.Preferencia_de_contactaci_n = label.replace(
        /^Contact_Method_/,
        ""
      );
    }

    formData.forEach((value: FormDataEntryValue, key: string) => {
      if (key === "First_Name") {
        jsonData.First_Name = value as string;
      }
      if (key === "Last_Name") {
        jsonData.Last_Name = value as string;
      }
      if (key === "Email") {
        jsonData.Email = value as string;
      }
      if (key === "Phone") {
        console.log({ selectedCountry });
        jsonData.Phone = phoneNumber;
        jsonData.Pais = selectedCountry;
      }
      if (key === "Profesion" && !value.toString().includes("Seleccionar")) {
        const values = value.toString().split("/");
        jsonData.Profesion = values[0];
      }
      if (key === "Year") {
        jsonData.Year = value as string;
      }
      if (key === "Career") {
        jsonData.Career = value as string;
      }
      if (key === "Description") {
        jsonData.Description = value as string;
      }
      if (key === "Especialidad" && !value.toString().includes("Seleccionar")) {
        jsonData.Especialidad = value as string;
      }
      if (key === "Otra_especialidad") {
        jsonData.Otra_especialidad = value as string;
      }
      if (key === "Otra_profesion") {
        jsonData.Otra_profesion = value as string;
      }
      if (key === "Cursos_consultados" && productName !== "") {
        jsonData.Cursos_consultados = productName;
      }
      if (key === "utm_source") {
        jsonData.utm_source = value as string;
      }
      if (key === "utm_medium") {
        jsonData.utm_medium = value as string;
      }
      if (key === "utm_campaign") {
        jsonData.utm_campaign = value as string;
      }
      if (key === "utm_content") {
        jsonData.utm_content = value as string;
      }
    });

    console.log({ jsonData });

    const { response } = await api.postContactUs(jsonData);
    if (response.status === 200) {
      setFormSent(true);
      resetForm();
      dispatchUTM(clearUTMAction);

      let routeChange = isEbook
        ? "/gracias?origen=descarga-ebook"
        : "/gracias?origen=contact";
      changeRoute(routeChange);
    } else {
      setFormError("Hubo un error al enviar el formulario, revise los campos");
    }
  };

  const optionsArray = [1, 2, 3, 4, 5];
  const selectOptions = optionsArray.map((y) => (
    <option key={`st_year_${y}`} defaultValue={y}>
      {y}
    </option>
  ));

  return (
    <>
      <div className="col-span-3" id="contactanos">
        <div className="contact-area-wrapper">
          <div className="contact-form">
            <form
              onSubmit={handleSubmit}
              action="/leads"
              className=""
              autoComplete="off"
              ref={formRef}
            >
              <input
                type="hidden"
                name="Cursos_consultados"
                id="Cursos_consultados"
                value={productName}
              />

              <input type="hidden" name="utm_source" value={utm_source} />
              <input type="hidden" name="utm_medium" value={utm_medium} />
              <input type="hidden" name="utm_campaign" value={utm_campaign} />
              <input type="hidden" name="utm_content" value={utm_content} />

              {hideHeader ? null : (
                <div className={`section-title mb-30`}>
                  <h2 className="font-medium">
                    {isEbook
                      ? "Completa tus datos y obtén la guía ahora"
                      : "Contáctanos"}
                  </h2>
                  <div className="flex flex-wrap gap-6 preferences">
                    <p className="talk-through w-full md:w-auto">
                      Quiero hablar por
                    </p>
                    <div className="mt-1 grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Radio
                        name="Preferencia_de_contactaci_n"
                        label="Teléfono"
                        id="Contact_Method_Teléfono"
                      />
                      <Radio
                        name="Preferencia_de_contactaci_n"
                        label="E-mail"
                        id="Contact_Method_E-mail"
                      />
                      <Radio
                        name="Preferencia_de_contactaci_n"
                        label="WhatsApp"
                        id="Contact_Method_Whatsapp"
                      />
                    </div>
                  </div>
                </div>
              )}
              <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="grid grid-cols-1 md:grid-cols-2 col-span-2 gap-4">
                  <div className="col-xl-6">
                    <div className="contact-from-input">
                      <input
                        type="text"
                        id="First_Name"
                        name="First_Name"
                        placeholder="Ingresar nombre"
                      />
                    </div>
                  </div>
                  <div className="col-xl-6">
                    <div className="contact-from-input">
                      <input
                        type="text"
                        id="Last_Name"
                        name="Last_Name"
                        placeholder="Ingresar apellido"
                      />
                    </div>
                  </div>
                  <div className="col-xl-6">
                    <div className="contact-from-input ">
                      <input
                        type="text"
                        id="Email"
                        name="Email"
                        placeholder="Ingresar e-mail"
                      />
                    </div>
                  </div>

                  <div className="col-xl-6">
                    <div className="contact-from-input intl-input phone-contact-input-select">
                      <PhoneInput
                        name="Phone"
                        id="Phone"
                        placeholder="Ingresar número telefónico"
                        defaultCountry={
                          state.country.toUpperCase() as CountryCode
                        }
                        className="phone-contact-input"
                        value={phoneNumber}
                        onChange={handlePhoneChange}
                      />
                    </div>
                  </div>

                  <div className={`col-xl-6`}>
                    <div className="contact-select">
                      <select
                        className=""
                        id="Profesion"
                        name="Profesion"
                        value={`${selectedOptionProfession}/${selectedProfessionId}`}
                        onChange={handleOptionProfessionChange}
                      >
                        <option defaultValue="" value="">
                          Seleccionar profesión
                        </option>
                        {professions
                          ? professions.map((p) => (
                              <option key={p.id} value={`${p.name}/${p.id}`}>
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
                  </div>

                  {studentInputs ? (
                    <div className={`col-xl-6`}>
                      <div className="contact-select grid grid-cols-11 gap-2">
                        <select
                          className="col-span-5"
                          id="Year"
                          name="Year"
                          defaultValue={studentYear}
                        >
                          <option defaultValue="">Seleccionar año</option>
                          {selectOptions}
                        </select>
                        <select
                          className="col-span-6"
                          id="Career"
                          name="Career"
                          value={selectedCareer}
                          onChange={handleOptionCareerChange}
                        >
                          <option defaultValue="">Seleccionar carrera</option>
                          {currentGroup.map((s: any) => (
                            <option
                              key={`st_carrer_${s.id}`}
                              defaultValue={s.name}
                            >
                              {s.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className={`col-xl-6`}>
                        <div className="contact-select">
                          <select
                            className=""
                            id="Especialidad"
                            name="Especialidad"
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
                              : specialties.map((s) => (
                                  <option
                                    key={`sp_${s.id}`}
                                    defaultValue={s.name}
                                  >
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
                  <div className="col-span-2">
                    {isEbook ? (
                      <></>
                    ) : (
                      <div className="col-xl-12 mt-4">
                        <div className="contact-from-input">
                          <textarea
                            placeholder="Mensaje"
                            id="Message"
                            name="Description"
                          ></textarea>
                        </div>
                      </div>
                    )}
                    <div className="flex flex-wrap gap-1 mt-2 mb-4">
                      <Checkbox
                        name="Terms_And_Conditions"
                        value={acceptConditions}
                        useStateCallback={setAcceptConditions}
                        label="Acepto las"
                      />
                      <a className="text-primary text-sm">
                        condiciones de privacidad
                      </a>
                    </div>

                    <div className="col-xl-2 mt-2">
                      <div className="cont-btn ">
                        <button
                          type="submit"
                          className="cont-btn disabled:bg-grey-disabled"
                          disabled={!acceptConditions}
                        >
                          {isEbook ? "Descargar" : "Enviar"}
                        </button>
                      </div>
                    </div>
                    <p
                      className="text-red-500 font-bold"
                      style={{ visibility: formError ? "visible" : "hidden" }}
                    >
                      {formError}
                    </p>
                    <p
                      className="success-message"
                      style={{ visibility: formSent ? "visible" : "hidden" }}
                    >
                      Gracias! Tu mensaje fué enviado correctamente.
                    </p>
                  </div>
                </div>
                <div className="col-span-2 md:col-span-1">
                  <ContactSidebar />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactFormSection;
