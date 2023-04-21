import React, { FC } from "react";
import imgAdsDef from "images/home/illustration_1.png";
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
    <div className="extra-info grid lg:grid-cols-3 md:grid-cols-1 place-items-center text-white">
      <div className="info-wrapper items-center">
        <p className="font-bold text-2xl">
          ¡Actualizamos nuestro <br />
          Curso de Administración <br />y gestión hospitalaria!
        </p>
      </div>
      <div className="info-wrapper px-8 md:px-0 colspan-3">
        <p className="text-lg">
          Ahora con análisis de <span className="font-bold">casos reales</span>{" "}
          y herramientas de gestión hospitalaria ⤵️
        </p>
        <ul>
          <li>Matriz de priorización</li>
          <li>Análisis de costos ocultos</li>
          <li>Análisis FODA para un centro de atención primaria</li>
        </ul>
      </div>

      <div className="info-wrapper">
        <div className="cta mx-auto md:mx-0">
          <ButtonPrimary className="font-semibold py-4 w-48">
            Me interesa
          </ButtonPrimary>
          <p>💳 Pagos sin intereses</p>
        </div>
      </div>
      <img src={imgAds} alt="" />
    </div>
  );
};

export default SectionAds;
