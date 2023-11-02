import React, {
  FC,
  useContext,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import LayoutPage from "components/LayoutPage/LayoutPage";
import ButtonPrimary from "components/Button/ButtonPrimary";
import { Helmet } from "react-helmet";
import api from "../../../Services/api";
import { Link, useHistory } from "react-router-dom";
import { utmInitialState, utmReducer } from "context/utm/UTMReducer";
import { ErrorMessage, Field, Form, FormikProvider, useFormik } from "formik";
import { useYupValidation } from "hooks/useYupValidation";

import {
  setDependent,
  zsRegenerateCaptcha,
  zsValidateMandatoryFields,
} from "./arrepentimientoCompra";

export const argDocumentTypes = [
  {
    slug: "CÉDULA",
    title: "CÉDULA",
  },
  {
    slug: "Pasaporte",
    title: "Pasaporte",
  },
  {
    slug: "RUC",
    title: "RUC",
  },
];
export interface PageCancelSubscriptionProps {
  className?: string;
}

const PageCancelSubscription: FC<PageCancelSubscriptionProps> = ({
  className = "",
}) => {
  const formRef = useRef<HTMLFormElement>(null);
  const { cancelSubscriptionValidation } = useYupValidation();
  const [captchaValidationField, setCaptchaValidationField] = useState("");

  const initialValues = {
    first_name: "",
    last_name: "",
    email: "",
    identificacion: "",
    motivo_solicitud: "",
    Terms_And_Conditions: false,
    zsWebFormCaptchaWord: "",
    xnQsjsdp: "edbsn868ee7b090a02d9bf1e54e6366218f7f",
    xmIwtLD:
      "edbsn6f579a65860efd166106fe7021b1ed1245882888429e2804ceb3ca47fa09472b",
    actionType: "Q2FzZXM=",
    returnURL: "https://msklatam.com/ec/gracias",
    zsCaptchaSrc: "",
  };
  // const initialValues = null;
  const validationSchema = cancelSubscriptionValidation;

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values: any) => {
      zsValidateMandatoryFields();
      if (!captchaValidationField) return;
      const formData = {
        xJdfEaS: captchaValidationField,
        "First Name": values.first_name,
        "Contact Name": values.last_name,
        Email: values.email,
        País: "Ecuador",
        "Tipo de Documento": values.tipo_documento,
        Identificación: values.identificacion,
        Subject: values.motivo_solicitud,
        zsWebFormCaptchaWord: values.zsWebFormCaptchaWord,
        xnQsjsdp: values.xnQsjsdp,
        xmIwtLD: values.xmIwtLD,
        actionType: values.actionType,
        returnURL: values.returnURL,
        zsCaptchaSrc: values.zsCaptchaSrc,
      };

      try {
        const res = await api.cancelSubscription(formData);
        console.log(res);
      } catch (error) {
        console.error("Error:", error);
      }
    },
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const captchaFieldValue: any = document.getElementsByName("xJdfEaS")[0];
      if (captchaFieldValue.value) {
        setCaptchaValidationField(captchaFieldValue.value);
        clearInterval(interval);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div
      className={`nc-PageCancelSubscription ${className} animate-fade-down`}
      data-nc-id="PageCancelSubscription"
    >
      <Helmet>
        <title>MSK | Cancelar inscripción</title>
      </Helmet>
      <LayoutPage
        heading="Cancelar inscripción"
        subHeading="Puedes solicitar la cancelación de tu inscripción a un curso hasta 10 días hábiles luego de adquirido el mismo "
      >
        <p className="max-w-xl text-center mx-auto block text-sm mb-4 sm:text-base">
          A continuación, completa y envía el formulario y dentro de las
          próximas 24 horas te comunicaremos la resolución de tu solicitud vía
          e-mail. 
        </p>
        <div className="max-w-md mx-auto space-y-6">
          <FormikProvider value={formik}>
            <Form
              onSubmit={formik.handleSubmit}
              action="#"
              className=""
              autoComplete="off"
              ref={formRef}
              name="zsWebToCase_740111000002566679"
              id="zsWebToCase_740111000002566679"
            >
              <input
                type="hidden"
                name="xnQsjsdp"
                value="edbsn868ee7b090a02d9bf1e54e6366218f7f"
              />
              <input
                type="hidden"
                name="xmIwtLD"
                value="edbsn6f579a65860efd166106fe7021b1ed1245882888429e2804ceb3ca47fa09472b"
              />
              <input type="hidden" name="xJdfEaS" value="" />
              <input type="hidden" name="actionType" value="Q2FzZXM=" />
              <input type="hidden" id="property(module)" value="Cases" />
              <input
                type="hidden"
                id="dependent_field_values_Cases"
                value='&#x7b;"JSON_VALUES"&#x3a;&#x7b;"CASECF1"&#x3a;&#x7b;"CASECF2"&#x3a;&#x7b;"Surinam"&#x3a;&#x5b;"--Ninguna--"&#x5d;,"Granada"&#x3a;&#x5b;"--Ninguna--"&#x5d;,"Bolivia"&#x3a;&#x5b;"Pasaporte"&#x5d;,"Paraguay"&#x3a;&#x5b;"--Ninguna--"&#x5d;,"Hait&iacute;"&#x3a;&#x5b;"--Ninguna--"&#x5d;,"Bahamas"&#x3a;&#x5b;"--Ninguna--"&#x5d;,"Costa&#x20;Rica"&#x3a;&#x5b;"--Ninguna--"&#x5d;,"Brasil"&#x3a;&#x5b;"Pasaporte"&#x5d;,"Trinidad&#x20;y&#x20;Tobago"&#x3a;&#x5b;"--Ninguna--"&#x5d;,"El&#x20;Salvador"&#x3a;&#x5b;"--Ninguna--"&#x5d;,"Panam&aacute;"&#x3a;&#x5b;"--Ninguna--"&#x5d;,"San&#x20;Vicente&#x20;y&#x20;las&#x20;Granadinas"&#x3a;&#x5b;"--Ninguna--"&#x5d;,"Guatemala"&#x3a;&#x5b;"--Ninguna--"&#x5d;,"Guyana"&#x3a;&#x5b;"--Ninguna--"&#x5d;,"Chile"&#x3a;&#x5b;"Pasaporte","RUT"&#x5d;,"Santa&#x20;Luc&iacute;a"&#x3a;&#x5b;"--Ninguna--"&#x5d;,"Colombia"&#x3a;&#x5b;"--Ninguna--"&#x5d;,"Ecuador"&#x3a;&#x5b;"C&Eacute;DULA","Pasaporte","RUC"&#x5d;,"Argentina"&#x3a;&#x5b;"DNI","CUIT","CUIL","C&Eacute;DULA","LE","LC","Pasaporte"&#x5d;,"Belice"&#x3a;&#x5b;"--Ninguna--"&#x5d;,"Uruguay"&#x3a;&#x5b;"--Ninguna--"&#x5d;,"Antigua&#x20;y&#x20;Barbuda"&#x3a;&#x5b;"--Ninguna--"&#x5d;,"M&eacute;xico"&#x3a;&#x5b;"RFC"&#x5d;,"Estados&#x20;Unidos"&#x3a;&#x5b;"--Ninguna--"&#x5d;,"Rep&uacute;blica&#x20;Dominicana"&#x3a;&#x5b;"--Ninguna--"&#x5d;,"Canad&aacute;"&#x3a;&#x5b;"--Ninguna--"&#x5d;,"Cuba"&#x3a;&#x5b;"--Ninguna--"&#x5d;,"Venezuela"&#x3a;&#x5b;"--Ninguna--"&#x5d;,"Barbados"&#x3a;&#x5b;"--Ninguna--"&#x5d;,"Nicaragua"&#x3a;&#x5b;"--Ninguna--","DNI","CUIT","CUIL","C&Eacute;DULA","LE","LC","Pasaporte","RUC","RFC","RUT"&#x5d;,"Per&uacute;"&#x3a;&#x5b;"--Ninguna--"&#x5d;,"Honduras"&#x3a;&#x5b;"--Ninguna--"&#x5d;,"San&#x20;Crist&oacute;bal&#x20;y&#x20;Nieves"&#x3a;&#x5b;"--Ninguna--"&#x5d;,"Jamaica"&#x3a;&#x5b;"--Ninguna--"&#x5d;,"Dominica"&#x3a;&#x5b;"--Ninguna--"&#x5d;&#x7d;&#x7d;&#x7d;,"JSON_SELECT_VALUES"&#x3a;&#x7b;"CASECF1"&#x3a;&#x5b;"--Ninguna--","Antigua&#x20;y&#x20;Barbuda","Argentina","Bahamas","Barbados","Belice","Bolivia","Brasil","Canad&aacute;","Chile","Colombia","Costa&#x20;Rica","Cuba","Dominica","Ecuador","El&#x20;Salvador","Estados&#x20;Unidos","Granada","Guatemala","Guyana","Hait&iacute;","Honduras","Jamaica","M&eacute;xico","Nicaragua","Panam&aacute;","Paraguay","Per&uacute;","Rep&uacute;blica&#x20;Dominicana","San&#x20;Crist&oacute;bal&#x20;y&#x20;Nieves","San&#x20;Vicente&#x20;y&#x20;las&#x20;Granadinas","Santa&#x20;Luc&iacute;a","Surinam","Trinidad&#x20;y&#x20;Tobago","Uruguay","Venezuela"&#x5d;,"CASECF2"&#x3a;&#x5b;"--Ninguna--","DNI","CUIT","CUIL","C&Eacute;DULA","LE","LC","Pasaporte","RUC","RFC","RUT"&#x5d;&#x7d;,"JSON_MAP_DEP_LABELS"&#x3a;&#x5b;"CASECF1"&#x5d;&#x7d;'
              />
              <input
                type="hidden"
                name="returnURL"
                value="https&#x3a;&#x2f;&#x2f;msklatam.com&#x2f;ec&#x2f;gracias"
              />
              <div className="form-input-std">
                <label className="text-neutral-800 dark:text-neutral-200 mb-1">
                  Nombre
                </label>
                <ErrorMessage
                  name="first_name"
                  component="span"
                  className="error"
                />
                <Field
                  type="text"
                  name="first_name"
                  placeholder="Ingresar nombre"
                />
              </div>
              <div className="form-input-std">
                <label className="text-neutral-800 dark:text-neutral-200 mb-1">
                  Apellidos
                </label>
                <ErrorMessage
                  name="last_name"
                  component="span"
                  className="error"
                />
                <Field
                  type="text"
                  name="last_name"
                  placeholder="Ingresar apellidos"
                />
              </div>
              <div className="form-input-std">
                <label className="text-neutral-800 dark:text-neutral-200 mb-1">
                  E-mail
                </label>
                <ErrorMessage name="email" component="span" className="error" />
                <Field type="text" name="email" placeholder="Ingresar e-mail" />
              </div>
              <div style={{ display: "none" }}>
                <select
                  name="País"
                  value="Ecuador"
                  onChange={() => setDependent(this, false)}
                  id="CASECF1"
                >
                  <option value="Ecuador">Ecuador</option>
                </select>
              </div>
              <div className="form-select-std w-full">
                <label className="text-neutral-800 dark:text-neutral-200 mb-1">
                  Tipo de documento
                </label>
                <ErrorMessage
                  name="tipo_documento"
                  component="span"
                  className="error"
                />
                <Field as="select" name="tipo_documento">
                  <option defaultValue="">Seleccionar tipo de documento</option>
                  {argDocumentTypes.map((s) => (
                    <option key={s.slug} value={s.title}>
                      {s.title}
                    </option>
                  ))}
                </Field>
              </div>
              <div className="form-input-std">
                <label className="text-neutral-800 dark:text-neutral-200 mb-1">
                  Identificación
                </label>
                <ErrorMessage
                  name="identificacion"
                  component="span"
                  className="error"
                />
                <Field
                  type="text"
                  name="identificacion"
                  placeholder="Ingresar cédula, RUC o pasaporte"
                />
              </div>

              <div className="form-input-std">
                <label className="text-neutral-800 dark:text-neutral-200 mb-1">
                  Motivo de la solicitud
                </label>
                <ErrorMessage
                  name="motivo_solicitud"
                  component="span"
                  className="error"
                />
                <Field
                  type="text"
                  name="motivo_solicitud"
                  placeholder="Ingresar motivo de la solicitud"
                />
              </div>

              <table>
                <tbody>
                  <tr>
                    <td>
                      <div className="grid grid-cols-2 items-center gap-4 justify-between">
                        <div id="zsCaptcha" className="form-input-std">
                          <label className="text-neutral-800 dark:text-neutral-200 mb-1">
                            Captcha
                          </label>
                          <input type="hidden" name="zsCaptchaSrc" value="" />
                          <ErrorMessage
                            name="zsWebFormCaptchaWord"
                            component="span"
                            className="error"
                          />
                          <Field
                            type="text"
                            name="zsWebFormCaptchaWord"
                            placeholder=""
                          />
                        </div>
                        <div className="grid grid-cols-1">
                          <img src="#" id="zsCaptchaUrl" />
                          <a
                            style={{
                              color: "#00a3fe",
                              cursor: "pointer",
                              marginLeft: "10px",
                              verticalAlign: "middle",
                              textDecoration: "none",
                            }}
                            className="zsFontClass text-right"
                            onClick={() => zsRegenerateCaptcha()}
                          >
                            Actualizar
                          </a>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>

              <div className="flex flex-wrap gap-4 mt-4 ">
                <div className="contact-checkbox signup-checkbox">
                  <ErrorMessage
                    name="Terms_And_Conditions"
                    component="span"
                    className="error"
                  />
                  <div className="flex gap-2 center text-center">
                    <Field
                      type="checkbox"
                      name="Terms_And_Conditions"
                      checked={formik.values.Terms_And_Conditions}
                      className="hidden-checkbox mt-0.5"
                    />
                    <label>
                      Acepto las{" "}
                      <Link
                        to="/politica-de-privacidad"
                        target="_blank"
                        className="text-primary underline"
                      >
                        politicas de privacidad
                      </Link>
                    </label>
                  </div>
                </div>
              </div>

              <div
                className="flex flex-wrap gap-1 mt-2 mb-4"
                id="zsSubmitButton_740111000002566679"
              >
                <ButtonPrimary
                  type="submit"
                  className="w-full"
                  disabled={!formik.values.Terms_And_Conditions}
                >
                  Enviar
                </ButtonPrimary>
                {/* {error && (
                  <p
                    className="text-red-500 text-center w-full"
                    dangerouslySetInnerHTML={{ __html: error }}
                  ></p>
                )}

                {success && (
                  <p className="text-green-500 text-center w-full">
                    Registrado correctamente!
                  </p>
                )} */}
              </div>
            </Form>
          </FormikProvider>
        </div>
      </LayoutPage>
    </div>
  );
};

export default PageCancelSubscription;
