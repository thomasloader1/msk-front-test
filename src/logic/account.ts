import api from "Services/api";

export const goToLMS = async (
  product_code: number,
  cod_curso: string,
  email: string
) => {
  const res = await api.getLinkLMS(product_code, cod_curso, email);
  window.open(res.sso, "_blank");
  return res;
};

export const productFinishOrActive = (status: string) =>
  status.includes("Activo") || status.includes("Finalizado");
export const productStatusIsExpired = (status: string) =>
  status.includes("Expirado");

export const statusCourse = (status: string) =>
  status === "Inactivo" || status === "Expirado";

export const colorStatus = (status: string) => {
  switch (status) {
    case "Activo":
      return "teal-active";
    case "Inactivo":
    case "Expirado":
      return "red";
    case "Finalizado":
      return "green";
  }
};
