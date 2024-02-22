import { FC, useContext, useEffect, useRef, useState } from "react";
import ProductCurriculiam from "./ProductCurriculiam";
import ProductDetailsInstructor from "./ProductDetailsInstructor";
import ProductDetailSidebar from "./ProductDetailSidebar";
import SectionSliderPosts from "containers/PageMSK/home/SectionSliderPosts";
import BackgroundSection from "components/BackgroundSection/BackgroundSection";
import CourseRequirements from "./Requirements/CourseRequirements";
import { FetchSingleProduct } from "data/types";
import ProductEvaluation from "./ProductEvaluation";
import ContactFormSection from "components/ContactForm/ContactForm";
import StorePagination from "components/Store/StorePagination";
import CategoryBadgeList from "components/CategoryBadgeList/CategoryBadgeList";
import useProductDetails from "hooks/useProductDetails";
import { CountryContext } from "context/country/CountryContext";
import ProductFeaturedText from "./ProductFeaturedText";
import { DataContext } from "context/data/DataContext";
import { useHistory } from "react-router-dom";

interface Props {
  product: FetchSingleProduct;
}

const SingleProductDetail: FC<Props> = ({ product }) => {
  const { state: dataState, loadingBestSellers } = useContext(DataContext);
  const { allBestSellers } = dataState;
  const [bestSellers, setBestSellers] = useState([]);
  useEffect(() => {
    setBestSellers(allBestSellers);
  }, [allBestSellers]);

  const textRef = useRef<HTMLDivElement>(null);
  const [textDesctiption, setTextDesctiption] = useState<string>("");

  useEffect(() => {
    const htmlElement = document.createElement("div");
    htmlElement.innerHTML = product.ficha.description;
    if (textRef.current) {
      textRef.current.innerHTML = "";
      textRef.current.appendChild(htmlElement);
      setTextDesctiption(textRef?.current?.textContent as string);
    }
  }, [location]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = product.authors.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(product.authors.length / itemsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const productsGoals = (htmlString: string) => {
    const paragraphs = htmlString.split("</p>\n<p>");
    const listOfGoals = paragraphs.map((paragraph) => {
      const description = paragraph
        .replace(/<\/?p>/g, "")
        .replace(/&#8211;/g, "");

      return { description };
    });

    return listOfGoals;
  };

  const { state } = useContext(CountryContext);

  let { isEbook, imagen, title } = useProductDetails(product);

  if (imagen) {
    imagen = imagen.replace(`${state.country || "mx"}.`, "");
  }
  // @ts-ignore
  return (
    <section className="course-details-area my-1 pb-90">
      <div className="container grid grid-cols-1 lg:grid-cols-[65%_35%] mb-16">
        <div>
          <div className="course-details-wrapper animate-fade-down">
            <div className="flex gap-2">
              <CategoryBadgeList
                categories={product.ficha.categorias}
                isEbook={isEbook}
                isCourse={!isEbook}
              />
            </div>
            <div className="course-heading mb-10 my-5">
              <h1 className="font-semibold text-4xl">{product.ficha.title}</h1>
            </div>
            {!isEbook && (
              <>
                <div className="border-line-meta-h" />
                <div>
                  {product.authors.length ||
                  product.temario ||
                  (product.details && product.details["duration"]) ? (
                    <div
                      className={`grid grid-cols-12 ${isEbook && "border-0"}`}
                    >
                      {product.authors.length ? (
                        <div className="col-span-12 sm:col-span-5">
                          <div className="course-meta-wrapper">
                            <div className="course-meta-img">
                              <img src={imagen} alt={title} />
                            </div>
                            <div>
                              <span className="raleway text-dark-blue-custom">
                                Cedente
                              </span>
                              <div className="flex flex-col text-dark-blue-custom">
                                <div className="raleway-bold">
                                  {title || product.authors[0]?.name}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : null}
                      <div className="hidden sm:block border-line-meta" />
                      {product.temario ? (
                        <div className="col-span-4 sm:col-span-2 my-auto text-dark-blue-custom">
                          <div className="flex flex-col">
                            <span className="raleway">Contenido</span>
                            <div className="raleway-bold">
                              {product.temario["data"]?.row_count} módulos
                            </div>
                          </div>
                        </div>
                      ) : null}
                      <div className="border-line-meta" />
                      {product.details && product.details["duration"] ? (
                        <div className="col-span-6 sm:col-span-3 my-auto text-dark-blue-custom">
                          <span className="raleway ">Duración</span>
                          <div className="raleway-bold">
                            {product.details["duration"].value} horas estimadas
                          </div>
                        </div>
                      ) : null}
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
                <div className="course-heading my-5">
                  <div className="border-line-meta-h" />
                </div>
              </>
            )}

            <div className="order-last relative block lg:hidden my-10">
              <ProductDetailSidebar
                ficha={product.ficha}
                details={product.details}
                sideData={{
                  modalidad: product.modalidad,
                  curso_disponible: product.curso_disponible,
                  asesoramiento_academico: product.asesoramiento_academico,
                  certificacion: product.certificacion,
                  idioma: product.idioma,
                }}
                isEbook={isEbook}
              />
            </div>
            {product.ficha.description && (
              <div
                className={
                  isEbook
                    ? "course-description pb-30"
                    : "course-description pt-45 pb-30"
                }
              >
                {!isEbook && (
                  <div className="course-Description">
                    <div className="font-semibold text-xl font-raleway">
                      Qué aprenderás
                    </div>
                  </div>
                )}
                <div ref={textRef} />
              </div>
            )}

            {product.avales && (
              <div
                className={`bg-neutral-100 slider-container px-10 py-10 rounded-2xl ${
                  product.featured_product_text ? "mb-22" : "mb-24"
                }`}
              >
                <SectionSliderPosts
                  postCardName="card20"
                  sliderStype="style2"
                  posts={product.avales}
                  uniqueSliderClass="pageHome-section6"
                />
              </div>
            )}

            {product.featured_product_text && !isEbook && (
              <ProductFeaturedText text={product.featured_product_text} />
            )}

            {product.requirements && (
              <CourseRequirements
                title="Qué necesitas"
                requirements={product.requirements}
              />
            )}
            {product.temario && (
              <ProductCurriculiam
                topics={product.temario}
                hours={product.details["duration"]}
                link={product?.temario_link_pdf}
                slug={product?.params.slug}
              />
            )}
            {product.evaluacion && (
              <ProductEvaluation evaluations={product.evaluacion} />
            )}
            {product.goals && (
              <>
                <CourseRequirements
                  title={isEbook ? "Objetivos" : "Qué aprenderás"}
                  requirements={productsGoals(product.goals)}
                />
              </>
            )}

            {product.authors.length > 0 && !isEbook && (
              <h4 className="mt-6 font-bold pt-6 text-xl poppins-bold">
                Quiénes lo desarrollan
              </h4>
            )}

            {!isEbook && (
              <div className="grid grid-cols-1 md:grid-cols-2">
                {currentItems.length > 0 &&
                  currentItems.map((instructor, index) => {
                    return (
                      <ProductDetailsInstructor
                        instructor={instructor}
                        key={`inst_${index}`}
                      />
                    );
                  })}
              </div>
            )}

            {totalPages > 1 && !isEbook && (
              <div className="flex justify-center">
                <StorePagination
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                  currentPage={currentPage}
                />
              </div>
            )}
          </div>
        </div>
        <div className="order-last relative hidden lg:block">
          <ProductDetailSidebar
            ficha={product.ficha}
            details={product.details}
            sideData={{
              modalidad: product.modalidad,
              curso_disponible: product.curso_disponible,
              asesoramiento_academico: product.asesoramiento_academico,
              certificacion: product.certificacion,
              idioma: product.idioma,
            }}
            isEbook={isEbook}
          />
        </div>
      </div>
      <div className="container grid grid-cols-1 md:grid-cols-3 gap-4 ">
        <ContactFormSection
          productName={product.ficha.title}
          isEbook={isEbook}
          submitReason={isEbook ? "Descarga ebook" : ""}
          resourceMedia={
            isEbook ? (product?.temario_link_pdf as string) : false
          }
        />
      </div>
      <div className="container relative py-16 mb-20">
        <BackgroundSection />
        <SectionSliderPosts
          posts={bestSellers}
          loading={loadingBestSellers}
          postCardName="card9"
          heading="Descubre nuestras capacitaciones destacadas"
          subHeading="Estos son los cursos más elegidos entre profesionales de la salud"
          sliderStype="style2"
          uniqueSliderClass="pageHome-section6"
        />
      </div>

      {product.related_products.length ? (
        <div className="container relative py-16 mt-16 ">
          <BackgroundSection />
          <SectionSliderPosts
            postCardName="card9"
            heading="¿Buscas capacitarte a distancia?"
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
