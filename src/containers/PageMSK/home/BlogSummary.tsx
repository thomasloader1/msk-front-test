import React, { FC, useEffect, useState } from "react";
import Card2 from "components/Card2/Card2";
import { FetchPostType } from "data/types";
import Card6 from "components/Card6/Card6";
import HeaderFilter from "./HeaderFilter";
import ImageSkeleton from "components/Skeleton/ImageSkeleton";
import { useHistory } from "react-router-dom";

export interface BlogSummaryProps {
  tabs: string[];
  posts: FetchPostType[];
  heading?: string;
  className?: string;
  desc?: string;
  loading?: boolean;
}

const BlogSummary: FC<BlogSummaryProps> = ({
  posts,
  tabs,
  heading = "Blog",
  className = "",
  desc = "",
  loading = false,
}) => {
  const [tabActive, setTabActive] = useState<string>(tabs[0]);

  const [auxPosts, setPosts] = useState<FetchPostType[]>([]);
  const handleClickTab = (item: string) => {
    const filteredPosts = posts
      .filter((post) =>
        post.categories?.some((category: any) => category.name === item)
      )
      .filter((_, i: number) => i < 5 && i >= 1);
    setPosts(filteredPosts);
    if (item === tabActive) {
      return;
    }
    setTabActive(item);
  };

  const history = useHistory();

  useEffect(() => {
    setPosts(posts.filter((_, i: number) => i < 5 && i >= 1));
    let categoryValue = decodeURIComponent(
      history.location.search.replace(/^.*\?category=/, "")
    );
    handleClickTab(categoryValue || "Actualidad");
  }, [posts, history.location.search]);

  const badgeColor = (item: FetchPostType) => {
    switch (item.categories[0].name) {
      case "Medicina":
        return "blue-post";
      case "Enfermería":
        return "green-post";
      case "Actualidad":
        return "yellow-strong-post";
      case "Opinión":
        return "red-post";
      case "E-learning":
        return "orange-post";
      case "Fuera de guardia":
        return "emerald-post";
      case "E-health":
        return "yellow-post";
      case "Entrevistas":
        return "brown-post";
      default:
        return "yellow";
    }
  };

  return (
    <div className={`nc-BlogSummary ${className}`}>
      <HeaderFilter
        tabActive={tabActive}
        tabs={tabs}
        heading={heading}
        onClickTab={handleClickTab}
        desc={desc}
      />
      {loading && (
        <>
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
            <ImageSkeleton className="col-span-1" />
            <div className="grid grid-cols-1 gap-5">
              <ImageSkeleton className="col-span-2 h-100" height="100px" />
              <ImageSkeleton className="col-span-2" height="100px" />
              <ImageSkeleton className="col-span-2" height="100px" />
            </div>
          </div>
        </>
      )}
      {!auxPosts.length && !loading && <span>No hay posts disponibles</span>}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
        {auxPosts[0] && (
          <Card2
            size="large"
            post={auxPosts[0]}
            badgeColor={badgeColor(auxPosts[0])}
            kind="blog"
          />
        )}
        <div>
          <div className="grid gap-6 md:gap-8">
            {auxPosts
              .map((item, index) => (
                <Card6
                  key={index}
                  post={item}
                  badgeColor={badgeColor(item)}
                  className="rounded-3xl"
                  kind="blog"
                  authorRow
                />
              ))
              .filter((_, index) => index > 0)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogSummary;
