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
import axios from "axios";
import { API_URL } from "data/api";
import StorePagination from "components/Store/StorePagination";
import CategoryBadgeList from "components/CategoryBadgeList/CategoryBadgeList";
import Badge from "components/Badge/Badge";

interface Props {
  product: FetchSingleProduct;
}

const SingleProductDetail: FC<Props> = ({ product }) => {
  const textRef = useRef<HTMLDivElement>(null);
  const [bestSeller, setBestSeller] = useState([]);
  const fetchBestSeller = async () => {
    const res = await axios.get(`${API_URL}/home/best-sellers?country=mx`);
    setBestSeller(res.data.products);
  };

  useEffect(() => {
    const htmlElement = document.createElement("div");
    htmlElement.innerHTML = product.ficha.description;
    fetchBestSeller();
    if (textRef.current) {
      textRef.current.innerHTML = "";
      textRef.current.appendChild(htmlElement);
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

  const isEbook = Object.values(product.details).some((detail) =>
    detail.value.includes("Ebook")
  );

  // @ts-ignore
  return (
    <section className="course-details-area my-1 pb-90">
      <div className="container grid grid-cols-1  lg:grid-cols-[65%_35%] mb-16">
        <div className="">
          <div className="course-details-wrapper">
            <div className="flex gap-2">
              {isEbook ? (
                <Badge
                  color="emerald-post"
                  name="Guía profesional"
                  textSize="text-xs"
                />
              ) : null}
              <CategoryBadgeList categories={product.ficha.categorias} />
            </div>
            <div className="course-heading mb-10 my-5">
              <h2 className="font-semibold">{product.ficha.title}</h2>
            </div>
            <div>
              {product.authors.length ||
              product.temario ||
              (product.details && product.details["duration"]) ? (
                <div className="course-detelis-meta">
                  {product.authors.length ? (
                    <>
                      <div className="course-meta-wrapper">
                        <div className="course-meta-img">
                          <img
                            src={product.authors[0].image.replace("mx.", "")}
                            alt="course-meta"
                          />
                        </div>

                        <div>
                          <span className="raleway">Creado por</span>
                          <div className="flex flex-col">
                            {isEbook ? (
                              <>
                                {product.lista_de_cedentes
                                  ? product.lista_de_cedentes[0].post_title
                                  : ""}
                              </>
                            ) : (
                              <h6 className="raleway-bold">
                                {product.authors[0].name}
                              </h6>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="border-line-meta"></div>
                    </>
                  ) : null}
                  {product.temario ? (
                    <>
                      <div className="flex flex-col">
                        <span className="raleway">Contenido</span>
                        <h6 className="raleway-bold">
                          {product.temario["data"]?.row_count} módulos
                        </h6>
                      </div>
                      <div className="border-line-meta"></div>
                    </>
                  ) : null}

                  {product.details && product.details["duration"] ? (
                    <div className="flex flex-col">
                      <span className="raleway">Duración</span>
                      <span className="raleway-bold">
                        {product.details["duration"].value} horas estimadas
                      </span>
                    </div>
                  ) : null}
                </div>
              ) : (
                <></>
              )}
            </div>

            <div className="order-last relative block lg:hidden">
              <ProductDetailSidebar
                ficha={product.ficha}
                details={product.details}
                isEbook={isEbook}
              />
            </div>

            {product.ficha.description ? (
              <div
                className={
                  isEbook
                    ? "course-description pb-30"
                    : "course-description pt-45 pb-30"
                }
              >
                {!isEbook && (
                  <div className="course-Description">
                    <h4 className="font-semibold text-xl">Qué aprenderás</h4>
                  </div>
                )}
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
              <CourseRequirements
                title="Qué necesitas"
                requirements={product.requirements}
              />
            ) : (
              <></>
            )}
            {product.temario ? (
              <ProductCurriculiam
                topics={product.temario}
                hours={product.details["duration"]}
              />
            ) : (
              <></>
            )}
            {product.evaluacion ? (
              <ProductEvaluation evaluations={product.evaluacion} />
            ) : (
              <></>
            )}
            {product.goals && (
              <>
                <CourseRequirements
                  title="Objetivos"
                  requirements={productsGoals(product.goals)}
                />
              </>
            )}
            {product.authors.length ? (
              <h4 className="mt-6 font-bold pt-6 text-xl">
                Quiénes lo desarrollan
              </h4>
            ) : (
              <p></p>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2">
              {currentItems.length ? (
                currentItems.map((instructor, index) => {
                  return (
                    <ProductDetailsInstructor
                      instructor={instructor}
                      key={`inst_${index}`}
                    />
                  );
                })
              ) : (
                <p></p>
              )}
            </div>
            {totalPages > 1 && (
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
            isEbook={isEbook}
          />
        </div>
      </div>
      <div className="container grid grid-cols-1 md:grid-cols-3 gap-4 ">
        <ContactFormSection
          productName={product.ficha.title}
          isEbook={isEbook}
        />
      </div>
      {product.related_products.length ? (
        <div className="container relative py-16 mt-16 ">
          <BackgroundSection />
          <SectionSliderPosts
            postCardName="card9"
            heading="Descubre otras capacitaciones destacadas"
            subHeading="Estos son los cursos más elegidos entre profesionales de la salud"
            sliderStype="style2"
            posts={bestSeller}
            uniqueSliderClass="pageHome-section6"
          />
        </div>
      ) : null}
    </section>
  );
};

export default SingleProductDetail;
