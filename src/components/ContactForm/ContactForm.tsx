import React, {
  FC,
  useCallback,
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
import { Link, useHistory } from "react-router-dom";
import { getName } from "country-list";
import { CountryContext } from "context/country/CountryContext";
import { CountryCode } from "libphonenumber-js/types";
import { utmInitialState, utmReducer } from "context/utm/UTMReducer";
import { UTMAction } from "context/utm/UTMContext";
import { ErrorMessage, Field, Form, FormikProvider, useFormik } from "formik";
import { ContactFormSchema, useYupValidation } from "hooks/useYupValidation";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { fetchPdfData } from "lib/fetchPDFData";

interface ContactFormProps {
  hideHeader?: boolean;
  hideSideInfo?: boolean;
  productName?: string | undefined;
  isEbook?: boolean;
  resourceMedia?: string | boolean;
  hideContactPreference?: boolean;
  submitText?: string;
  isDownload?: boolean;
  updateFormSent?: (value: boolean, body: any) => void;
  submitReason?: string;
}

const ContactFormSection: FC<ContactFormProps> = ({
  hideHeader = false,
  productName = "",
  isEbook = false,
  resourceMedia,
  hideSideInfo,
  hideContactPreference,
  submitText = isEbook ? "Descargar" : "Enviar",
  isDownload,
  submitReason,
  updateFormSent,
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
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [formSent, setFormSent] = useState(false);
  const [studentInputs, setStudentInputs] = useState(false);
  const [formError, setFormError] = useState("");
  const [utmState, dispatchUTM] = useReducer(utmReducer, utmInitialState);
  const formRef = useRef<HTMLFormElement>(null);
  const { executeRecaptcha } = useGoogleReCaptcha();

  // Create an event handler so you can call the verification on button click event or form submit
  const handleReCaptchaVerify = useCallback(async () => {
    if (!executeRecaptcha) {
      console.log("Execute recaptcha not yet available");
      return;
    }

    const token = await executeRecaptcha("yourAction");
    // Do whatever you want with the token
  }, [executeRecaptcha]);

  const initialValues: ContactFormSchema = {
    First_Name: "",
    Last_Name: "",
    Email: "",
    Profesion: "",
    Description: "",
    Especialidad: "",
    Phone: "",
    Preferencia_de_contactaci_n: "",
    Pais: "",
    Otra_profesion: "",
    Otra_especialidad: "",
    utm_source: utmState.utm_source,
    utm_medium: utmState.utm_medium,
    utm_campaign: utmState.utm_campaign,
    utm_content: utmState.utm_content,
    Terms_And_Conditions: false,
    year: "",
    career: "",
  };

  const { contactFormValidation } = useYupValidation();

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
    formik.setFieldValue("Especialidad", value);
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
      formik.setFieldValue("Profesion", profession);
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
    handleReCaptchaVerify();
  }, [handleReCaptchaVerify]);

  const clearUTMAction: UTMAction = {
    type: "CLEAR_UTM",
    payload: {} as any,
  };

  const formik = useFormik({
    initialValues,
    validationSchema: contactFormValidation,
    onSubmit: async (values) => {
      let submitSource = null;
      if (submitReason) submitSource = submitReason;
      const body = {
        ...values,
        submitSource,
      };
      if (executeRecaptcha) {
        try {
          body.recaptcha_token = await executeRecaptcha("contact_form");
          const response = await api.postContactUs(body);
          // @ts-ignore
          if (response.status === 200) {
            let routeChange = isEbook
              ? "/gracias?origen=descarga-ebook"
              : "/gracias?origen=contact";

            setFormSent(true);
            resetForm();
            dispatchUTM(clearUTMAction);

            if (isEbook && typeof resourceMedia === "string") {
              try {
                // Realiza la solicitud para obtener el archivo PDF
                const replacedUrl = resourceMedia.replace(
                  /^(https?:\/\/)(ar\.|mx\.|cl\.|ec\.)/,
                  "$1"
                );
                const response = await fetch(replacedUrl);

                if (!response.ok) {
                  throw new Error("No se pudo descargar el archivo PDF");
                }

                const blob = await response.blob();

                // Crea un enlace temporal y simula un clic para descargar el archivo con su nombre original
                const a = document.createElement("a");
                a.href = window.URL.createObjectURL(blob);

                // Obtén el nombre del archivo del encabezado Content-Disposition si está presente
                const contentDisposition = response.headers.get(
                  "Content-Disposition"
                );
                const fileNameMatch =
                  contentDisposition &&
                  contentDisposition.match(/filename="(.+)"/);

                if (fileNameMatch && fileNameMatch[1]) {
                  a.download = fileNameMatch[1];
                } else {
                  // Si no se encontró el nombre del archivo en el encabezado, utiliza un nombre predeterminado
                  a.download = "ebook.pdf";
                }

                // Simula un clic en el enlace para iniciar la descarga
                a.click();

                // Libera el objeto URL creado
                window.URL.revokeObjectURL(a.href);

                if (!isDownload) {
                  setTimeout(() => {
                    changeRoute(routeChange);
                  }, 100);
                } else if (updateFormSent) {
                  updateFormSent(true, body);
                }
              } catch (error) {
                console.error("Error al descargar el archivo:", error);
              }
            } else {
              if (!isDownload) {
                setTimeout(() => {
                  changeRoute(routeChange);
                }, 100);
              } else if (updateFormSent) {
                updateFormSent(true, body);
              }
            }
          } else {
            setFormError(
              "Hubo un error al enviar el formulario, revise los campos"
            );
          }
        } catch (error) {
          console.error("Error al ejecutar reCAPTCHA:", error);
        }
      } else {
        console.log("Execute recaptcha not yet available1");
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

                {hideContactPreference ? null : (
                  <div className={`section-title mb-30`}>
                    {hideHeader ? null : (
                      <h2
                        className="font-medium "
                        style={{ maxWidth: "800px" }}
                      >
                        {isEbook
                          ? "Completa el formulario para descargar automáticamente el material"
                          : "Contáctanos"}
                      </h2>
                    )}

                    {!isEbook && (
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
                    )}
                  </div>
                )}

                <div
                  className={`grid md:grid-cols-1  gap-4 ${
                    hideSideInfo ? "lg:grid-cols-2" : "lg:grid-cols-3"
                  }`}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 col-span-2 gap-4">
                    <div className="col-xl-6 col-span-2 md:col-span-1">
                      <div className="contact-from-input">
                        <ErrorMessage
                          name="First_Name"
                          component="span"
                          className="error"
                        />
                        <Field
                          type="text"
                          name="First_Name"
                          placeholder="Nombre"
                        />
                      </div>
                    </div>
                    <div className="col-xl-6 col-span-2 md:col-span-1">
                      <div className="contact-from-input">
                        <ErrorMessage
                          className="error"
                          name="Last_Name"
                          component="span"
                        />
                        <Field
                          type="text"
                          name="Last_Name"
                          placeholder="Apellido"
                        />
                      </div>
                    </div>
                    <div className="col-xl-6 col-span-2 md:col-span-1">
                      <div className="contact-from-input">
                        <ErrorMessage
                          name="Email"
                          component="span"
                          className="error"
                        />
                        <Field
                          type="email"
                          name="Email"
                          placeholder="Correo electrónico"
                        />
                      </div>
                    </div>

                    <div className="col-xl-6 col-span-2 md:col-span-1">
                      <div className="contact-from-input intl-input phone-contact-input-select">
                        <Field name="Phone">
                          {({ field, form, meta }: any) => (
                            <div className="contact-from-input intl-input phone-contact-input-select">
                              <ErrorMessage
                                name="Phone"
                                component="span"
                                className="error"
                              />
                              <PhoneInput
                                name="Phone"
                                id="Phone"
                                placeholder="Ingresar número telefónico"
                                defaultCountry={
                                  state.country.toUpperCase() as CountryCode
                                }
                                onChange={(value: any) => {
                                  form.setFieldValue("Phone", value);
                                  handlePhoneChange(value);
                                }}
                              />
                            </div>
                          )}
                        </Field>
                      </div>
                    </div>

                    <div className="col-xl-6 col-span-2 md:col-span-1">
                      <div className="contact-select">
                        <ErrorMessage
                          name="Profesion"
                          component="span"
                          className="error"
                        />
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
                      </div>

                      {showInputProfession && (
                        <div className="contact-from-input my-4">
                          <ErrorMessage
                            name="Otra_profesion"
                            component="span"
                            className="error"
                          />
                          <Field
                            type="text"
                            name="Otra_profesion"
                            placeholder="Ingresar profesion"
                          />
                        </div>
                      )}
                    </div>

                    {studentInputs ? (
                      <div className="col-xl-12 flex gap-2">
                        <div className="contact-select w-1/2">
                          <ErrorMessage
                            name="year"
                            component="span"
                            className="error"
                          />
                          <Field as="select" name="year">
                            <option defaultValue="">Año</option>
                            {optionsArray.map((y) => (
                              <option key={`st_year_${y}`} defaultValue={y}>
                                {y}
                              </option>
                            ))}
                          </Field>
                        </div>
                        <div className="contact-select w-full">
                          <ErrorMessage
                            name="career"
                            component="span"
                            className="error"
                          />
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
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className={`col-xl-6`}>
                          <div className="contact-select">
                            <ErrorMessage
                              name="Especialidad"
                              component="span"
                              className="error"
                            />
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
                            <ErrorMessage
                              name="Description"
                              component="span"
                              className="error"
                            />
                            <Field
                              as="textarea"
                              id="Description"
                              name="Description"
                              placeholder="Mensaje"
                            />
                          </div>
                        </div>
                      )}

                      <div className="flex flex-wrap gap-1 mt-2 mb-4">
                        <div className="contact-checkbox">
                          <ErrorMessage
                            name="Terms_And_Conditions"
                            component="div"
                            className="error"
                          />
                          <div className="flex gap-2 center">
                            <Field
                              type="checkbox"
                              name="Terms_And_Conditions"
                              checked={formik.values.Terms_And_Conditions}
                              className="hidden-checkbox mt-1"
                            />
                            <label>
                              Acepto las{" "}
                              <Link
                                to="/politica-de-privacidad"
                                target="_blank"
                                className="text-primary"
                              >
                                politicas de privacidad
                              </Link>
                            </label>
                          </div>
                        </div>
                      </div>

                      <div className="col-xl-2 mt-2">
                        <div className="cont-btn">
                          <button
                            type="submit"
                            className="cont-btn disabled:bg-grey-disabled"
                            disabled={!formik.values.Terms_And_Conditions}
                          >
                            {submitText}
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
                  {hideSideInfo ? null : (
                    <div className="col-span-2 md:col-span-1">
                      <ContactSidebar />
                    </div>
                  )}
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
