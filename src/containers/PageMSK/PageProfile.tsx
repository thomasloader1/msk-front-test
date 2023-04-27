import React, { FC, useEffect, useState } from "react";
import { DEMO_POSTS } from "data/posts";
import { FetchPostType, PostAuthorType, PostDataType } from "data/types";
import Nav from "components/Nav/Nav";
import NavItem from "components/NavItem/NavItem";
import Avatar from "components/Avatar/Avatar";
import ArchiveFilterListBox from "components/ArchiveFilterListBox/ArchiveFilterListBox";
import { Helmet } from "react-helmet";
import BackgroundSection from "components/BackgroundSection/BackgroundSection";
import { USERS } from "data/users";
import Card2 from "components/Card2/Card2";
import StorePagination from "components/Store/StorePagination";
import SectionSliderPosts from "./home/SectionSliderPosts";
import { HOME_COURSES } from "data/MSK/courses";
import axios from "axios";
import { API_URL } from "data/api";

export interface PageAuthorProps {
  className?: string;
}
const USER: PostAuthorType = USERS[0];
const FILTERS = [{ name: "Más recientes" }, { name: "Más vistos" }];
const TABS = ["Todo", "Mis cursos", "Favoritos"];

const PageAuthor: FC<PageAuthorProps> = ({ className = "" }) => {
  const [posts, setPosts] = useState<FetchPostType[]>([]);
  const [tabActive, setTabActive] = useState<string>(TABS[0]);
  const fetchPosts = async () => {
    const res = await axios.get(`${API_URL}/posts`);
    const formattedPosts = res.data.posts.map((post: any) => ({
      ...post,
      image: post.thumbnail,
    }));
    setPosts(formattedPosts);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleClickTab = (item: string) => {
    if (item === tabActive) {
      return;
    }
    setTabActive(item);
  };

  const onPageChange = (page: number) => {
    console.log("Change", page);
  };

  return (
    <div className={`nc-PageAuthor  ${className}`} data-nc-id="PageAuthor">
      <Helmet>
        <title>My Profile</title>
      </Helmet>

      {/* HEADER */}
      <div className="">
        <div className="bg-neutral-200 dark:bg-neutral-900 dark:border dark:border-neutral-700 p-5 lg:p-16 flex flex-col sm:items-center">
          <Avatar
            containerClassName="dark:ring-0 shadow-2xl"
            imgUrl={USER.avatar}
            sizeClass="w-20 h-20 text-xl lg:text-2xl lg:w-36 lg:h-36"
            radius="rounded-xl"
          />
          <div className="mt-8 sm:mt-6 sm:ml-8 space-y-4 max-w-lg text-center">
            <h2 className="inline-block text-2xl sm:text-3xl md:text-4xl font-semibold">
              {USER.displayName}
            </h2>
            <span className="block text-sm text-neutral-6000 dark:text-neutral-300 md:text-base">
              {USER.desc}
            </span>
          </div>
        </div>
      </div>
      {/* ====================== END HEADER ====================== */}

      <div className="container py-16 lg:pb-28 lg:pt-20 space-y-16 lg:space-y-28">
        <main>
          {/* TABS FILTER */}
          <div className="flex flex-col sm:items-center sm:justify-between sm:flex-row">
            <Nav className="sm:space-x-2">
              {TABS.map((item, index) => (
                <NavItem
                  key={index}
                  isActive={tabActive === item}
                  onClick={() => handleClickTab(item)}
                >
                  {item}
                </NavItem>
              ))}
            </Nav>
            <div className="block my-4 border-b w-full border-neutral-100 sm:hidden"></div>
            <div className="flex justify-end">
              <ArchiveFilterListBox lists={FILTERS} />
            </div>
          </div>

          {/* LOOP ITEMS */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 mt-8 lg:mt-10">
            {posts.map((post) => (
              <Card2 key={post.id} post={post} hideDesc hideAuthor />
            ))}
          </div>

          {/* PAGINATION */}
          <div className="flex justify-center">
            <StorePagination
              totalPages={4}
              currentPage={1}
              onPageChange={onPageChange}
            />
          </div>
        </main>
        <div className="relative py-16 my-32">
          <BackgroundSection />
          <SectionSliderPosts
            postCardName="card9"
            heading="Nuestros cursos mas elegidos"
            subHeading="Profesionales como tú ya se capacitaron con ellos. ¡Ahora te toca a ti!"
            sliderStype="style2"
            posts={HOME_COURSES}
            uniqueSliderClass="pageHome-section6"
          />
        </div>
      </div>
    </div>
  );
};

export default PageAuthor;
