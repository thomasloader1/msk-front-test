import * as Yup from "yup";

export interface ContactFormSchema {
  First_Name: string;
  Last_Name: string;
  Email: string;
  Phone: string;
  Profesion: string;
  Especialidad: string;
  Terms_And_Conditions: boolean;
  Description?: string;
  Pais?: string;
  Otra_profesion?: string;
  year?: string;
  career?: string;
  Otra_especialidad?: string;
  Preferencia_de_contactaci_n?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  recaptcha_token?: string | null;
}

export const useYupValidation = () => {
  const contactFormValidation: Yup.Schema<ContactFormSchema> =
    Yup.object().shape({
      First_Name: Yup.string().required("El nombre es requerido"),
      Last_Name: Yup.string().required("El apellido es requerido"),
      Email: Yup.string()
        .email("Correo electrónico inválido")
        .required("El correo electrónico es requerido"),
      Phone: Yup.string().required("El teléfono es requerido"),
      Description: Yup.string(),
      Profesion: Yup.string().required("La profesión es requerida"),
      Especialidad: Yup.string().required("La especialidad es requerida"),
      Otra_profesion: Yup.string().test(
        "other-profession",
        "La profesion es requerida",
        function (value) {
          const profession = this.parent.Profesion;
          if (profession === "Otra Profesion" && !value) {
            return new Yup.ValidationError(
              "La profesion es requerida",
              value,
              "Otra_profesion"
            );
          }
          return true;
        }
      ),
      year: Yup.string().test(
        "student-year",
        "El año es requerido para estudiantes",
        function (value) {
          const profession = this.parent.Profesion;
          if (profession === "Estudiante" && !value) {
            return new Yup.ValidationError(
              "El año es requerido",
              value,
              "year"
            );
          }
          return true;
        }
      ),
      career: Yup.string().test(
        "student-year",
        "La carrera es requerido para estudiantes",
        function (value) {
          const profession = this.parent.Profesion;
          if (profession === "Estudiante" && !value) {
            return new Yup.ValidationError(
              "La carrera es requerida",
              value,
              "career"
            );
          }
          return true;
        }
      ),
      Otra_especialidad: Yup.string().test(
        "other-speciality",
        "El año es requerido para estudiantes",
        function (value) {
          const specialty = this.parent.Especialidad;
          if (specialty === "Otra Especialidad" && !value) {
            return new Yup.ValidationError(
              "La especialidad es requerida",
              value,
              "Otra_especialidad"
            );
          }
          return true;
        }
      ),
      Terms_And_Conditions: Yup.boolean()
        .oneOf([true], "Debes aceptar los términos y condiciones")
        .required("Debes aceptar los términos y condiciones"),
    });

  return {
    contactFormValidation,
  };
};
