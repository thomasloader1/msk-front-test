import api from "Services/api";

export const goToLMS = async (cod_curso: string, email: string) => {
    const { sso } = await api.getLinkLMS(cod_curso, email);
    console.log({ sso });
    window.open(sso, "_blank");
};