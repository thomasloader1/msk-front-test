import { FC, useEffect, useRef, useState } from "react";
import ProductCurriculiam from "./ProductCurriculiam";
import ProductDetailsInstructor from "./ProductDetailsInstructor";
import ProductDetailSidebar from "./ProductDetailSidebar";
import SectionSliderPosts from "containers/PageMSK/home/SectionSliderPosts";
import BackgroundSection from "components/BackgroundSection/BackgroundSection";
import CourseRequirements from "./Requirements/CourseRequirements";
import { FetchSingleProduct } from "data/types";
import ProductEvaluation from "./ProductEvaluation";
import ContactFormSection from "components/ContactForm/ContactForm";
import { Alert } from "components/Alert/Alert";

interface Props {
  product: FetchSingleProduct;
}

const SingleProductDetail: FC<Props> = ({ product }) => {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const htmlElement = document.createElement("div");
    htmlElement.innerHTML = product.description;
    if (textRef.current) {
      textRef.current.innerHTML = "";
      textRef.current.appendChild(htmlElement);
    }
  }, [location]);
  return (
    <section className="course-detalis-area my-5 pb-90">
      <div className="container grid grid-cols-1  lg:grid-cols-[65%_35%]">
        <div className="">
          <div className="course-detalis-wrapper mb-30">
            <div className="course-heading mb-10">
              <h2 className="font-semibold">{product.ficha.title}</h2>
            </div>
            <div className="course-detelis-meta">
              <div className="course-meta-wrapper border-line-meta">
                {product.authors.length ? (
                  <>
                    <div className="course-meta-img">
                      <img src={product.authors[0].image.replace('mx.', '')} alt="course-meta" />
                    </div>

                    <div>
                      <span>Creado por</span>
                      <h6 className="font-bold">{product.authors[0].name}</h6>
                    </div>
                  </>
                ) : null}
              </div>
              {product.temario ? (
                <div className="border-line-meta">
                  <p>Contenido</p>
                  <span className="font-bold">
                    {product.temario["data"]?.row_count} Módulos
                  </span>
                </div>
              ) : null}

              {product.details && product.details["duration"] ? (
                <div className="border-line-meta">
                  <p>Duración</p>
                  <span className="font-bold">
                    {product.details["duration"].value} Horas estimadas
                  </span>
                </div>
              ) : null}
            </div>
            {product.description ? (
              <div className="course-description pt-45 pb-30">
                <div className="course-Description">
                  <h4 className="font-semibold text-xl">Qué aprenderás</h4>
                </div>
                <div ref={textRef} />
              </div>
            ) : null}

            {product.avales ? (
              <div className="bg-neutral-100 slider-container px-10 py-10 rounded-2xl mb-24">
                <SectionSliderPosts
                  postCardName="card20"
                  sliderStype="style2"
                  posts={product.avales}
                  uniqueSliderClass="pageHome-section6"
                />
              </div>
            ) : null}

            {product.requirements ? (
              <CourseRequirements requirements={product.requirements} />
            ) : (
              <Alert type="info">"No encontramos los requerimientos"</Alert>
            )}
            {product.temario ? (
              <ProductCurriculiam topics={product.temario} />
            ) : (
              <Alert type="info">"No encontramos el temario"</Alert>
            )}

            {product.evaluacion ? (
              <ProductEvaluation evaluations={product.evaluacion} />
            ) : (
              <Alert type="info">"No encontramos la forma de evaluar"</Alert>
            )}
            <h4 className="mt-6 font-bold">Quiénes lo desarrollan</h4>
            <div className="grid grid-cols-2">
              {product.authors.length ? (
                product.authors.map((instructor, index) => {
                  return (
                    <ProductDetailsInstructor
                      instructor={instructor}
                      key={`inst_${index}`}
                    />
                  );
                })
              ) : (
                <Alert type="info">"No se encontraron los instructores"</Alert>
              )}
            </div>
          </div>
        </div>
        <div className="order-first lg:order-last">
          <ProductDetailSidebar
            ficha={product.ficha}
            details={product.details}
          />
        </div>
      </div>
      <div className="container grid grid-cols-1 md:grid-cols-3 gap-4">
        <ContactFormSection productName={product.ficha.title} />
      </div>
      {product.related_products.length ? (
        <div className="container relative py-16 mt-16 ">
          <BackgroundSection />
          <SectionSliderPosts
            postCardName="card20"
            heading="Descubre otras capacitaciones destacadas"
            subHeading="Estos son los cursos más elegidos entre profesionales de la salud"
            sliderStype="style2"
            posts={product.related_products}
            uniqueSliderClass="pageHome-section6"
          />
        </div>
      ) : null}
    </section>
  );
};

export default SingleProductDetail;
