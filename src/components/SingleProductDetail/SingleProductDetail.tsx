import { Link } from "react-router-dom";
import React, { FC, useState } from "react";
import ProductCurriculiam from "./ProductCurriculiam";
import ProductDetailsInstructor from "./ProductDetailsInstructor";
import ProductDetailSidebar from "./ProductDetailSidebar";
import ProductProgressbar from "./ProductProgressbar";
import fai from "../../styles/fai/fontAwesome5Pro.module.css";
import instructorImg from "../../images/avatar/avatar_1.png";
import BrandSlider from "components/BrandSlider/BrandSlider";
import ContactForm from "components/ContactForm/ContactForm";
import { CourseDataType, DETAILS_COURSES, HOME_COURSES } from "data/courses";
import SectionSliderPosts from "containers/PageHome/SectionSliderPosts";
import BackgroundSection from "components/BackgroundSection/BackgroundSection";
import CourseRequirements from "./Requirements/CourseRequirements";
interface Props {
  product: CourseDataType;
}

const SingleProductDetail: FC<Props> = ({ product }) => {
  const [isActive, setActive] = useState(false);

  const handleToggle = () => {
    setActive(!isActive);
  };

  const evaluations = [
    [
      {
        desc: "El primer paso en la cursada es la navegación del contenido teórico en PDF descargable, así como también en formato interactivo a través de la misma plataforma.",
      },
      {
        desc: "Cada apartado incluye videos y audios creados por los más grandes expertos de la American Board of Internal Medicine.",
      },
      {
        desc: "Tendrá a disposición preguntas de evaluación y más de 500 casos clínicos que permiten evaluar su progreso y profundizar en los aspectos prácticos.",
      },
    ],
    [
      {
        desc: "Al final de cada módulo encontrará una evaluación para comprobar lo aprendido, cuya calificación mínima deber ser igual o superior a 8.",
      },
      {
        desc: "Finalmente, se realiza el examen final. Para superarlo, se debe obtener una nota igual o superior a 8.",
      },
    ],
  ];

  const instructors = [
    {
      img: instructorImg,
      name: "Patrick T. O’Gara, MD, MACC",
      role: "Editor en jefe CMP",
      specialties: [
        "Doctor en Medicina",
        "Especialista en obstetricia, ginecología y salud pública",
        "Fellow American College Obstetricians & Gynecologist (ACOG, USA).",
      ],
      centres: [
        "Lipsun Hospital, San Francisco, California",
        "Lipsun Hospital, San Francisco, California",
      ],
    },
    {
      img: instructorImg,
      name: "Patrick T. O’Gara, MD, MACC",
      role: "Editor en jefe CMP",
      specialties: [
        "Doctor en Medicina",
        "Especialista en obstetricia, ginecología y salud pública",
        "Fellow American College Obstetricians & Gynecologist (ACOG, USA).",
      ],
      centres: [
        "Lipsun Hospital, San Francisco, California",
        "Lipsun Hospital, San Francisco, California",
      ],
    },
    {
      img: instructorImg,
      name: "Patrick T. O’Gara, MD, MACC",
      role: "Editor en jefe CMP",
      specialties: [
        "Doctor en Medicina",
        "Especialista en obstetricia, ginecología y salud pública",
        "Fellow American College Obstetricians & Gynecologist (ACOG, USA).",
      ],
      centres: [
        "Lipsun Hospital, San Francisco, California",
        "Lipsun Hospital, San Francisco, California",
      ],
    },
  ];

  return (
    <section className="course-detalis-area my-5 pb-90">
      <div className="container grid grid-cols-[65%_35%]">
        <div className="">
          <div className="course-detalis-wrapper mb-30">
            <div className="course-heading mb-20">
              <h2 className="font-semibold">{product.title}</h2>
            </div>
            <div className="course-detelis-meta">
              <div className="course-meta-wrapper border-line-meta">
                <div className="course-meta-img">
                  {/* <Link to="/instructor-profile"> */}
                  <img src={product.author.img} alt="course-meta" />
                  {/* </Link> */}
                </div>
                <div>
                  <span>Creado por</span>
                  <h6 className="font-bold">{product.author.name}</h6>
                </div>
              </div>
              <div className="border-line-meta">
                <p>Contenido</p>
                <span className="font-bold">{product.content}</span>
              </div>

              <div className="">
                <p>Duración</p>
                <span className="font-bold">{product.length} estimadas</span>
              </div>
            </div>
            <div className="course-description pt-45 pb-30">
              <div className="course-Description">
                <h4 className="font-semibold text-xl">Qué aprenderás</h4>
              </div>
              <p>{product.summary}</p>
            </div>
            <div className="bg-neutral-100 slider-container px-10 py-10 rounded-2xl mb-24">
              <SectionSliderPosts
                postCardName="card20"
                sliderStype="style2"
                posts={DETAILS_COURSES}
                uniqueSliderClass="pageHome-section6"
              />
            </div>
            <CourseRequirements />
            <ProductCurriculiam />

            <div className="course-learn-wrapper">
              <div className="course-learn">
                <div className="course-leranm-tittle">
                  <h4 className="mb-15 font-semibold text-xl">
                    Cómo evaluamos
                  </h4>
                </div>

                <div className="grid grid-col-2 grid-flow-col">
                  <div className="course-leran-text f-left">
                    <ul>
                      {evaluations[0].map((evaluation, index) => {
                        return (
                          <li key={`ev_${index}`}>
                            <img
                              src="src/images/vectors/isotipo.svg"
                              width="20"
                              alt=""
                            />{" "}
                            {evaluation.desc}
                          </li>
                        );
                      })}
                    </ul>
                  </div>

                  <div className="course-leran-text">
                    <ul>
                      {evaluations[1].map((evaluation, index) => {
                        return (
                          <li key={`ev_r_${index}`}>
                            <img
                              src="src/images/vectors/isotipo.svg"
                              width="20"
                              alt=""
                            />{" "}
                            {evaluation.desc}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <h4 className="mt-6 font-bold">Quiénes lo desarrollan</h4>
            <div className="grid grid-cols-2">
              {instructors.map((instructor, index) => {
                return (
                  <ProductDetailsInstructor
                    instructor={instructor}
                    key={`inst_${index}`}
                  />
                );
              })}
            </div>
          </div>
        </div>
        <div className="col-xxl-4 col-xl-4 col-lg-8 col-md-8">
          <ProductDetailSidebar product={product} />
        </div>
      </div>
      <div className="container grid grid-cols-1 md:grid-cols-3 gap-4">
        <ContactForm />
      </div>
      <div className="container relative py-16 mt-16 ">
        <BackgroundSection />
        <SectionSliderPosts
          postCardName="card9"
          heading="Descubre otras capacitaciones destacadas"
          subHeading="Estos son los cursos más elegidos entre profesionales de la salud"
          sliderStype="style2"
          posts={HOME_COURSES}
          uniqueSliderClass="pageHome-section6"
        />
      </div>
    </section>
  );
};

export default SingleProductDetail;
