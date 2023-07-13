import React, { FC } from "react";
import Badge from "components/Badge/Badge";

export interface CategoryBadgeListProps {
  className?: string;
  itemClass?: string;
  categories: any[];
  color?: string;
  isCourse?: boolean;
}

const CategoryBadgeList: FC<CategoryBadgeListProps> = ({
  className = "flex flex-wrap",
  itemClass,
  categories,
  color = "yellow",
  isCourse
}) => {

  return (
    <div
      className={`nc-CategoryBadgeList ${className}`}
      data-nc-id="CategoryBadgeList"
    >
      {isCourse && (
        <Badge
          className={itemClass}
          name={"Curso"}
          color={"blue"}
        />
      )}
      {categories.map((item, index) => (
        <Badge
          className={itemClass}
          key={index}
          name={item.name}
          color={color}
        />
      ))}
    </div>

  );
};

export default CategoryBadgeList;
