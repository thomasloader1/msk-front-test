import React, { FC, useState } from "react";
import Card8 from "components/Card8/Card8";
import HeaderFilter from "./HeaderFilter";
import Card9 from "components/Card9/Card9";
import { CourseDataType } from "data/types";
import { PostDataType } from "data/types";

interface SectionMagazine1Props {
  tabs: string[];
  posts: PostDataType[];
  heading?: string;
  className?: string;
}

interface Props {
  courses: CourseDataType[];
  tabs: any;
  className: string;
  heading: string;
}

const SectionMagazine4: FC<Props> = ({
  courses,
  tabs,
  className = "",
  heading = "Latest Articles 🎈 ",
}) => {
  const [tabActive, setTabActive] = useState<string>(tabs[0]);
  // When handeClicktab please get courses from api,... and pass to new state (newcourses) and pass to
  const handleClickTab = (item: string) => {
    if (item === tabActive) {
      return;
    }
    setTabActive(item);
  };

  return (
    <div className={`nc-SectionMagazine4 ${className}`}>
      <HeaderFilter
        tabActive={tabActive}
        tabs={tabs}
        heading={heading}
        onClickTab={handleClickTab}
      />

      {!courses.length && <span>Nothing we found!</span>}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
        {courses[0] && (
          <Card8 className="sm:col-span-2 rounded-3xl" post={courses[0]} />
        )}
        {courses
          .filter((_: CourseDataType, i: number) => i < 3 && i >= 1)
          .map((item: CourseDataType, index: number) => (
            <Card9 key={index} post={item} showDescription />
          ))}
        {courses
          .filter((_: CourseDataType, i: number) => i < 5 && i >= 3)
          .map((item: CourseDataType, index: number) => (
            <Card9 key={index} post={item} showDescription />
          ))}
        {courses[5] && (
          <Card8 className="sm:col-span-2 rounded-3xl" post={courses[5]} />
        )}
      </div>
    </div>
  );
};

export default SectionMagazine4;
