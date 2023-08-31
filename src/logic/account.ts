import api from "Services/api";

export const goToLMS = async (cod_curso: string, email: string) => {
    const res = await api.getLinkLMS(cod_curso, email);
    window.open(res.sso, "_blank");
    return res;
};