import React, { FC, useEffect, useState } from "react";
import Card8 from "components/Card8/Card8";
import HeaderFilter from "./HeaderFilter";
import Card9 from "components/Card9/Card9";
import { FetchCourseType } from "data/types";
import { PostDataType } from "data/types";

interface SectionMagazine1Props {
  tabs: string[];
  posts: PostDataType[];
  heading?: string;
  desc?: string;
  className?: string;
}

interface Props {
  courses: FetchCourseType[];
  tabs: any;
  className: string;
  heading: string;
  desc: string;
  bestSeller: FetchCourseType[];
}

const CoursesForYou: FC<Props> = ({
  courses,
  bestSeller,
  tabs,
  className = "",
  heading = "Latest Articles 🎈 ",
  desc = "",
}) => {
  const [tabActive, setTabActive] = useState<string>(tabs[0]);
  const [localCourses, setLocalCourses] = useState<FetchCourseType[]>([]);
  // When handeClicktab please get courses from api,... and pass to new state (newcourses) and pass to
  const handleClickTab = (item: string) => {
    switch (item) {
      case "Todo":
        setLocalCourses(courses);
        break;
      case "Novedades":
        const newCourses = courses.filter((course, i: number) => course.is_new);
        console.log(newCourses);
        setLocalCourses(newCourses);
        break;
      case "Recomendados":
        setLocalCourses(bestSeller);
        break;
      case "Especialidades":
        const specialtyCourses = courses.filter(
          (course) =>
            !course.categories.some(
              (category) => category.name === "Medicina general"
            )
        );

        console.log(specialtyCourses);
        setLocalCourses(specialtyCourses);
        break;
    }
    setTabActive(item);
  };

  useEffect(() => {
    setLocalCourses(courses);
  }, [courses]);

  return (
    <div className={`nc-CoursesForYou ${className}`}>
      <HeaderFilter
        tabActive={tabActive}
        tabs={tabs}
        desc={desc}
        heading={heading}
        onClickTab={handleClickTab}
      />

      {!localCourses.length && <span>No encontramos publicaciones.!</span>}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
        {localCourses[0] && (
          <Card8 className="sm:col-span-2 rounded-3xl" post={localCourses[0]} />
        )}
        {localCourses
          .filter((_: FetchCourseType, i: number) => i < 3 && i >= 1)
          .map((item: FetchCourseType, index: number) => (
            <Card9
              key={index}
              post={item}
              badgeColor="yellow"
              showDescription
            />
          ))}
        {localCourses
          .filter((_: FetchCourseType, i: number) => i < 5 && i >= 3)
          .map((item: FetchCourseType, index: number) => (
            <Card9
              key={index}
              post={item}
              badgeColor="yellow"
              showDescription
            />
          ))}
        {localCourses[5] && (
          <Card8
            className="sm:col-span-2 rounded-3xl"
            badgeColor="yellow"
            post={localCourses[5]}
          />
        )}
      </div>
    </div>
  );
};

export default CoursesForYou;
