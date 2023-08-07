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
import NoteAuthors from "../../../components/SingleProductDetail/NoteAuthors";

export interface SingleContentProps {
  data: SinglePageType;
  sources?: string[];
}

const SingleContent: FC<SingleContentProps> = ({ data, sources }) => {
  const [isFixed, setIsFixed] = useState(false);
  const [bottomDistance, setBottomDistance] = useState(0);

  const [recommendedCourses, setRecommendedCourses] = useState([]);
  const { author, contenido, date } = data;
  const commentRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    const courseList = data.the_most_read.map((course: any) => {
      var urlParts = course.link.split("/");
      return { ...course, slug: urlParts[urlParts.length - 2] };
    });
    setRecommendedCourses(courseList);
  }, [data]);

  useEffect(() => {
    if (location.hash !== "#comment") {
      return;
    }
    if (location.hash === "#comment") {
      setTimeout(() => {
        if (commentRef.current) {
          commentRef.current.scrollIntoView();
        }
      }, 500);
    }
  }, [location]);

  let scrollPosition = 0;

  const calculateDistanceToBottom = () => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
    return documentHeight - (scrollPosition + windowHeight);
  };

  useEffect(() => {
    const handleScroll = () => {
      const threshold = 900;
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      setIsFixed(scrollTop > threshold);

      const distanceToBottom = calculateDistanceToBottom();
      const auxDistance = scrollPosition - distanceToBottom - 100;
      setBottomDistance(distanceToBottom < 420 ? auxDistance / 2 : 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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

            <div>
              <h4 className="source-title">Fuente/s:</h4>
              {sources && sources.length > 0
                ? sources.map((source, index) => {
                  return (
                    <p key={`source_${index}`} className="source-content">
                      {source}
                    </p>
                  );
                })
                : null}
            </div>
            {data.author && <NoteAuthors instructor={data.author} />}
          </div>
        </div>
        <div className="col-span-12 lg:col-span-4 relative course-video-widget">
          <div
            className={`${isFixed && bottomDistance == 0
                ? "col-span-12 lg:col-span-4 post-side-data lg:fixed lg:max-w-[330px] xl:max-w-[420px]"
                : "col-span-12 lg:col-span-4 post-side-data"
              } ${bottomDistance != 0 ? "lg:post-side-data-bottom" : ""}`}
          >
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
                <Link
                  to={`/blog/${course.slug}`}
                  key={`rc_${index}`}
                  className="side-content-course"
                >
                  <NcImage
                    containerClassName="flex-shrink-0 h-10 w-10 rounded-lg overflow-hidden lg:h-12 lg:w-12"
                    src={course.image}
                  />
                  <p>
                    <span className="category">{course.category}</span>
                    <span>{course.title}</span>
                  </p>
                </Link>
              ))}
            </div>
            {/* <div className="side-content rounded-2xl ">
              <div className="flex w-full">
                <h5 className="side-content-header p-3 py-6">
                  💼 Especialidades{" "}
                </h5>
                <Link
                  to={`/tienda`}
                  className="course-network text-primary font-semibold text-sm my-auto ml-auto mr-4"
                >
                  Ver todos
                </Link>
              </div>
              {recommendedCourses.map((course: any, index: number) => (
                <Link
                  to={`/curso/${course.slug}`}
                  key={`rc_${index}`}
                  className="side-content-course"
                >
                  <NcImage
                    containerClassName="flex-shrink-0 h-10 w-10 rounded-lg overflow-hidden lg:h-10 lg:w-10"
                    src={course.image}
                  />
                  {course.title}
                </Link>
              ))}
            </div> */}
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
