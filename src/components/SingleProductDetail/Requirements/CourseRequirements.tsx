import React, { FC } from "react";
import imgAdsDef from "images/vectors/doctor_2.png";
import ButtonPrimary from "components/Button/ButtonPrimary";
import { Requirement } from "data/types";
export interface CourseRequirementsProps {
  className?: string;
  imgAds?: string;
  requirements: Requirement[];
}

const CourseRequirements: FC<CourseRequirementsProps> = ({
  className = "",
  imgAds = imgAdsDef,
  requirements,
}) => {
  return (
    <div className="requirements">
      <div>
        <h3 className="text-xl">Qué necesitas</h3>
        <ul>
          {requirements.map((requirement, index) => {
            return (
              <li className="flex gap-1" key={`req_${index}`}>
                <img src="/src/images/vectors/isotipo.svg" width="20" alt="" />{" "}
                <span>{requirement.description}</span>
              </li>
            );
          })}
        </ul>
      </div>
      <img src={imgAds} alt="" className="absolute-img" />
    </div>
  );
};

export default CourseRequirements;
