import api from "Services/api";
import axios from "axios";
import { API_BACKEND_URL } from "data/api";
import { ContactUs, Newsletter, Specialty } from "data/types";

import React, { FC, useEffect, useReducer, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { utmInitialState, utmReducer } from "context/utm/UTMReducer";
import { useRecaptcha } from "hooks/useRecaptcha";
import { UTMAction } from "context/utm/UTMContext";
import * as Yup from "yup";
import {
  ErrorMessage,
  Field,
  FieldArray,
  Form,
  FormikProvider,
  useFormik,
} from "formik";

interface Props {
  email: string;
  setShow: (state: boolean) => void;
}

const validationSchema = Yup.object().shape({
  First_Name: Yup.string().required("El nombre es requerido"),
  Last_Name: Yup.string().required("El apellido es requerido"),
  Email: Yup.string()
    .email("Correo electrónico inválido")
    .required("El correo electrónico es requerido"),
  Profesion: Yup.string().required("La profesión es requerida"),
  Especialidad: Yup.string().required("La especialidad es requerida"),
  Temas_de_interes: Yup.array()
    .of(Yup.string())
    .min(1, "Se requiere al menos 1 tema de interés")
    .required(),
  Terms_And_Conditions2: Yup.boolean().oneOf(
    [true],
    "Debe aceptar los términos y condiciones"
  ),
});
const FooterNewsletter: FC<Props> = ({ email, setShow }) => {
  const [professions, setProfessions] = useState([]);
  const [specialties, setSpecialties] = useState([]);
  const [newsletterSpecialties, setNewsletterSpecialties] = useState([]);
  const [selectedOptionSpecialty, setSelectedOptionSpecialty] = useState("");
  const [selectedOptionProfession, setSelectedOptionProfession] = useState("");
  const [showInputProfession, setShowInputProfession] = useState(false);
  const [showInputSpecialties, setShowInputSpecialties] = useState(false);
  const [specialtiesGroup, setSpecialtiesGroup] = useState<Specialty[]>([]);
  const [selectedProfessionId, setSelectedProfessionId] = useState<string>("");
  const [currentGroup, setCurrentGroup] = useState<any>([]);
  const [studentInputs, setStudentInputs] = useState(false);
  const [formError, setFormError] = useState("");
  const [utmState, dispatchUTM] = useReducer(utmReducer, utmInitialState);

  const { recaptchaResponse, refreshRecaptcha } = useRecaptcha("submit");

  const fetchProfessions = async () => {
    const professionList = await api.getProfessions();
    setProfessions(professionList);
  };
  const fetchSpecialties = async () => {
    axios
      .get(`${API_BACKEND_URL}/specialities`)
      .then((response) => {
        setSpecialties(response.data.specialities);
        setSpecialtiesGroup(response.data.specialities_group);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const fetchNewsletterSpecialties = async () => {
    const newsletterSpecialtyList = await api.getNewsletterSpecialties();
    setNewsletterSpecialties(newsletterSpecialtyList);
  };

  const handleOptionSpecialtyChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { value } = event.target;
    setSelectedOptionSpecialty(value);
    formik.setFieldValue("Especialidad", value);
    setShowInputSpecialties(value === "Otra Especialidad");
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
      formik.setFieldValue("Profesion", profession);

      const groups =
        specialtiesGroup[parseInt(id) as keyof typeof specialtiesGroup];
      setCurrentGroup(groups);
    } else {
      setSelectedOptionProfession("");
      setSelectedProfessionId("");
    }
  };

  useEffect(() => {
    fetchProfessions();
    fetchSpecialties();
    fetchNewsletterSpecialties();
  }, []);

  const history = useHistory();

  const changeRoute = (newRoute: string): void => {
    history.push(newRoute);
  };

  const clearUTMAction: UTMAction = {
    type: "CLEAR_UTM",
    payload: {} as any,
  };

  const formRef = useRef<HTMLFormElement>(null!);

  const resetForm = () => {
    formRef.current.reset();
  };

  const optionsArray = [1, 2, 3, 4, 5];

  const initialValues = {
    First_Name: "",
    Last_Name: "",
    Email: email,
    Profesion: "",
    Especialidad: "",
    Temas_de_interes: [] as any,
    Terms_And_Conditions2: false,
    Otra_profesion: "",
    Otra_especialidad: "",
    utm_source: utmState.utm_source,
    utm_medium: utmState.utm_medium,
    utm_campaign: utmState.utm_campaign,
    utm_content: utmState.utm_content,
  };
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      const body = {
        ...values,
        recaptchaResponse,
      };
      try {
        let response = await api.postNewsletter(body as Newsletter);
        // @ts-ignore
        if (response.status === 200) {
          setShow(false);
          refreshRecaptcha();
          resetForm();
          dispatchUTM(clearUTMAction);
          setTimeout(() => {
            changeRoute("/gracias?origen=newsletter");
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
  return (
    <FormikProvider value={formik}>
      <Form
        onSubmit={formik.handleSubmit}
        action="/leads"
        className=""
        autoComplete="off"
        ref={formRef}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 grid-row-6 gap-4">
          <div className="">
            <div className="contact-from-input">
              <Field
                type="text"
                name="First_Name"
                placeholder="Ingresar nombre"
              />
              <ErrorMessage
                name="First_Name"
                component="div"
                className="error"
              />
            </div>
          </div>
          <div className="">
            <div className="contact-from-input">
              <Field
                type="text"
                name="Last_Name"
                placeholder="Ingresar apellido"
              />
              <ErrorMessage
                name="Last_Name"
                component="div"
                className="error"
              />
            </div>
          </div>
          <div className="">
            <div className="contact-from-input ">
              <Field
                type="email"
                name="Email"
                placeholder="Ingresar correo electrónico"
              />
              <ErrorMessage name="Email" component="div" className="error" />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 grid-row-6 gap-4 mt-4">
          <div className="contact-select">
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
                  ? professions.map((p: { id: string; name: string }) => (
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
              <div className="contact-from-input my-4">
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
                <ErrorMessage name="year" component="div" className="error" />
              </div>
              <div className="contact-select w-full">
                <Field as="select" name="career">
                  <option defaultValue="">Seleccionar carrera</option>
                  {currentGroup.map((s: any) => (
                    <option key={`st_carrer_${s.id}`} defaultValue={s.name}>
                      {s.name}
                    </option>
                  ))}
                </Field>
                <ErrorMessage name="career" component="div" className="error" />
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
                    <option defaultValue="">Seleccionar especialidad</option>
                    {selectedOptionProfession && currentGroup.length
                      ? currentGroup.map((s: any) => (
                          <option
                            key={`sp_group_${s.id}`}
                            defaultValue={s.name}
                          >
                            {s.name}
                          </option>
                        ))
                      : specialties.map((s: { id: string; name: string }) => (
                          <option key={`sp_${s.id}`} defaultValue={s.name}>
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
        </div>
        <h3 className="mt-6 text-base font-semibold text-neutral-900 lg:text-xl dark:text-neutral-200 font-raleway">
          Selecciona tus temas de interés
        </h3>
        <ErrorMessage
          name="Temas_de_interes"
          component="div"
          className="error text-left"
        />
        <FieldArray name="Temas_de_interes">
          {({ push, remove }) => (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 grid-row-6 gap-2 mt-2">
              {newsletterSpecialties && newsletterSpecialties.length
                ? newsletterSpecialties.map(
                    (
                      specialty: { name: string; id: number },
                      index: number
                    ) => (
                      <div key={specialty.id} className="interest-topics">
                        <label>
                          <Field
                            type="checkbox"
                            name={`Temas_de_interes[${index}]`}
                            value={specialty.name}
                            checked={formik.values.Temas_de_interes.includes(
                              specialty.name
                            )}
                            onChange={(e: any) => {
                              const isChecked = e.target.checked;
                              if (isChecked) {
                                push(specialty.name);
                              } else {
                                const idx =
                                  formik.values.Temas_de_interes.indexOf(
                                    specialty.name
                                  );
                                if (idx !== -1) {
                                  remove(idx);
                                }
                              }
                            }}
                          />
                          <span>{specialty.name}</span>
                        </label>
                      </div>
                    )
                  )
                : null}
            </div>
          )}
        </FieldArray>

        <div className="flex justify-center flex-wrap items-center gap-8">
          <div className="contact-checkbox">
            <Field
              type="checkbox"
              name="Terms_And_Conditions2"
              checked={formik.values.Terms_And_Conditions2}
              className="hidden-checkbox"
            />
            <label>
              Acepto las{" "}
              <a className="text-primary">condiciones de privacidad</a>
            </label>
            <ErrorMessage
              name="Terms_And_Conditions2"
              component="div"
              className="error"
            />
          </div>
          <div className="mt-2">
            <button
              type="submit"
              id="submit-newsletter"
              className="cont-btn rounded flex center"
              disabled={!formik.values.Terms_And_Conditions2}
            >
              <div className="flex center gap-2 px-2 text-sm my-auto">
                Suscribirme
                <img
                  src="/src/images/icons/plane.svg"
                  className="subscribe-icon"
                />
              </div>
            </button>
          </div>
        </div>
        <p
          className="text-red-500 font-bold text-center"
          style={{ visibility: formError ? "visible" : "hidden" }}
        >
          {formError}
        </p>
      </Form>
    </FormikProvider>
  );
};

export default FooterNewsletter;
