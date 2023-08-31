import React, {
  useContext,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";

import "../../styles/scss/main.scss";
import ContactSidebar from "./ContactSidebar";
import "react-phone-number-input/style.css";
import PhoneInput, { parsePhoneNumber } from "react-phone-number-input";
import { Profession, Specialty } from "data/types";
import { API_BACKEND_URL } from "data/api";
import axios from "axios";
import Radio from "components/Radio/Radio";
import api from "../../Services/api";
import { useHistory } from "react-router-dom";
import { getName } from "country-list";
import { CountryContext } from "context/country/CountryContext";
import { CountryCode } from "libphonenumber-js/types";
import { utmInitialState, utmReducer } from "context/utm/UTMReducer";
import { useRecaptcha } from "hooks/useRecaptcha";
import { UTMAction } from "context/utm/UTMContext";
import { ErrorMessage, Field, Form, FormikProvider, useFormik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  First_Name: Yup.string().required("El nombre es requerido"),
  Last_Name: Yup.string().required("El apellido es requerido"),
  Email: Yup.string()
    .email("Correo electrónico inválido")
    .required("El correo electrónico es requerido"),
  Phone: Yup.string().required("El teléfono es requerido"),
  Description: Yup.string().required("El mensaje es requerido"),
  Profesion: Yup.string().required("La profesión es requerida"),
  Especialidad: Yup.string().required("La especialidad es requerida"),
  // Otra_profesion: Yup.string().when("Profesion", {
  //   is: "Otra profesión",
  //   then: Yup.string().required("La profesión es requerida"),
  //   otherwise: Yup.string().notRequired(),
  // }),

  // year: Yup.string().when("Profesion", {
  //   is: "Estudiante",
  //   then: Yup.string().required("El año es requerido"),
  //   otherwise: Yup.string().notRequired(),
  // }),

  // Otra_especialidad: Yup.string().when("Especialidad", {
  //   is: "Otra Especialidad",
  //   then: Yup.string().required("La especialidad es requerida"),
  //   otherwise: Yup.string().notRequired(),
  // }),
  Terms_And_Conditions: Yup.boolean().oneOf(
    [true],
    "Debes aceptar los términos y condiciones"
  ),
});

