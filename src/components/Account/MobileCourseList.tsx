import React, { FC } from "react";
import MobileCourseItem from "./MobileCourseItem";
import { UserCourseProgress } from "data/types";

interface MobileCourseListProps {
  items: UserCourseProgress[];
  email: string;
  goToLMS: (
    product_code: number,
    cod_curso: string,
    email: string
  ) => Promise<void>;
}

const MobileCourseList: FC<MobileCourseListProps> = ({
  items,
  email,
  goToLMS,
}) => {
  return (
    <>
      {items.map((item) => (
        <MobileCourseItem
          key={item.product_code}
          item={item}
          email={email}
          goToLMS={goToLMS}
        />
      ))}
    </>
  );
};

export default MobileCourseList;
