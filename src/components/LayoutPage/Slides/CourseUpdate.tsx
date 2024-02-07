import React, { FC } from "react";
import imgAdsDef from "/images/home/illustration_1.png";
import ButtonPrimary from "components/Button/ButtonPrimary";
export interface SectionAdsProps {
  className?: string;
  imgAds?: string;
}

const SectionAds: FC<SectionAdsProps> = ({
  className = "",
  imgAds = imgAdsDef,
}) => {
  return (
    <div className="course-update text-white">
      <div className="info-wrapper items-center ">
        <h3 className="font-bold ">
          ¡Actualizamos nuestro <br />
          Curso de Administración <br />y gestión hospitalaria!
        </h3>
      </div>
      <div className="info-wrapper">
        <p>
          Ahora con <span className="font-bold">análisis de casos reales</span>y
          herramientas de gestión hospitalaria ⤵️
        </p>
        <ul>
          <li>Matriz de priorización</li>
          <li>Análisis de costos ocultos</li>
          <li>Análisis FODA para un centro de atención primaria</li>
        </ul>
      </div>

      <div className="info-wrapper">
        <div className="cta">
          <ButtonPrimary className="font-semibold py-4 w-48 z-10">
            Me interesa
          </ButtonPrimary>
          <p className="z-10">💳 Pagos sin intereses</p>
          <img src={imgAds} alt="" />
        </div>
      </div>
    </div>
  );
};

export default SectionAds;
