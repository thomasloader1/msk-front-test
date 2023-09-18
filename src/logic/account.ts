import api from "Services/api";

export const goToLMS = async (product_code:number,cod_curso: string, email: string) => {
    const res = await api.getLinkLMS(product_code,cod_curso, email);
    window.open(res.sso, "_blank");
    return res;
};