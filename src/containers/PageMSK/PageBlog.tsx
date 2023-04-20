import React from "react";
import SectionSliderPosts from "./home/SectionSliderPosts";
import { Helmet } from "react-helmet";
import BackgroundSection from "components/BackgroundSection/BackgroundSection";
import { DEMO_CATEGORIES } from "data/taxonomies";
import CoursesForYou from "../PageHome/CoursesForYou";
import HomeExtraInfo from "../PageHome/HomeExtraInfo";
import BlogSummary from "../PageHome/BlogSummary";
import BgGlassmorphism from "components/BgGlassmorphism/BgGlassmorphism";
import SectionHero from "components/SectionHero/SectionHero";
import rightImg from "images/hero-msk.png";
import SectionGridCategoryBox from "components/SectionGridCategoryBox/SectionGridCategoryBox";
import BrandSlider from "components/BrandSlider/BrandSlider";
import ContactForm from "components/ContactForm/ContactForm";
import { HOME_COURSES, TABS_BLOG, TABS_HOME } from "data/MSK/courses";
import { POSTS } from "data/blog";
import WelcomeBlog from "./blog/WelcomeBlog";
import { DEMO_POSTS_NEWS } from "data/posts";
import Tendencies from "./blog/Tendencies";
import Newsletter from "./blog/Newsletter";
const MAGAZINE1_POSTS = DEMO_POSTS_NEWS.filter((_, i) => i >= 8 && i < 16);

const PageBlog: React.FC = () => {
  return (
    <div className="nc-PageHome relative">
      <Helmet>
        <title>PageBlog | MSK</title>
      </Helmet>

      {/* ======== ALL SECTIONS ======== */}
      <div className="relative overflow-hidden">
        {/* ======== BG GLASS ======== */}
        {/* ======= START CONTAINER ============= */}
        <div className="container relative">
          {/* === SECTION  === */}
          <WelcomeBlog tabs={[]} heading="" posts={POSTS} />
          <BlogSummary
            className="py-16 lg:py-28"
            posts={POSTS}
            tabs={TABS_BLOG}
            heading=""
            desc=""
          />
          <HomeExtraInfo />

          <Tendencies className="mt-24" />
          <div className="relative py-16 my-32">
            <BackgroundSection />
            <SectionSliderPosts
              postCardName="card9"
              heading="¿Buscas capacitarte a distancia?"
              subHeading="Estos son los cursos más elegidos entre profesionales de la salud"
              sliderStype="style2"
              posts={HOME_COURSES}
              uniqueSliderClass="pageHome-section6"
            />
          </div>
          <Newsletter />
        </div>
      </div>
    </div>
  );
};

export default PageBlog;
