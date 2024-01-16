import React, { FC } from "react";
import Badge from "components/Badge/Badge";
import { slugifySpecialty } from "lib/Slugify";
import { badgeColor } from "lib/badgeColor";
import notesMapping from "../../data/jsons/__notes.json";
import { JsonMapping } from "data/types";

export interface CategoryBadgeListProps {
  className?: string;
  itemClass?: string;
  categories: any[];
  color?: string;
  isCourse?: boolean;
  isPost?: boolean;
  isEbook?: boolean;
}

const CategoryBadgeList: FC<CategoryBadgeListProps> = ({
  className = "flex flex-wrap",
  itemClass,
  categories,
  color = "yellow",
  isCourse,
  isPost,
  isEbook,
}) => {
  const notesJSON: JsonMapping = notesMapping;

  return (
    <div
      className={`nc-CategoryBadgeList ${className}`}
      data-nc-id="CategoryBadgeList"
    >
      {isEbook && <Badge className={itemClass} name={"Curso"} color={"blue"} />}

      {isCourse && (
        <>
          {categories.map((item, index) => (
            <Badge
              className={itemClass}
              key={index}
              name={item.name}
              color={color}
              href={`/tienda?especialidad=${slugifySpecialty(
                item.name
              )}&recurso=curso`}
            />
          ))}
        </>
      )}

      {isPost && (
        <>
          {categories.map((item, index) => (
            <Badge
              className={itemClass}
              key={index}
              name={notesJSON[slugifySpecialty(item.name)]}
              color={badgeColor(notesJSON[slugifySpecialty(item.name)])}
              href={`/archivo?categoria=${slugifySpecialty(item.name)}`}
            />
          ))}
        </>
      )}
    </div>
  );
};

export default CategoryBadgeList;
