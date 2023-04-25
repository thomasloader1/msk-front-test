import { Category, PostDataType } from "data/types";
import React, { FC } from "react";
import Badge from "components/Badge/Badge";

export interface CategoryBadgeListProps {
  className?: string;
  itemClass?: string;
  categories: any[];
  color?: string;
}

const CategoryBadgeList: FC<CategoryBadgeListProps> = ({
  className = "flex flex-wrap",
  itemClass,
  categories,
  color,
}) => {
  return (
    <div
      className={`nc-CategoryBadgeList ${className}`}
      data-nc-id="CategoryBadgeList"
    >
      {categories.map((item, index) => (
        <Badge className={itemClass} key={index} name={item.name} />
      ))}
    </div>
  );
};

export default CategoryBadgeList;
