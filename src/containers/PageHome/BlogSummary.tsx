import React, { FC, useState } from "react";
import Card2 from "components/Card2/Card2";
import { BlogDataType } from "data/types";
import Card6 from "components/Card6/Card6";
import HeaderFilter from "./HeaderFilter";

export interface SectionMagazine1Props {
  tabs: string[];
  posts: BlogDataType[];
  heading?: string;
  className?: string;
}

const SectionMagazine1: FC<SectionMagazine1Props> = ({
  posts,
  tabs,
  heading = "Latest Articles 🎈 ",
  className = "",
}) => {
  const [tabActive, setTabActive] = useState<string>(tabs[0]);

  const handleClickTab = (item: string) => {
    if (item === tabActive) {
      return;
    }
    setTabActive(item);
  };

  return (
    <div className={`nc-SectionMagazine1 ${className}`}>
      <HeaderFilter
        tabActive={tabActive}
        tabs={tabs}
        heading={heading}
        onClickTab={handleClickTab}
      />
      {!posts.length && <span>Nothing we found!</span>}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
        {posts[0] && <Card2 size="large" post={posts[0]} />}
        <div className="grid gap-6 md:gap-8">
          {posts
            .map((item, index) => (
              <Card6
                key={index}
                post={item}
                className="rounded-3xl"
                authorRow
              />
            ))
            .filter((_, index) => index > 0)}
        </div>
      </div>
    </div>
  );
};

export default SectionMagazine1;
