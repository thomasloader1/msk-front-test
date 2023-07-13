import React, { FC, useEffect, useRef, useState } from "react";
import { SinglePageType } from "../PageMission";
import { useLocation } from "react-router";
import SectionSliderPosts from "../home/SectionSliderPosts";
import BackgroundSection from "components/BackgroundSection/BackgroundSection";
import axios from "axios";
import { API_URL } from "data/api";
import CardAuthor2 from "components/CardAuthor2/CardAuthor2";
import { Link } from "react-router-dom";
import NcImage from "components/NcImage/NcImage";

export interface SingleContentProps {
  data: SinglePageType;
}

const SingleContent: FC<SingleContentProps> = ({ data }) => {
  // const fetchCourses = async () => {
  //   const res = await axios.get(`${API_URL}/products?country=mx`);
  //   setCourses(res.data.products);
  // };
  const [courses, setCourses] = useState([]);
  const [recommendedCourses, setRecommendedCourses] = useState([]);
  const {
    tags,
    author,
    commentCount,
    comments,
    excerpt,
    contenido,
    date,
    cursos_recomendados,
  } = data;
  const commentRef = useRef<HTMLDivElement>(null);
  //
  const location = useLocation();

  useEffect(() => {
    // fetchCourses();

    setRecommendedCourses(data.cursos_recomendados);
  }, [data]);

  useEffect(() => {
    //  SCROLL TO COMMENT AREA
    if (location.hash !== "#comment") {
      return;
    }
    //
    if (location.hash === "#comment") {
      setTimeout(() => {
        if (commentRef.current) {
          commentRef.current.scrollIntoView();
        }
      }, 500);
    }
  }, [location]);

  return (
    <div className="nc-SingleContent space-y-10">
      {/* ENTRY CONTENT */}
      <div className="grid grid-cols-12 gap-4">
        <div className="content-container col-span-12 lg:col-span-8">
          <CardAuthor2 className="relative my-4" date={date} author={author} />
          <div
            id="single-entry-content"
            className="prose lg:prose-lg !max-w-screen-md mx-auto dark:prose-invert"
          >
            {contenido && (
              <div
                className="text-xl"
                dangerouslySetInnerHTML={{ __html: contenido }}
              />
            )}

            <p className="font-lora text-slate-500 text-xl">
              ¿Te gustaría alcanzar nuevos objetivos y obtener un mayor
              reconocimiento en tu profesión?
            </p>
          </div>
        </div>
        <div className="col-span-12 lg:col-span-4">
          <div className="side-content rounded-2xl ">
            <div className="flex w-full">
              <h5 className="side-content-header p-3 py-6">
                🎯 Los más leídos
              </h5>
              <Link
                to={`/tienda`}
                className="course-network text-primary font-semibold text-sm my-auto ml-auto mr-4"
              >
                Ver todos
              </Link>
            </div>
            {recommendedCourses.map((course: any, index: number) => (
              <a
                href={course.link}
                key={`rc_${index}`}
                target="_blank"
                className="side-content-course"
              >
                <NcImage
                  containerClassName="flex-shrink-0 h-12 w-12 rounded-lg overflow-hidden lg:h-14 lg:w-14"
                  src={course.image}
                />

                {course.title}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* TAGS */}
      {/* <div className="relative py-16 my-32">
        <BackgroundSection />
        <SectionSliderPosts
          postCardName="card9"
          heading="Comienza tu experiencia aquí"
          subHeading="Estos son los cursos más elegidos entre profesionales de la salud"
          sliderStype="style2"
          posts={courses}
          uniqueSliderClass="pageHome-section6"
        />
      </div> */}
    </div>
  );
};

export default SingleContent;
