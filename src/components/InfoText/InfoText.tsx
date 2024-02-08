import React, { FC } from "react";
import infoIcon from "/images/icons/info.svg";

interface InfoTextProps {
  addClassNames?: string;
  text: string;
}

const InfoText: FC<InfoTextProps> = ({ addClassNames, text }) => {
  return (
    <span
      className={`${addClassNames} dark:text-primary-500 forgot-password col-span-2 text-sm flex items-center`}
    >
      <img src={infoIcon} alt="Mensaje Informativo" className="mr-1" />
      <span className="text-violet-wash">{text}</span>
    </span>
  );
};

export default InfoText;
