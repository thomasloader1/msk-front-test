import React, { FC } from "react";
import ButtonPrimary from "@/components/Button/ButtonPrimary";
import { Requirement } from "@/data/types";
import { StaticImageData } from "next/image";
export interface CourseRequirementsProps {
  className?: string;
  imgAds?: StaticImageData | string;
  requirements: Requirement[];
  title?: string;
}

const CourseRequirements: FC<CourseRequirementsProps> = ({
  className = "",
  imgAds = "/images/vectors/doctor_2.png",
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
      <div className="sm:pr-60 md:pr-5">
        <div className="text-xl font-raleway font-bold">{title}</div>
        {requirements.map((requirement, index) => {
          return (
            <ul key={`req_${index}`}>
              {parse(requirement.description).map((item, i_index) => (
                <li
                  className="flex gap-1 items-start"
                  key={`req_item_${i_index}`}
                >
                  <img
                    src="/images/vectors/isotipo.svg"
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
      {imgAds && <img src={imgAds as string} alt="" className="absolute-img" />}
    </div>
  );
};

export default CourseRequirements;
