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
import { TABS_BLOG, TABS_HOME } from "data/MSK/courses";
import { SPECIALTIES } from "data/MSK/specialties";
import axios from "axios";
import { API_URL } from "data/api";

const PageHome: React.FC = () => {
  const [posts, setPosts] = useState([]);
  const [courses, setCourses] = useState([]);
  const fetchPosts = async () => {
    const res = await axios.get(`${API_URL}/posts`);
    const formattedPosts = res.data.posts.map((post: any) => ({
      ...post,
      image: post.thumbnail,
    }));
    setPosts(formattedPosts);
  };
  const fetchCourses = async () => {
    const res = await axios.get(`${API_URL}/products`);
    setCourses(res.data.products);
  };
  useEffect(() => {
    fetchPosts();
    fetchCourses();
  }, []);
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
            heading={
              <span>
                Una propuesta moderna
                <br />
                para
                <span className="font-lora"> expandir </span>
                tus
                <br />
                metas profesionales
              </span>
            }
          />
          <SectionGridCategoryBox
            headingCenter={false}
            categoryCardType="card2"
            className="pb-16 lg:pb-28"
            categories={SPECIALTIES.filter((_, i) => i < 4)}
          />
          <BrandSlider />
          <CoursesForYou
            className="py-16 lg:py-28"
            heading="Oportunidades para ti"
            courses={courses}
            tabs={TABS_HOME}
          />
          {/* === SECTION 3 === */}
          <HomeExtraInfo />
          {/* === SECTION 6 === */}
          <div className="relative py-16 my-32">
            <BackgroundSection />
            <SectionSliderPosts
              postCardName="card9"
              heading="Nuestros cursos mas elegidos"
              subHeading="Profesionales como tú ya se capacitaron con ellos. ¡Ahora te toca a ti!"
              sliderStype="style2"
              posts={posts}
              uniqueSliderClass="pageHome-section6"
            />
          </div>
          {/* === SECTION 4 === */}
          <BlogSummary
            className="py-16 lg:py-28"
            posts={posts}
            tabs={TABS_BLOG}
          />
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
