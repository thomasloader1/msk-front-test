import React, { FC } from "react";
import NcImage from "@/components/NcImage/NcImage";
import { TaxonomyType, TwMainColor } from "@/data/types";
import Badge from "@/components/Badge/Badge";
import NcLink from "../NcLink/NcLink";

export interface CardCategory6Props {
  className?: string;
  taxonomy: any;
  index?: string;
  hideDescriptionMobile?: boolean;
}

const CardCategory6: FC<CardCategory6Props> = ({
  className = "",
  taxonomy,
  index,
  hideDescriptionMobile = false,
}) => {
  const { description, href = "/", name } = taxonomy;
  let thumbnail = "/imagescourses/";
  switch (name) {
    case "Cardiología":
      thumbnail = thumbnail + "cardiology.png";
      break;
    case "Urgencia":
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
    <>
      {name.includes("Centro de ayuda") ? (
        <a
          href={href}
          target="_blank"
          className={`nc-CardCategory6 relative flex flex-col items-center justify-center text-center px-3 py-5 sm:p-6  [ nc-box-has-hover ] [ nc-dark-box-bg-has-hover ]  ${className}`}
          data-nc-id="CardCategory6"
        >
          <NcImage
            containerClassName={`flex-shrink-0 w-20 h-20 rounded-full overflow-hidden`}
            src={thumbnail}
            alt=""
          />
          <div className="mt-3 ">
            <h2 className={`text-base sm:text-lg`}>
              <span className="line-clamp-1 font-semibold ">{name}</span>
            </h2>
            <p className={`${hideDescriptionMobile && "hidden sm:block"}`}>
              {description}
            </p>
          </div>
        </a>
      ) : (
        <NcLink
          href={href}
          className={`nc-CardCategory6 relative flex flex-col items-center justify-center text-center px-3 py-5 sm:p-6  [ nc-box-has-hover ] [ nc-dark-box-bg-has-hover ]  ${className}`}
          data-nc-id="CardCategory6"
        >
          <NcImage
            containerClassName={`flex-shrink-0 w-20 h-20 rounded-full overflow-hidden`}
            src={thumbnail}
            alt=""
            width="50"
            height="50"
          />
          <div className="mt-3 ">
            <h2 className={`text-base sm:text-lg`}>
              <span className="line-clamp-1 font-semibold ">{name}</span>
            </h2>
            <p className={`${hideDescriptionMobile && "hidden sm:block"}`}>
              {description}
            </p>
          </div>
        </NcLink>
      )}
    </>
  );
};

export default CardCategory6;
