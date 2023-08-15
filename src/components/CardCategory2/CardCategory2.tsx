import React, { FC } from "react";
import NcImage from "components/NcImage/NcImage";
import { TaxonomyType, TwMainColor } from "data/types";
import { Link } from "react-router-dom";
import Badge from "components/Badge/Badge";

export interface CardCategory2Props {
  className?: string;
  taxonomy: any;
  index?: string;
}

const CardCategory2: FC<CardCategory2Props> = ({
  className = "",
  taxonomy,
  index,
}) => {
  const { count, href = "/", name, color } = taxonomy;
  let thumbnail = "/src/images/courses/";
  switch (name) {
    case "Cardiología":
      thumbnail = thumbnail + "cardiology.png";
      break;
    case "Emergentología":
      thumbnail = thumbnail + "urgencias.png";
      break;
    case "Enfermería":
      thumbnail = thumbnail + "nursing.png";
      break;
    case "Medicina general":
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
      break;
    case "Configurar mi cuenta":
      thumbnail = thumbnail + "gauge.png";
      break;
  }
  return (
    <Link
      to={href}
      className={`nc-CardCategory2 relative flex flex-col items-center justify-center text-center px-3 py-5 sm:p-6  [ nc-box-has-hover ] [ nc-dark-box-bg-has-hover ] ${className}`}
      data-nc-id="CardCategory2"
    >
      {index && (
        <Badge
          color={color as TwMainColor}
          name="NUEVO"
          className="absolute -top-2 sm:top-3 left-3"
        />
      )}
      <NcImage
        containerClassName={`flex-shrink-0 w-20 h-20 rounded-full overflow-hidden`}
        src={thumbnail}
      />
      <div className="mt-3 ">
        <h2 className={`text-base sm:text-lg font-medium`}>
          <span className="line-clamp-1">{name}</span>
        </h2>
        {/* <span
          className={`block mt-[2px] text-sm text-neutral-500 dark:text-neutral-400`}
        >
          {count} Articles
        </span> */}
      </div>
    </Link>
  );
};

export default CardCategory2;
