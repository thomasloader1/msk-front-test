import React, { FC, useEffect, useRef, useState } from "react";
import BackgroundSection from "@/components/BackgroundSection/BackgroundSection";
import { SinglePageType } from "@/data/types";
import SectionSliderPosts from "@/components/Sections/SectionSliderPosts";
import api from "../../../../Services/api";

export interface SingleContentProps {
  data: SinglePageType;
}

const SingleContent: FC<SingleContentProps> = ({ data }) => {
  const [courses, setCourses] = useState([]);

  const fetchCourses = async () => {
    const res = await api.getBestSellers();
    setCourses(res);
  };
  useEffect(() => {
    fetchCourses();
  }, []);
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
        data.terminos.map((t) => (
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
