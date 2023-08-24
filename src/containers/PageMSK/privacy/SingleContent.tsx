import React, { FC, useEffect, useRef } from "react";
import { SinglePageType } from "../PageMission";
import { useLocation } from "react-router";
import SectionSliderPosts from "../home/SectionSliderPosts";
import BackgroundSection from "components/BackgroundSection/BackgroundSection";
import useBestSellers from "hooks/useBestSellers";

export interface SingleContentProps {
  data: SinglePageType;
}

const SingleContent: FC<SingleContentProps> = ({ data }) => {
  const commentRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const { courses, loading, error } = useBestSellers();

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

      {data?.content && (
        <div
          id="single-entry-content"
          className="prose lg:prose-lg !max-w-screen-md mx-auto dark:prose-invert"
          dangerouslySetInnerHTML={{ __html: data.content as string }}
        />
      )}

      {data?.terminos &&
        data.terminos.map(t => (
          <div>
            <h2 className="font-raleway text-2xl mb-7">{t.titulo}</h2>
            <div dangerouslySetInnerHTML={{ __html: t.descripcion }} />
          </div>
        ))}

      {/* TAGS */}
      <div className="relative py-16 my-32">
        <BackgroundSection />
        <SectionSliderPosts
          postCardName="card9"
          heading="Comienza tu experiencia aquí"
          subHeading="Estos son los cursos más elegidos entre profesionales de la salud"
          sliderStype="style2"
          posts={courses}
          uniqueSliderClass="pageHome-section6"
        />
      </div>
    </div>
  );
};

export default SingleContent;
