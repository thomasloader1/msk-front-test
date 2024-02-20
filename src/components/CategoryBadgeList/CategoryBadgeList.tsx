import React, { FC, useEffect } from "react";
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
  isTrial?: boolean;
  textSize?: string;
}

const CategoryBadgeList: FC<CategoryBadgeListProps> = ({
  className = "flex flex-wrap",
  itemClass,
  categories,
  color = "yellow",
  isCourse,
  isPost,
  isEbook,
  isTrial,
  textSize,
}) => {
  const notesJSON: JsonMapping = notesMapping;
  const [sortedCategories, setSortedCategories] = React.useState<any[]>([]);
  useEffect(() => {
    const compararPorSlug = (a: any, b: any) => {
      const slugA = a.slug.toLowerCase();
      const slugB = b.slug.toLowerCase();
      if (slugA.includes("actualidad") && !slugB.includes("actualidad")) {
        return 1;
      } else if (
        !slugA.includes("actualidad") &&
        slugB.includes("actualidad")
      ) {
        return -1;
      }
      return 0;
    };

    const sortedCategoriesList = categories.sort(compararPorSlug);

    setSortedCategories(sortedCategoriesList);
  }, [categories]);

  return (
    <div
      className={`nc-CategoryBadgeList ${className}`}
      data-nc-id="CategoryBadgeList"
    >
      {isEbook && (
        <Badge
          className={itemClass}
          name={"Guía profesional"}
          color={"emerald-post"}
          href={`/tienda?recurso=guias-profesionales`}
          icon="elearning"
        />
      )}
      {isCourse && (
        <>
          {sortedCategories.map((item, index) => (
            <Badge
              className={itemClass}
              key={index}
              name={item.name}
              color={color}
              href={`/tienda?especialidad=${slugifySpecialty(
                item.name
              )}&recurso=curso`}
              textSize={textSize}
            />
          ))}
        </>
      )}
      {isPost && (
        <>
          {sortedCategories.map((item, index) => (
            <Badge
              className={itemClass}
              key={index}
              name={notesJSON[slugifySpecialty(item.name)]}
              color={badgeColor(notesJSON[slugifySpecialty(item.name)])}
              href={`/archivo?categoria=${slugifySpecialty(item.name)}`}
              textSize={textSize}
            />
          ))}
        </>
      )}
      {isTrial && (<Badge
              className={itemClass}
              name={"Trial"}
              color={"purple"}
              textSize={"text-[11px]"}

            />)}
    </div>
  );
};

export default CategoryBadgeList;
