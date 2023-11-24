import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import SectionSliderPosts from "./home/SectionSliderPosts";
import BlogSummary from "./home/BlogSummary";
import BackgroundSection from "components/BackgroundSection/BackgroundSection";
import CoursesForYou from "./home/CoursesForYou";
import HomeExtraInfo from "./home/HomeExtraInfo";
import SectionHero from "components/SectionHero/SectionHero";
import rightImg from "images/hero-msk.png";
import SectionGridCategoryBox from "components/SectionGridCategoryBox/SectionGridCategoryBox";
import BrandSlider from "components/BrandSlider/BrandSlider";
import ContactForm from "components/ContactForm/ContactForm";
import { TABS_HOME } from "data/MSK/courses";
import { TABS_BLOG } from "data/MSK/blog";
import { HOME_SPECIALTIES } from "data/MSK/specialties";
import api from "Services/api";
import usePosts from "hooks/usePosts";

const PageHome: React.FC = () => {
  const [courses, setCourses] = useState([]);
  const [bestSeller, setBestSeller] = useState([]);
  const [loadingCourses, setLoadingCourses] = useState(true);
  const [loadingBestSellers, setLoadingBestSellers] = useState(true);
  const { posts, loading: loadingPosts } = usePosts();

  const fetchCourses = async () => {
    const allCourses = await api.getAllProductsMX();
    setCourses(allCourses);
    setLoadingCourses(false);
  };
  const fetchBestSeller = async () => {
    const fetchedBestSellers = await api.getBestSellersMX();
    setBestSeller(fetchedBestSellers);
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
    <div className="nc-PageHome relative animate-fade-down">
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
            categories={HOME_SPECIALTIES.filter((_, i) => i < 4)}
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
          <HomeExtraInfo />
          <BlogSummary
            posts={posts}
            tabs={TABS_BLOG}
            loading={loadingPosts}
            className="py-16 lg:py-28"
            heading=""
            desc=""
            showTitle
          />

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
