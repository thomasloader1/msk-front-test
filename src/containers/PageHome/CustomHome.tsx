import React from "react";
import SectionSliderPosts from "./SectionSliderPosts";
import SectionMagazine1 from "./SectionMagazine1";
import { Helmet } from "react-helmet";
import BackgroundSection from "components/BackgroundSection/BackgroundSection";
import { PostDataType } from "data/types";
import { DEMO_POSTS, DEMO_POSTS_AUDIO, DEMO_POSTS_VIDEO } from "data/posts";
import { DEMO_CATEGORIES } from "data/taxonomies";
import SectionMagazine4 from "./SectionMagazine4";
import HomeExtraInfo from "./HomeExtraInfo";
import SectionGridPosts from "./SectionGridPosts";
import BgGlassmorphism from "components/BgGlassmorphism/BgGlassmorphism";
import SectionHero from "components/SectionHero/SectionHero";
import rightImg from "images/hero-msk.png";
import Vector1 from "images/Vector1.png";
import SectionGridCategoryBox from "components/SectionGridCategoryBox/SectionGridCategoryBox";
import BrandSlider from "components/BrandSlider/BrandSlider";
import ContactForm from "components/ContactForm/ContactForm";
import { TOP_COURSES } from "data/courses";

//
const POSTS: PostDataType[] = DEMO_POSTS;
//
const MAGAZINE1_TABS = ["Todo", "Novedades", "Recomendados", "Especialidades"];
const MAGAZINE1_POSTS = DEMO_POSTS.filter((_, i) => i >= 8 && i < 16);
const MAGAZINE2_POSTS = DEMO_POSTS.filter((_, i) => i >= 0 && i < 7);
//

const CustomHome: React.FC = () => {
  return (
    <div className="nc-PageHome relative">
      <Helmet>
        <title>CustomHome | MSK</title>
      </Helmet>

      {/* ======== ALL SECTIONS ======== */}
      <div className="relative overflow-hidden">
        {/* ======== BG GLASS ======== */}
        <BgGlassmorphism />

        {/* ======= START CONTAINER ============= */}
        <div className="container relative">
          {/* === SECTION  === */}
          <SectionHero
            rightImg={rightImg}
            className="pt-10 pb-16 md:py-16 lg:pb-28 lg:pt-20"
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
            btnText="Comienza tu experiencia"
          />
          <SectionGridCategoryBox
            headingCenter={false}
            categoryCardType="card2"
            className="pb-16 lg:pb-28"
            categories={DEMO_CATEGORIES.filter((_, i) => i < 4)}
          />
          <BrandSlider />
          {/* === SECTION  === */}
          <SectionMagazine4
            className="py-16 lg:py-28"
            heading="Oportunidades para ti"
            posts={MAGAZINE2_POSTS}
            tabs={MAGAZINE1_TABS}
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
              posts={TOP_COURSES}
              uniqueSliderClass="pageHome-section6"
            />
          </div>
          {/* === SECTION 4 === */}
          <SectionMagazine1
            className="py-16 lg:py-28"
            posts={MAGAZINE1_POSTS}
            tabs={MAGAZINE1_TABS}
          />
        </div>
        {/* ======= END CONTAINER ============= */}

        {/* === SECTION 11 === */}
        <div className="dark bg-neutral-900 dark:bg-black dark:bg-opacity-20 text-neutral-100">
          <div className="relative container">
            <SectionGridPosts
              className="py-16 lg:py-28"
              headingIsCenter
              postCardName="card10V2"
              heading="Explore latest video articles"
              subHeading="Hover on the post card and preview video 🥡"
              posts={DEMO_POSTS_VIDEO.filter((_, i) => i > 5 && i < 12)}
              gridClass="md:grid-cols-2 lg:grid-cols-3"
            />
          </div>
        </div>

        {/* === SECTION  === */}
        <div className="container grid grid-cols-1 md:grid-cols-2 gap-4 my-40">
          <ContactForm />
        </div>

        {/* ======= END ALL SECTIONS ============= */}
      </div>
    </div>
  );
};

export default CustomHome;
