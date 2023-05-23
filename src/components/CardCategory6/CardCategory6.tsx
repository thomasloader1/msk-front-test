import React, { FC } from "react";
import NcImage from "components/NcImage/NcImage";
import { TaxonomyType, TwMainColor } from "data/types";
import { Link } from "react-router-dom";
import Badge from "components/Badge/Badge";

export interface CardCategory6Props {
  className?: string;
  taxonomy: any;
  index?: string;
}

const CardCategory6: FC<CardCategory6Props> = ({
  className = "",
  taxonomy,
  index,
}) => {
  const { description, href = "/", name } = taxonomy;
  let thumbnail = "/src/images/courses/";
  switch (name) {
    case "Cardiología":
      thumbnail = thumbnail + "cardiology.png";
      break;
    case "Enfermería":
      thumbnail = thumbnail + "nursing.png";
      break;
    case "Medicina General":
      thumbnail = thumbnail + "medical.png";
      break;
    case "Infectología":
      thumbnail = thumbnail + "infectology.png";
      break;
    case "Mis Cursos":
      thumbnail = thumbnail + "laptop.png";
      break;
    case "Centro de ayuda":
      thumbnail = thumbnail + "comment.png";
      break
    case "Configurar mi cuenta":
      thumbnail = thumbnail + "gauge.png";
      break;
  }
  return (
    <Link
      to={href}
      className={`nc-CardCategory6 relative flex flex-col items-center justify-center text-center px-3 py-5 sm:p-6  [ nc-box-has-hover ] [ nc-dark-box-bg-has-hover ]  ${className}`}
      data-nc-id="CardCategory6"
    >
      <NcImage
        containerClassName={`flex-shrink-0 w-20 h-20 rounded-full overflow-hidden`}
        src={thumbnail}
      />
      <div className="mt-3 ">
        <h2 className={`text-base sm:text-lg`}>
          <span className="line-clamp-1 font-semibold ">{name}</span>
        </h2>
        <p>{description}</p>
      </div>
    </Link>
  );
};

export default CardCategory6;
