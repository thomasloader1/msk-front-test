import { Link } from "react-router-dom";
import React, { FC, useState } from "react";
import ProductCurriculiam from "./ProductCurriculiam";
import ProductDetailsInstructor from "./ProductDetailsInstructor";
import ProductDetailSidebar from "./ProductDetailSidebar";
import ProductProgressbar from "./ProductProgressbar";
import fai from "../../styles/fai/fontAwesome5Pro.module.css";
import instructorImg from "../../images/eduman/course-instructors.png";
import BrandSlider from "components/BrandSlider/BrandSlider";
import ContactFormSection from "components/ContactForm/ContactForm";
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

  return (
    <section className="course-detalis-area my-5 pb-90">
      <div className="container grid grid-cols-[70%_30%]">
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
              <p>
                Este prestigioso programa desarrollado por el American College
                of Cardiology le permitirá al profesional actualizar y
                fortalecer sus conocimientos sobre guías, y protocolos clínicos
                y de práctica, obtener información de investigaciones emergentes
                y su aplicación a la práctica y el rendimiento de su práctica
                profesional alcanzando los más altos estándares internacionales.
              </p>
            </div>
            <div className="bg-neutral-100 slider-container px-10 py-10 rounded-2xl mb-24">
              <SectionSliderPosts
                postCardName="card20"
                sliderStype="style2"
                posts={DETAILS_COURSES}
                uniqueSliderClass="pageHome-section6"
              />
            </div>
            {/* <div className="course-learn-wrapper">
              <div className="course-learn">
                <div className="course-leranm-tittle">
                  <h4 className="mb-15">What you'll learn</h4>
                </div>

                <div className="grid grid-col-2 grid-flow-col">
                  <div className="course-leran-text f-left">
                    <ul>
                      <li>
                        Handle advanced techniques like Dimensionality Reduction
                      </li>
                      <li>
                        Handle specific topics like Reinforcement Learning best
                      </li>
                      <li>
                        Know which Machine Learning model to choose for each
                        type of problem
                      </li>
                    </ul>
                  </div>

                  <div className="course-leran-text">
                    <ul>
                      <li>
                        Reinforcement learning upper confidence bound Thompson
                        sampling
                      </li>
                      <li>
                        Model Selection and Boosting fold cross validation
                        parameter
                      </li>
                      <li>
                        Use Machine Learning for personal purpose of machine
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div> */}
            <CourseRequirements />
            <ProductCurriculiam />
            <ProductDetailsInstructor img={instructorImg} />
          </div>
        </div>
        <div className="col-xxl-4 col-xl-4 col-lg-8 col-md-8">
          <ProductDetailSidebar />
        </div>
      </div>
      <div className="container grid grid-cols-2 items-center mt-40">
        <ContactFormSection />
      </div>
    </section>
  );
};

export default SingleProductDetail;