const ContactFormSection = ({
  hideHeader = false,
  productName = "",
  isEbook = false,
}) => {
  const [captchaValue, setCaptchaValue] = useState("");
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
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [formSent, setFormSent] = useState(false);
  const [studentInputs, setStudentInputs] = useState(false);
  const [formError, setFormError] = useState("");
  const [utmState, dispatchUTM] = useReducer(utmReducer, utmInitialState);
  const { recaptchaResponse, refreshRecaptcha } = useRecaptcha("submit");
  const formRef = useRef<HTMLFormElement>(null);
  const initialValues = {
    First_Name: "",
    Last_Name: "",
    Email: "",
    Profesion: "",
    Description: "",
    Especialidad: "",
    Phone: "",
    Preferencia_de_contactaci_n: "",
    Pais: "",
    utm_source: utmState.utm_source,
    utm_medium: utmState.utm_medium,
    utm_campaign: utmState.utm_campaign,
    utm_content: utmState.utm_content,
    Terms_And_Conditions: false,
    year: "",
    career: "",
    recaptcha_token: captchaValue,
  };

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
        formik.setFieldValue("Pais", country);
      }
    }
  };

  const resetForm = () => {
    if (formRef.current) {
      formRef.current.reset();
    }
  };

  const handleOptionSpecialtyChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { value } = event.target;
    setSelectedOptionSpecialty(value);
    formik.values.Especialidad = value;
    setShowInputSpecialties(value === "Otra Especialidad");
  };

  const handleOptionCareerChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { value } = event.target;
    formik.values.career = value;

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
      formik.values.Profesion = profession;
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
    payload: {} as any,
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      console.log("Form values:", values);
      try {
        const response = await api.postContactUs(values);
        // @ts-ignore
        if (response.status === 200) {
          let routeChange = isEbook
            ? "/gracias?origen=descarga-ebook"
            : "/gracias?origen=contact";

          setFormSent(true);
          resetForm();
          dispatchUTM(clearUTMAction);
          setTimeout(() => {
            changeRoute(routeChange);
          }, 100);
        } else {
          setFormError(
            "Hubo un error al enviar el formulario, revise los campos"
          );
        }
      } catch (error) {
        console.error("Error al ejecutar reCAPTCHA:", error);
      } finally {
        refreshRecaptcha();
      }
    },
  });

  const optionsArray = [1, 2, 3, 4, 5];

  const handleContactPreferenceChange = (value: string) => {
    formik.setFieldValue("Preferencia_de_contactaci_n", value);
  };

  return (
    <>
      <div className="col-span-3" id="contactanos">
        <div className="contact-area-wrapper">
          <div className="contact-form">
            <FormikProvider value={formik}>
              <Form
                onSubmit={formik.handleSubmit}
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
                          onChange={() =>
                            handleContactPreferenceChange(
                              "Contact_Method_Teléfono"
                            )
                          }
                        />
                        <Radio
                          name="Preferencia_de_contactaci_n"
                          label="E-mail"
                          id="Contact_Method_E-mail"
                          onChange={() =>
                            handleContactPreferenceChange(
                              "Contact_Method_E-mail"
                            )
                          }
                        />
                        <Radio
                          name="Preferencia_de_contactaci_n"
                          label="WhatsApp"
                          id="Contact_Method_Whatsapp"
                          onChange={() =>
                            handleContactPreferenceChange(
                              "Contact_Method_Whatsapp"
                            )
                          }
                        />
                      </div>
                    </div>
                  </div>
                )}
                <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 col-span-2 gap-4">
                    <div className="col-xl-6 col-span-2 md:col-span-1">
                      <div className="contact-from-input">
                        <Field
                          type="text"
                          name="First_Name"
                          placeholder="Nombre"
                        />
                        <ErrorMessage
                          name="First_Name"
                          component="div"
                          className="error"
                        />
                      </div>
                    </div>
                    <div className="col-xl-6 col-span-2 md:col-span-1">
                      <div className="contact-from-input">
                        <Field
                          type="text"
                          name="Last_Name"
                          placeholder="Apellido"
                        />
                        <ErrorMessage
                          name="Last_Name"
                          component="div"
                          className="error"
                        />
                      </div>
                    </div>
                    <div className="col-xl-6 col-span-2 md:col-span-1">
                      <div className="contact-from-input ">
                        <Field
                          type="email"
                          name="Email"
                          placeholder="Correo electrónico"
                        />
                        <ErrorMessage
                          name="Email"
                          component="div"
                          className="error"
                        />
                      </div>
                    </div>

                    <div className="col-xl-6 col-span-2 md:col-span-1">
                      <div className="contact-from-input intl-input phone-contact-input-select">
                        <Field name="Phone">
                          {({ field, form, meta }: any) => (
                            <div className="contact-from-input intl-input phone-contact-input-select">
                              <PhoneInput
                                name="Phone"
                                id="Phone"
                                placeholder="Ingresar número telefónico"
                                defaultCountry={
                                  state.country.toUpperCase() as CountryCode
                                }
                                className="phone-contact-input"
                                onChange={(value: any) => {
                                  form.setFieldValue("Phone", value);
                                  handlePhoneChange(value);
                                }}
                              />
                              <ErrorMessage
                                name="Phone"
                                component="div"
                                className="error"
                              />
                            </div>
                          )}
                        </Field>
                      </div>
                    </div>

                    <div className="col-xl-6 col-span-2 md:col-span-1">
                      <div className="contact-select">
                        <Field
                          as="select"
                          name="Profesion"
                          onChange={handleOptionProfessionChange}
                          value={`${selectedOptionProfession}/${selectedProfessionId}`}
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
                        </Field>
                        <ErrorMessage
                          name="Profesion"
                          component="div"
                          className="error"
                        />
                      </div>

                      {showInputProfession && (
                        <div className="contact-from-input ">
                          <Field
                            type="text"
                            name="Otra_profesion"
                            placeholder="Ingresar profesion"
                          />
                          <ErrorMessage
                            name="Otra_profesion"
                            component="div"
                            className="error"
                          />
                        </div>
                      )}
                    </div>

                    {studentInputs ? (
                      <div className="col-xl-12 flex gap-2">
                        <div className="contact-select w-1/2">
                          <Field as="select" name="year">
                            <option defaultValue="">Año</option>
                            {optionsArray.map((y) => (
                              <option key={`st_year_${y}`} defaultValue={y}>
                                {y}
                              </option>
                            ))}
                          </Field>
                          <ErrorMessage
                            name="year"
                            component="div"
                            className="error"
                          />
                        </div>
                        <div className="contact-select w-full">
                          <Field
                            as="select"
                            name="career"
                            onChange={handleOptionCareerChange}
                            value={selectedCareer}
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
                          </Field>
                          <ErrorMessage
                            name="career"
                            component="div"
                            className="error"
                          />
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className={`col-xl-6`}>
                          <div className="contact-select">
                            <Field
                              as="select"
                              name="Especialidad"
                              onChange={handleOptionSpecialtyChange}
                              value={selectedOptionSpecialty}
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
                            </Field>
                            <ErrorMessage
                              name="Especialidad"
                              component="div"
                              className="error"
                            />
                          </div>
                          {showInputSpecialties && (
                            <div className="contact-from-input my-4">
                              <Field
                                type="text"
                                name="Otra_especialidad"
                                placeholder="Ingresar especialidad"
                              />
                              <ErrorMessage
                                name="Otra_especialidad"
                                component="div"
                                className="error"
                              />
                            </div>
                          )}
                        </div>
                      </>
                    )}
                    <div className="col-span-2">
                      {!isEbook && (
                        <div className="col-xl-12 mt-4">
                          <div className="contact-from-input">
                            <label htmlFor="Description">Mensaje</label>
                            <Field
                              as="textarea"
                              id="Description"
                              name="Description"
                              placeholder="Mensaje"
                            />
                            <ErrorMessage
                              name="Description"
                              component="div"
                              className="error"
                            />
                          </div>
                        </div>
                      )}

                      <div className="flex flex-wrap gap-1 mt-2 mb-4">
                        <div className="contact-checkbox">
                          <Field
                            type="checkbox"
                            name="Terms_And_Conditions"
                            checked={formik.values.Terms_And_Conditions}
                            className="hidden-checkbox"
                          />
                          <label>
                            Acepto las{" "}
                            <a className="text-primary">
                              condiciones de privacidad
                            </a>
                          </label>
                          <ErrorMessage
                            name="Terms_And_Conditions"
                            component="div"
                            className="error"
                          />
                        </div>
                      </div>

                      <div className="col-xl-2 mt-2">
                        <div className="cont-btn">
                          <button
                            type="submit"
                            className="cont-btn disabled:bg-grey-disabled"
                            disabled={!formik.values.Terms_And_Conditions}
                          >
                            {isEbook ? "Descargar" : "Enviar"}
                          </button>
                        </div>
                      </div>
                      <p
                        className="text-red-500 font-bold"
                        style={{
                          visibility: formError ? "visible" : "hidden",
                        }}
                      >
                        {formError}
                      </p>
                      <p
                        className="success-message"
                        style={{
                          visibility: formSent ? "visible" : "hidden",
                        }}
                      >
                        ¡Gracias! Tu mensaje fue enviado correctamente.
                      </p>
                    </div>
                  </div>
                  <div className="col-span-2 md:col-span-1">
                    <ContactSidebar />
                  </div>
                </div>
              </Form>
            </FormikProvider>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactFormSection;
