import React, { FC, useEffect, useRef } from "react";
import Tag from "components/Tag/Tag";
import { SinglePageType } from "../PageMission";
import SingleAuthor from "./SingleAuthor";
import SingleCommentForm from "./SingleCommentForm";
import SingleCommentLists from "./SingleCommentLists";
import SingleContentDemo from "./SingleContentDemo";
import { useLocation } from "react-router";
import SectionSliderPosts from "containers/PageHome/SectionSliderPosts";
import { HOME_COURSES } from "data/courses";
import BackgroundSection from "components/BackgroundSection/BackgroundSection";

export interface SingleContentProps {
  data: SinglePageType;
}

const SingleContent: FC<SingleContentProps> = ({ data }) => {
  const { tags, author, commentCount, comments } = data;
  const commentRef = useRef<HTMLDivElement>(null);
  //
  const location = useLocation();

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
      <div
        id="single-entry-content"
        className="prose lg:prose-lg !max-w-screen-md mx-auto dark:prose-invert"
      >
        <p className="font-lora text-xl">
          Medical & Scientific Knowledge es{" "}
          <strong>
            una propuesta moderna que desafía a expandir las metas profesionales
          </strong>
          . Nuestra presencia en Latinoamérica y España promueve la difusión de
          un nuevo concepto en e-learning que transforma la experiencia de
          aprendizaje a distancia del personal de la salud hispanoparlante, con
          orientación hacia los resultados y el éxito profesional.
        </p>
        <p className="font-lora  text-xl">
          Nuestro método de capacitación es flexible: brindamos distintos
          formatos de contenidos de nivel académico, entre los que se incluyen
          guías profesionales y webinars. Además, contamos con el respaldo de
          grandes instituciones de todo el mundo que certifican nuestros cursos.
        </p>
        <img src="src/images/misc/woman_pc.png" alt="" />
        <p className="font-lora text- text-xl">
          Quienes hacemos Medical & Scientific Knowledge queremos acompañar y
          ayudar a cada persona en un camino de retos y crecimiento laboral.
          Todos los cursos que ofrecemos están desarrollados por sellos,
          instituciones y autores de prestigio. La capacitación se realiza en un
          campus virtual práctico y cada profesional tendrá el apoyo y la
          asesoría permanente de nuestros agentes académicos.
        </p>
        <p className="font-lora text-slate-500 text-xl">
          ¿Te gustaría alcanzar nuevos objetivos y obtener un mayor
          reconocimiento en tu profesión?
        </p>
      </div>

      {/* TAGS */}
      <div className="relative py-16 my-32">
        <BackgroundSection />
        <SectionSliderPosts
          postCardName="card9"
          heading="Comienza tu experiencia aquí"
          subHeading="Estos son los cursos más elegidos entre profesionales de la salud"
          sliderStype="style2"
          posts={HOME_COURSES}
          uniqueSliderClass="pageHome-section6"
        />
      </div>
    </div>
  );
};

export default SingleContent;
