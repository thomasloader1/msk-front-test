import React, { useContext, useEffect, useState } from "react";
import { TABS_HOME } from "data/MSK/courses";
import { TABS_BLOG } from "data/MSK/blog";
import { HOME_SPECIALTIES } from "data/MSK/specialties";
import { DataContext } from "context/data/DataContext";
import SectionSliderPosts from "./home/SectionSliderPosts";
import BlogSummary from "./home/BlogSummary";
import BackgroundSection from "components/BackgroundSection/BackgroundSection";
import CoursesForYou from "./home/CoursesForYou";
import HomeExtraInfo from "./home/HomeExtraInfo";
import SectionHero from "components/SectionHero/SectionHero";
import rightImg from "/images/hero-msk.png";
import SectionGridCategoryBox from "components/SectionGridCategoryBox/SectionGridCategoryBox";
import BrandSlider from "components/BrandSlider/BrandSlider";
import ContactForm from "components/ContactForm/ContactForm";
import PageHead from "./PageHead";
import { useHistory } from "react-router-dom";
import { AuthContext } from "context/user/AuthContext";
import JsonLd from "components/JsonLd/JsonLd";

const PageHome: React.FC = () => {
  const history = useHistory()
  const { state, loadingCourses, loadingPosts, loadingBestSellers } =
    useContext(DataContext);
    const {state: authState} = useContext(AuthContext)
  const { allCourses, allPosts, allBestSellers } = state;
  const [courses, setCourses] = useState([]);
  const [posts, setPosts] = useState([]);
  const [bestSeller, setBestSeller] = useState([]);

  useEffect(() => {
    const redirectToTrial = localStorage.getItem("trialURL")

    if(redirectToTrial && authState.isAuthenticated){
      history.push(redirectToTrial)
    }

  }, []);

  useEffect(() => {
    setCourses(allCourses);
    setPosts(allPosts);
    setBestSeller(allBestSellers);
  }, [allCourses, allPosts, allBestSellers]);

  const scrollToContactForm = () => {
    const contactForm = document.getElementById("contactanos");
    if (contactForm) {
      window.scrollTo({
        top: document.getElementById("contactanos")!.offsetTop,
        behavior: "smooth",
      });
    }
  };

  const schemaOrganization = {
      "@context": "https://schema.org",
      "@type": "Organization",
      // "@id": "https://www.petco.com/#organization", //No entendi que era
      "name": "MSK - Medical & Scientific Knowledge",
      "url": "https://msklatam.com/",
      "address": {
          "@type": "PostalAddress",
          "addressLocality": "Buenos Aires",
          "addressCountry": "Argentina",
          "postalCode": "C1055",
          "streetAddress": "Av. Córdoba 1367"
      },
      "logo": "https://www.msklatam.com/images/msk-logo.svg",
      "description": "Medical & Scientific Knowledge es una propuesta moderna que desafía a expandir las metas profesionales. Nuestra presencia en Latinoamérica y España promueve la difusión de un nuevo concepto en e-learning que transforma la experiencia de aprendizaje a distancia del personal de la salud hispanoparlante, con orientación hacia los resultados y el éxito profesional. Nuestro método de capacitación es flexible: brindamos distintos formatos de contenidos de nivel académico, entre los que se incluyen guías profesionales y webinars. Además, contamos con el respaldo de grandes instituciones de todo el mundo que certifican nuestros cursos.",
      "sameAs":
          ["https://www.instagram.com/msk.latam",
          "https://www.linkedin.com/company/msk-online-learning/",
          "https://www.facebook.com/msk.online.learning",
          "https://www.youtube.com/@msk.online.learning"]
  };

  return (
    <div className="nc-PageHome relative animate-fade-down">
      {/* === SEO === */}
      <PageHead
        title="Inicio"
        description="Una propuesta moderna para expandir tus metas profesionales"
      />
      <JsonLd>
          {schemaOrganization}
      </JsonLd>
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
            className="py-16"
            heading="Oportunidades para ti"
            desc="Cursos destacados para realizar a distancia"
          />
          <HomeExtraInfo />
          {/* === SECTION 3 === */}
          <BlogSummary
            posts={posts}
            tabs={TABS_BLOG}
            loading={loadingPosts}
            className="py-16 "
            heading=""
            desc=""
            showTitle
          />
          {/* === SECTION 6 === */}
          <div className="relative py-16">
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
        </div>
        {/* ======= END CONTAINER ============= */}
        {/* === SECTION  === */}
        <div className="container grid grid-cols-1 md:grid-cols-3 gap-4 my-16">
          <ContactForm />
        </div>
        {/* ======= END ALL SECTIONS ============= */}
      </div>
    </div>
  );
};

export default PageHome;
