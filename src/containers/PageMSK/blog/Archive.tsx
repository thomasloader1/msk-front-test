import React, { FC, ReactNode, useContext, useEffect, useState } from "react";
import { JsonMapping, PostDataType, TaxonomyType } from "data/types";
import NcImage from "components/NcImage/NcImage";
import { CommentType } from "components/CommentCard/CommentCard";
import Card11 from "components/Card11/Card11";
import StorePagination from "components/Store/StorePagination";
import SectionSliderPosts from "../home/SectionSliderPosts";
import BackgroundSection from "components/BackgroundSection/BackgroundSection";
import LoadingImage from "components/Loader/Image";
import ArchiveFilterListBox from "components/ArchiveFilterListBox/ArchiveFilterListBox";
import { removeAccents } from "lib/removeAccents";
import Button from "components/Button/Button";
import NcModal from "components/NcModal/NcModal";
import SpecialtiesModal from "../note/SpecialtiesModal";
import { DataContext } from "context/data/DataContext";
import PageHead from "../PageHead";
import notesMapping from "../../../data/jsons/__notes.json";

export interface PageArchiveProps {
  className?: string;
}

export interface SinglePageType extends PostDataType {
  tags: TaxonomyType[];
  content: string | ReactNode;
  comments: CommentType[];
}

const CATEGORIES_FILTERS = [
  { name: "Otras categorías" },
  { name: "Actualidad" },
  { name: "Entrevistas" },
  { name: "Opinión" },
];
const FILTERS = [{ name: "Más recientes" }, { name: "Más leídos" }];

const PageArchive: FC<PageArchiveProps> = ({ className = "" }) => {
  const {
    state: dataState,
    loadingCourses,
    loadingPosts,
    loadingBestSellers,
  } = useContext(DataContext);
  const { allPosts, allBestSellers } = dataState;
  const [posts, setPosts] = useState(allPosts);
  const [auxPosts, setAuxPosts] = useState(allPosts);
  const [bestSeller, setBestSeller] = useState([]);

  useEffect(() => {
    setPosts(allPosts);
    setAuxPosts(allPosts);
    setBestSeller(allBestSellers);
  }, [allPosts, allBestSellers]);

  const [title, setTitle] = useState("Actualidad");
  const [currentPage, setCurrentPage] = useState(1);
  const [showSpecialties, setShowSpecialties] = useState(false);
  const itemsPerPage = 12;

  // pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems: any[] = posts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(posts.length / itemsPerPage);
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleCategoryChange = (e: { name: string }) => {
    if (e.name == "Otras categorías") return setPosts(auxPosts);
    let filteredPosts = auxPosts.filter((post: PostDataType) => {
      return post.categories.some((category) =>
        category.name.includes(removeAccents(e.name))
      );
    });
    setTitle(e.name);
    setPosts(filteredPosts);
  };

  const handleFilterChange = (e: { name: string }) => {
    let filteredPosts: any = [...auxPosts];
    if (e.name === "Más recientes") {
      filteredPosts.sort((a: { date: string }, b: { date: string }) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      });
      setPosts(filteredPosts);
    }
    if (e.name === "Más leídos") {
      const the_most_read = filteredPosts[0].the_most_read.map(
        (post: { category: string }) => {
          return {
            ...post,
            categories: [
              { name: post.category, slug: post.category.toLowerCase() },
            ],
          };
        }
      );
      setPosts(the_most_read);
    }
  };

  useEffect(() => {
    let categoryValue = decodeURIComponent(
      window.location.search.replace(/^.*\?categoria=/, "")
    );

    const notesJSON: JsonMapping = notesMapping;

    setTitle(
      categoryValue && !categoryValue.includes("Otra")
        ? notesJSON[categoryValue]
        : "Actualidad"
    );
    const filteredPosts = auxPosts.filter((post: PostDataType) => {
      console.log(post.categories, categoryValue);
      return post.categories.some((category) =>
        category.name.includes(notesJSON[categoryValue])
      );
    });

    setPosts(filteredPosts);
  }, [window.location.search]);

  let loaders = [];
  for (let i = 0; i < 6; i++) {
    loaders.push(<LoadingImage key={`loader_${i}`} />);
  }

  return (
    <>
      <PageHead title="Archivo" />
      <div
        className={`nc-PageArchive pt-8 lg:pt-8 ${className} animate-fade-down`}
        data-nc-id="PageArchive"
      >
        {currentItems.length ? (
          <header className="w-full px-2 xl:max-w-screen-2xl mx-auto">
            <div className="container relative aspect-w-16 aspect-h-13 sm:aspect-h-9 lg:aspect-h-8 xl:aspect-h-5 rounded-3xl md:rounded-[40px] overflow-hidden z-0">
              <NcImage
                className="rounded-3xl md:rounded-[40px] object-cover absolute inset-0 w-full h-full"
                src="/images/banners/archive.jpg"
              />

              <div className="absolute inset-0 bg-black text-white bg-opacity-30 flex flex-col items-center justify-center">
                <h2 className="inline-block align-middle text-5xl font-semibold md:text-7xl ">
                  {title}
                </h2>
                <span className="block mt-4 text-neutral-300">
                  {[posts.length]} Artículos
                </span>
              </div>
            </div>
          </header>
        ) : null}
        <div className="container my-10 animate-fade-down">
          <div className="flex space-between mb-8">
            <ArchiveFilterListBox
              setFilter={handleCategoryChange}
              lists={CATEGORIES_FILTERS}
            />
            <Button
              onClick={() => setShowSpecialties(true)}
              sizeClass="px-4 py-2 sm:px-5"
              className="border-solid border-1 border-neutral-200 text-neutral-500 ml-2"
              bordered
            >
              <span className="text-sm">Ver Especialidades</span>
            </Button>
            <ArchiveFilterListBox
              setFilter={handleFilterChange}
              lists={FILTERS}
              className="ml-auto"
            />
          </div>
          {loadingPosts ? (
            <div className="container grid grid-cols-3 gap-10">
              {loaders.map((loader) => {
                return loader;
              })}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 animate-fade-down">
                {posts.length ? (
                  <>
                    {currentItems.map((post, index) => (
                      <Card11
                        key={`blog_${index}`}
                        post={post}
                        className="rounded-xl"
                        kind="blog"
                      />
                    ))}
                  </>
                ) : (
                  <>
                    <h4 className="col-span-12 text-xl">
                      No hay posts disponibles para el filtro aplicado
                    </h4>
                  </>
                )}
              </div>
              <div className="flex justify-center">
                <StorePagination
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                  currentPage={currentPage}
                />
              </div>
            </>
          )}
          <div className="container relative py-16 mt-16 ">
            <BackgroundSection />
            <SectionSliderPosts
              posts={bestSeller}
              loading={loadingBestSellers}
              postCardName="card9"
              heading="¿Buscas capacitarte a distancia?"
              subHeading="Estos son los cursos más elegidos entre profesionales de la salud"
              sliderStype="style2"
              uniqueSliderClass="pageHome-section6"
            />
          </div>
        </div>
      </div>
      <NcModal
        isOpenProp={showSpecialties}
        onCloseModal={() => {
          setShowSpecialties(false);
        }}
        renderTrigger={() => {
          return null;
        }}
        contentExtraClass="max-w-screen-lg"
        renderContent={() => <SpecialtiesModal setShow={setShowSpecialties} />}
        modalTitle="Especialidades"
        modalSubtitle=""
        centerTitle
      />
    </>
  );
};

export default PageArchive;
