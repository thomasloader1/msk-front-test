import React, { FC } from "react";
import imgAdsDef from "images/vectors/doctor_2.png";
import ButtonPrimary from "components/Button/ButtonPrimary";
import { Requirement } from "data/types";
export interface CourseRequirementsProps {
  className?: string;
  imgAds?: string;
  requirements: Requirement[];
  title?: string;
}

const CourseRequirements: FC<CourseRequirementsProps> = ({
  className = "",
  imgAds = imgAdsDef,
  requirements,
  title,
}) => {
  const parse = (htmlString: string) => {
    const cleanedString = htmlString.replace(/<\/?ul>|<\/?li>/g, "");

    const listItems = cleanedString
      .split("\n")
      .filter((item) => item.trim() !== "");

    return listItems;
  };

  return (
    <div className="requirements">
      <div>
        <h3 className="text-xl">{title}</h3>
        {requirements.map((requirement, index) => {
          return (
            <ul key={`req_${index}`}>
              {parse(requirement.description).map((item, i_index) => (
                <li
                  className="flex gap-1 items-start"
                  key={`req_item_${i_index}`}
                >
                  <img
                    src="/src/images/vectors/isotipo.svg"
                    width="14"
                    className="mt-2"
                    alt=""
                  />{" "}
                  <span
                    dangerouslySetInnerHTML={{
                      __html: item,
                    }}
                  />
                </li>
              ))}
            </ul>
          );
        })}
      </div>
      <img src={imgAds} alt="" className="absolute-img" />
    </div>
  );
};

export default CourseRequirements;
