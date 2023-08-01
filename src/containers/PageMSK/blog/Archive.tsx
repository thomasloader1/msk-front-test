import React, { FC, ReactNode, useContext, useEffect, useState } from "react";
import { PostDataType, TaxonomyType } from "data/types";
import NcImage from "components/NcImage/NcImage";
import { CommentType } from "components/CommentCard/CommentCard";
import { useAppDispatch } from "app/hooks";
import axios from "axios";
import { API_URL } from "data/api";
import Card11 from "components/Card11/Card11";
import StorePagination from "components/Store/StorePagination";
import SectionSliderPosts from "../home/SectionSliderPosts";
import { CountryContext } from "context/country/CountryContext";
import BackgroundSection from "components/BackgroundSection/BackgroundSection";
import LoadingImage from "components/Loader/Image";
import api from "Services/api";

export interface PageArchiveProps {
  className?: string;
}

export interface SinglePageType extends PostDataType {
  tags: TaxonomyType[];
  content: string | ReactNode;
  comments: CommentType[];
}

const PageArchive: FC<PageArchiveProps> = ({ className = "" }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [bestSeller, setBestSeller] = useState([]);
  const { state } = useContext(CountryContext);
  const itemsPerPage = 12;

  // Calcular el índice del primer y último elemento en la página actual
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  // Obtener los elementos de la página actual
  const currentItems: any[] = posts.slice(indexOfFirstItem, indexOfLastItem);

  // Calcular el número total de páginas
  const totalPages = Math.ceil(posts.length / itemsPerPage);

  // Función para cambiar la página
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const fetchPosts = async () => {
    const fetchedPosts = await api.getPosts();
    setPosts(fetchedPosts);
    setLoading(false);
  };

  const fetchBestSeller = async () => {
    const fetchedBestSellers = await api.getBestSellers();
    setBestSeller(fetchedBestSellers);
  };

  useEffect(() => {
    fetchPosts();
    fetchBestSeller();
  }, []);

  let loaders = [];
  for (let i = 0; i < 6; i++) {
    loaders.push(<LoadingImage key={`loader_${i}`} />);
  }

  return (
    <>
      <div
        className={`nc-PageArchive pt-8 lg:pt-8 ${className}`}
        data-nc-id="PageArchive"
      >
        {currentItems.length ? (
          <header className="w-full px-2 xl:max-w-screen-2xl mx-auto">
            <div className="container relative aspect-w-16 aspect-h-13 sm:aspect-h-9 lg:aspect-h-8 xl:aspect-h-5 rounded-3xl md:rounded-[40px] overflow-hidden z-0">
              <NcImage
                className="object-cover w-full h-full rounded-3xl md:rounded-[40px] object-cover absolute inset-0 w-full h-full"
                src={currentItems[0].image}
              />

              <div className="absolute inset-0 bg-black text-white bg-opacity-30 flex flex-col items-center justify-center">
                <h2 className="inline-block align-middle text-5xl font-semibold md:text-7xl ">
                  Actualidad
                </h2>
                <span className="block mt-4 text-neutral-300">
                  {[posts.length]} Artículos
                </span>
              </div>
            </div>
          </header>
        ) : null}
        <div className="container my-16">
          {loading ? (
            <div className="container grid grid-cols-3 gap-10">
              {loaders.map((loader) => {
                return loader;
              })}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
                {posts.length ? (
                  <>
                    {currentItems.map((post, index) => (
                      <Card11
                        key={`post_${index}`}
                        post={post}
                        className="rounded-xl"
                      />
                    ))}
                  </>
                ) : null}
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
              loading={loading}
              postCardName="card9"
              heading="¿Buscas capacitarte a distancia?"
              subHeading="Estos son los cursos más elegidos entre profesionales de la salud"
              sliderStype="style2"
              uniqueSliderClass="pageHome-section6"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default PageArchive;
