import React, { useEffect, useState } from "react";
import SectionSliderPosts from "./home/SectionSliderPosts";
import BlogSummary from "./home/BlogSummary";
import { Helmet } from "react-helmet";
import BackgroundSection from "components/BackgroundSection/BackgroundSection";
import CoursesForYou from "./home/CoursesForYou";
import HomeExtraInfo from "./home/HomeExtraInfo";
import SectionHero from "components/SectionHero/SectionHero";
import rightImg from "images/hero-msk.png";
import SectionGridCategoryBox from "components/SectionGridCategoryBox/SectionGridCategoryBox";
import BrandSlider from "components/BrandSlider/BrandSlider";
import ContactForm from "components/ContactForm/ContactForm";
import { TABS_HOME } from "data/MSK/courses";
import { SPECIALTIES } from "data/MSK/specialties";
import axios from "axios";
import { ALL_PRODUCTS_MX, BEST_SELLERS_MX } from "data/api";

const PageHome: React.FC = () => {
  const [courses, setCourses] = useState([]);
  const [bestSeller, setBestSeller] = useState([]);
  const [loadingCourses, setLoadingCourses] = useState(true);
  const [loadingBestSellers, setLoadingBestSellers] = useState(true);
  const fetchCourses = async () => {
    const res = await axios.get(`${ALL_PRODUCTS_MX}`);
    setCourses(res.data.products);
    setLoadingCourses(false);
  };
  const fetchBestSeller = async () => {
    const res = await axios.get(`${BEST_SELLERS_MX}`);
    setBestSeller(res.data.products);
    setLoadingBestSellers(false);
  };
  useEffect(() => {
    fetchCourses();
    fetchBestSeller();
    // navigator.geolocation.getCurrentPosition(
    //   function (position) {
    //     console.log(position);
    //   },
    //   function (err) {
    //     console.log(err);
    //   }
    // );
  }, []);

  const scrollToContactForm = () => {
    const contactForm = document.getElementById("contactanos");
    if (contactForm) {
      window.scrollTo({
        top: document.getElementById("contactanos")!.offsetTop,
        behavior: "smooth",
      });
    }
  };
  return (
    <div className="nc-PageHome relative">
      {/* === SEO === */}
      <Helmet>
        <html lang="es" />
        <title>MSK | Inicio</title>
        <meta
          name="description"
          content="Una propuesta moderna para expandir tus metas profesionales"
        />
      </Helmet>
      {/* === END SEO === */}

      <div className="relative overflow-hidden">
        <div className="container relative">
          <SectionHero
            rightImg={rightImg}
            className="pt-10 pb-16 md:py-16 lg:pb-28 lg:pt-20"
            btnText="Comienza tu experiencia"
            btnOnClick={scrollToContactForm}
            heading={
              <>
                Una propuesta moderna
                <br />
                para
                <span className="font-lora-italic"> expandir </span>
                tus
                <br />
                metas profesionales
              </>
            }
          />
          <SectionGridCategoryBox
            headingCenter={false}
            categories={SPECIALTIES.filter((_, i) => i < 4)}
            categoryCardType="card2"
            className="pb-16 lg:pb-28"
          />
          <BrandSlider />
          <CoursesForYou
            courses={courses}
            bestSeller={bestSeller}
            tabs={TABS_HOME}
            loading={loadingCourses}
            className="py-16 lg:py-28"
            heading="Oportunidades para ti"
            desc="Cursos destacados para realizar a distancia"
          />
          {/* === SECTION 3 === */}
          <HomeExtraInfo btnOnClick={scrollToContactForm} />
          {/* === SECTION 6 === */}
          <div className="relative py-16 my-32">
            <BackgroundSection />
            <SectionSliderPosts
              posts={bestSeller}
              loading={loadingBestSellers}
              postCardName="card9"
              heading="Nuestros cursos más elegidos"
              subHeading="Profesionales como tú ya se capacitaron con ellos. ¡Ahora te toca a ti!"
              sliderStype="style2"
              uniqueSliderClass="pageHome-section6"
            />
          </div>
          {/* === SECTION 4 === */}
          {/* <BlogSummary
            className="py-16 lg:py-28"
            posts={posts}
            tabs={TABS_BLOG}
          /> */}
        </div>
        {/* ======= END CONTAINER ============= */}
        {/* === SECTION  === */}
        <div className="container grid grid-cols-1 md:grid-cols-3 gap-4 my-40">
          <ContactForm />
        </div>
        {/* ======= END ALL SECTIONS ============= */}
      </div>
    </div>
  );
};

export default PageHome;
