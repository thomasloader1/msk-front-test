import api from "Services/api";
import activeIcon from "/images/icons/activo.svg";
import inactiveIcon from "/images/icons/inactivo.svg";
import expiredIcon from "/images/icons/expirado.svg";

export const goToLMS = async (
  product_code: number,
  cod_curso: string,
  email: string
) => {
  const res = await api.getLinkLMS(product_code, cod_curso, email);
  window.open(res.sso, "_blank");
  return res;
};

export const goToEnroll = async (product_code: number, email: string) => {
  const res = await api.enrollCourse(product_code, email);
  return res;
};

export function hasText(status: string) {
  switch (status) {
    case "Sin enrolar":
      return "Activar";
    case "Listo para enrolar":
      return "Ir a enrolar";
    case "Activo":
      return "Ir al curso";
    case "Finalizado":
      return "Ir al curso";
    default:
      return status;
  }
}

export const productFinishOrActive = (status: string) =>
  status.includes("Activo") || status.includes("Finalizado");
export const productStatusIsExpired = (status: string) =>
  status.includes("Expirado");

export const getStatusIcon = (status: string) => {
  switch (status) {
    case "Activo":
    case "Finalizado":
      return activeIcon;
    case "Expirado":
      return expiredIcon;
    default:
      return inactiveIcon;
  }
};

export const statusCourse = (status: string) => {
  const statusObj: { isDisabled: boolean; hasText: string } = {
    isDisabled: true,
    hasText: "",
  };

  switch (status) {
    case "Inactivo":
    case "Expirado":
      statusObj.isDisabled = true;
      statusObj.hasText = "Activar";
      break;
    case "Sin enrolar":
      statusObj.isDisabled = false;
      statusObj.hasText = "Activar";
      break;
    case "Activo":
    case "Finalizado":
      statusObj.isDisabled = false;
      statusObj.hasText = "Ir al curso";
      break;
  }

  return statusObj;
};

export const statusOrdenVenta = (status: string) => {
  const statusObj: { isDisabled: boolean; hasText: string; color: string } = {
    isDisabled: true,
    hasText: "",
    color: "",
  };

  switch (status) {
    case "Baja":
      statusObj.isDisabled = true;
      statusObj.hasText = "Baja";
      statusObj.color = "red";
      break;
    default:
      statusObj.isDisabled = false;
      statusObj.hasText = "";
      statusObj.color = "";
      break;
  }

  return statusObj;
};

export const colorStatus = (status: string) => {
  switch (status) {
    case "Activo":
      return "teal-active";
    case "Sin enrolar":
      return "gray";
    case "Expirado":
    case "Baja":
      return "red";
    case "Finalizado":
      return "green";
  }
};
