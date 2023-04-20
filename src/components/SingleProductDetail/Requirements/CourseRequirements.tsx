import React, { FC } from "react";
import imgAdsDef from "images/vectors/doctor_2.png";
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
    <div className="requirements">
      <div>
        <h3>Qué necesitas</h3>
        <ul>
          <li className="flex gap-1">
            <img src="/src/images/vectors/isotipo.svg" width="20" alt="" />{" "}
            <span>Ser profesional médico</span>
          </li>
          <li className="flex gap-1">
            <img src="/src/images/vectors/isotipo.svg" width="20" alt="" />{" "}
            <span>Ser profesional médico</span>
          </li>
        </ul>
      </div>
      <img src={imgAds} alt="" className="absolute-img" />
    </div>
  );
};

export default SectionAds;
