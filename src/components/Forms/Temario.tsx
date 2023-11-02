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
import "react-phone-number-input/style.css";
import PhoneInput, { parsePhoneNumber } from "react-phone-number-input";
import { Profession, Specialty } from "data/types";
import { API_BACKEND_URL } from "data/api";
import axios from "axios";
import api from "../../Services/api";
import { Link } from "react-router-dom";
import { getName } from "country-list";
import { CountryContext } from "context/country/CountryContext";
import { CountryCode } from "libphonenumber-js/types";
import { utmInitialState, utmReducer } from "context/utm/UTMReducer";
import { UTMAction } from "context/utm/UTMContext";
import { ErrorMessage, Field, Form, FormikProvider, useFormik } from "formik";
import { TemarioFormSchema, useYupValidation } from "hooks/useYupValidation";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import ButtonPrimary from "components/Button/ButtonPrimary";

const TemarioForm: FC<{
  onCloseModal: () => void;
  updateFormSent: (value: boolean) => void;
  link: string;
  slug?: string;
}> = ({ onCloseModal, updateFormSent, link, slug }) => {
  const { state } = useContext(CountryContext);
  const [specialtiesGroup, setSpecialtiesGroup] = useState<Specialty[]>([]);
  const [professions, setProfessions] = useState<Profession[]>([]);
  const [showInputProfession, setShowInputProfession] = useState(false);
  const [selectedOptionProfession, setSelectedOptionProfession] =
    useState<string>("");
  const [selectedProfessionId, setSelectedProfessionId] = useState<string>("");
  const [currentGroup, setCurrentGroup] = useState<any>([]);

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

  const initialValues: TemarioFormSchema = {
    First_Name: "",
    Last_Name: "",
    Email: "",
    Profesion: "",
    Description: "",
    Phone: "",
    Pais: "",
    Otra_profesion: "",
    utm_source: utmState.utm_source,
    utm_medium: utmState.utm_medium,
    utm_campaign: utmState.utm_campaign,
    utm_content: utmState.utm_content,
    Terms_And_Conditions: false,
    year: "",
    career: "",
  };

  const { temarioFormValidation } = useYupValidation();
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
    handleReCaptchaVerify();
  }, [handleReCaptchaVerify]);

  const clearUTMAction: UTMAction = {
    type: "CLEAR_UTM",
    payload: {} as any,
  };

  const formik = useFormik({
    initialValues,
    validationSchema: temarioFormValidation,
    onSubmit: async (values) => {
      const body = {
        ...values,
      };
      if (executeRecaptcha) {
        try {
          body.recaptcha_token = await executeRecaptcha("contact_form");
          updateFormSent(true);
          setFormSent(true);
          if (link) {
            try {
              await api.temarioDownload(link, slug);
              updateFormSent(true);
              resetForm();
              dispatchUTM(clearUTMAction);
            } catch (e) {
              console.log("ERROR: ", e);
              setFormError(
                "Hubo un error al enviar el formulario, revise los campos"
              );
            }
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
  return (
    <>
      <div className="col-span-3">
        <div className="contact-area-wrapper">
          <div className="contact-form">
            <FormikProvider value={formik}>
              {formSent ? (
                <div
                  className="thank-you-wrp py-16"
                  style={{
                    display: formSent ? "block" : "none",
                  }}
                >
                  <h1 className="text-center thank-you-title">¡Listo!</h1>
                  <div className="max-w-2xl mx-auto space-y-6">
                    <p className="text-center text-natural-600 md:px-20 px-8">
                      Ya descargaste el temario completo de este curso en tu
                      dispositivo
                      <ButtonPrimary onClick={() => onCloseModal()}>
                        Seguir navegando
                      </ButtonPrimary>
                    </p>
                  </div>
                </div>
              ) : (
                <Form
                  onSubmit={formik.handleSubmit}
                  action="/leads"
                  className=""
                  autoComplete="off"
                  ref={formRef}
                >
                  <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-4">
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
                    ) : null}
                    <div className="col-span-2">
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
                            {"Descargar"}
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
                    </div>
                  </div>
                </Form>
              )}
            </FormikProvider>
          </div>
        </div>
      </div>
    </>
  );
};
export default TemarioForm;
