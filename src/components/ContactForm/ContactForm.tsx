import React, { useEffect, useRef, useState } from "react";
import "../../styles/scss/main.scss";
import ContactSidebar from "./ContactSidebar";
import Checkbox from "components/Checkbox/Checkbox";
import "react-phone-number-input/style.css";
import PhoneInput, {
  Country,
  getCountryCallingCode,
  parsePhoneNumber,
} from "react-phone-number-input";
import { Profession, Specialty } from "data/types";
import { API_BACKEND_URL } from "data/api";
import axios from "axios";
import Radio from "components/Radio/Radio";
import { ContactUs } from "../../data/types";
import api from "../../Services/api";
import { useHistory } from "react-router-dom";
// import 'react-intl-tel-input/dist/main.css';
// import IntlTelInput from 'react-intl-tel-input';

const ContactFormSection = ({ productName = "", isEbook = false }) => {
  const [specialties, setSpecialties] = useState<Specialty[]>([]);
  const [professions, setProfessions] = useState<Profession[]>([]);
  const [showInputProfession, setShowInputProfession] = useState(false);
  const [showInputSpecialties, setShowInputSpecialties] = useState(false);
  const [selectedOptionProfession, setSelectedOptionProfession] =
    useState<string>("");
  const [selectedOptionSpecialty, setSelectedOptionSpecialty] =
    useState<string>("");
  const [acceptConditions, setAcceptConditions] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const formRef = useRef<HTMLFormElement>(null);
  let [formSent, setFormSent] = useState(false);

  const history = useHistory();
  const changeRoute = (newRoute: string): void => {
    history.push(newRoute);
  };

  const handlePhoneChange = (value: string) => {
    setPhoneNumber(value);
    console.log(value, typeof value);
    if (typeof value !== "undefined") {
      const parsedPhoneNumber = parsePhoneNumber(value);
      if (parsedPhoneNumber?.country) {
        setSelectedCountry(parsedPhoneNumber.country);
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
        setSpecialties(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    console.log({ formData, target: event.target });

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
    };

    const selectedOption = (event.target as HTMLFormElement).querySelector(
      'input[name="Preferencia_de_contactaci_n"]:checked'
    ) as HTMLInputElement;

    if (selectedOption) {
      const label = selectedOption.id;
      // console.log({label});
      jsonData.Preferencia_de_contactaci_n = label.replace(
        /^Contact_Method_/,
        ""
      );
    }

    formData.forEach((value, key, parent) => {
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
        jsonData.Phone = phoneNumber;
        jsonData.Pais = selectedCountry;
      }
      if (key === "Profesion") {
        jsonData.Profesion = value as string;
      }
      if (key === "Description") {
        jsonData.Description = value as string;
      }
      if (key === "Especialidad") {
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

    console.log(response);
    setFormSent(true);
    resetForm();
    let routeChange = isEbook ? "/gracias?origen=descarga-ebook" : "/gracias?origen=contact";
    changeRoute(routeChange);
  };
  return (
    <>
      <div className="col-span-2" id="contactanos">
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

              <input type="hidden" name="utm_source" disabled />
              <input type="hidden" name="utm_medium" disabled />
              <input type="hidden" name="utm_campaign" disabled />
              <input type="hidden" name="utm_content" disabled />

              <div className={`section-title mb-30`}>
                <h2>
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                      defaultCountry="MX"
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
                    <div className="contact-from-input my-4">
                      <input
                        type="text"
                        name="Otra_profesion"
                        placeholder="Ingresar profesion"
                      />
                    </div>
                  )}
                </div>

                <div className={`col-xl-6`}>
                  <div className="contact-select">
                    <select
                      className=""
                      id="Especialidad"
                      name="Especialidad"
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
                    <div className="contact-from-input my-4">
                      <input
                        type="text"
                        name="Otra_especialidad"
                        placeholder="Ingresar especialidad"
                      />
                    </div>
                  )}
                </div>
              </div>
              {isEbook ? (
                  <>
                  </>
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
                    className="cont-btn "
                    disabled={!acceptConditions}
                  >
                    {isEbook ? 'Descargar' : 'Enviar'}
                  </button>
                </div>
              </div>
              <p
                className="success-message"
                style={{ visibility: formSent ? "visible" : "hidden" }}
              >
                Gracias! Tu mensaje fué enviado correctamente.
              </p>
            </form>
          </div>
        </div>
      </div>
      <div className="">
        <ContactSidebar />
      </div>
    </>
  );
};

export default ContactFormSection;
