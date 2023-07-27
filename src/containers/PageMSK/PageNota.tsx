import React, { FC, ReactNode, useEffect, useState } from "react";
import { PostDataType, TaxonomyType } from "data/types";
import SingleContent from "../PageMSK/note/SingleContent";
import { CommentType } from "components/CommentCard/CommentCard";
import { useAppDispatch } from "app/hooks";
import { changeCurrentPage } from "app/pages/pages";
import SingleHeader from "../PageMSK/note/SingleHeader";
import { useParams } from "react-router-dom";
import axios from "axios";
import { API_URL } from "data/api";
import NcImage from "components/NcImage/NcImage";
import ImageSkeleton from "components/Skeleton/ImageSkeleton";
import TextSkeleton from "components/Skeleton/TextSkeleton";
import TitleSkeleton from "components/Skeleton/TitleSkeleton";
import ItemSkeleton from "components/Skeleton/ItemSkeleton";

const SINGLE: SinglePageType = {
  id: "eae0212192f63287e0c212",
  featured_image: "/src/images/misc/mission.png",
  title: "Nuestra misión",
  desc: "Medical & Scientific Knowledge es una propuesta moderna que desafía a expandir las metas profesionales. Nuestra presencia en Latinoamérica y España promueve la difusión de un nuevo concepto en e-learning que transforma la experiencia de aprendizaje a distancia del personal de la salud hispanoparlante, con orientación hacia los resultados y el éxito profesional.",
  date: "May 20, 2021",
  href: "/single/this-is-single-slug",
  commentCount: 14,
  viewdCount: 2378,
  readingTime: 6,
  bookmark: { count: 3502, isBookmarked: false },
  like: { count: 773, isLiked: true },
  author: {
    id: 10,
    firstName: "Mimi",
    lastName: "Fones",
    displayName: "Fones Mimi",
    email: "mfones9@canalblog.com",
    avatar: "",
    count: 38,
    href: "/author/the-demo-author-slug",
    desc: "There’s no stopping the tech giant. Apple now opens its 100th store in China.There’s no stopping the tech giant.",
    jobName: "Author Job",
  },
  categories: [
    {
      id: 1,
      name: "Garden",
      href: "/archive/the-demo-archive-slug",
      thumbnail:
        "https://images.unsplash.com/photo-1461354464878-ad92f492a5a0?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fGdhcmRlbmluZ3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=60",
      count: 13,
      color: "pink",
      taxonomy: "category",
    },
    {
      id: 2,
      name: "Jewelry",
      href: "/archive/the-demo-archive-slug",
      thumbnail:
        "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NjV8fGpld2Vscnl8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=60",
      count: 16,
      color: "red",
      taxonomy: "category",
    },
  ],
  postType: "standard",
  tags: [],
  content: "",
  comments: [],
};

export interface PageSingleTemp3SidebarProps {
  className?: string;
}

export interface SinglePageType extends PostDataType {
  tags: TaxonomyType[];
  content: string | ReactNode;
  comments: CommentType[];
}

interface ParamsType {
  slug: string;
}

const PageNota: FC<PageSingleTemp3SidebarProps> = ({ className = "" }) => {
  const dispatch = useAppDispatch();
  const { slug } = useParams<ParamsType>();
  const [note, setNote] = useState<SinglePageType>();
  const [loading, setLoading] = useState<boolean>(true);
  // UPDATE CURRENTPAGE DATA IN PAGEREDUCERS
  useEffect(() => {
    dispatch(changeCurrentPage({ type: "/single/:slug", data: SINGLE }));

    async function getNote() {
      const { data } = await axios.get(`${API_URL}/posts/${slug}`);
      setNote(data.posts[0]);
      setLoading(false);
    }

    // console.log({ slug });

    getNote();

    return () => {
      dispatch(changeCurrentPage({ type: "/", data: {} }));
      setNote(undefined);
    };
  }, []);

  return (
    <>
      {loading ? (
        <>
          <header className="relative pt-16 z-10 md:py-20 lg:py-14 dark:bg-black background-note-blog">
            {/* SINGLE HEADER */}
            <div className="container relative overflow-hidden ">
              <TitleSkeleton />
            </div>
            {/* FEATURED IMAGE */}
            <div className="container relative overflow-hidden mt-16">
              <ImageSkeleton height="500px" />
            </div>
          </header>
          <div className="container my-16">
            <div className="grid grid-cols-12 gap-4 mx-auto">
              <ItemSkeleton className="col-span-12 lg:col-span-9" />
              <ItemSkeleton className="col-span-12 lg:col-span-3" />
              <ItemSkeleton className="col-span-12 lg:col-span-9 mt-16" />
            </div>
          </div>
        </>
      ) : (
        note && (
          <div
            className={`nc-PageSingleTemp3¸Sidebar ${className}`}
            data-nc-id="PageSingleTemp3Sidebar"
          >
            <header className="relative pt-16 z-10 md:py-20 lg:py-14 dark:bg-black background-note-blog">
              {/* SINGLE HEADER */}
              <div className="dark container relative z-10">
                <div>
                  <SingleHeader
                    hiddenDesc={false}
                    metaActionStyle="style2"
                    pageData={note}
                  />
                </div>
              </div>
              {/* FEATURED IMAGE */}
              {note.featured_image && note.featured_image.length ? (
                <div className="container rounded-lg md:rounded-[40px] relative overflow-hidden top-8 header-image-container">
                  <NcImage
                    containerClassName="absolute inset-0"
                    src={note.featured_image[0]}
                    className="object-cover w-full h-full"
                  />
                </div>
              ) : null}
            </header>

            {/* SINGLE MAIN CONTENT */}
            <div className="container flex flex-col colspan-12 w-full my-10 lg:flex-row note-container">
              <div className="w-full">
                <SingleContent data={note} />
              </div>
            </div>

            {/* RELATED POSTS */}
            {/* <SingleRelatedPosts /> */}
          </div>
        )
      )}
    </>
  );
};

export default PageNota;
