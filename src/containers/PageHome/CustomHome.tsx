import React from "react";
import SectionSliderPosts from "./SectionSliderPosts";
import SectionMagazine1 from "./SectionMagazine1";
import { Helmet } from "react-helmet";
import BackgroundSection from "components/BackgroundSection/BackgroundSection";
import { PostDataType } from "data/types";
import {
  DEMO_POSTS,
  DEMO_POSTS_AUDIO,
  DEMO_POSTS_VIDEO,
} from "data/posts";
import { DEMO_CATEGORIES } from "data/taxonomies";
import SectionMagazine4 from "./SectionMagazine4";
import SectionAds from "./SectionAds";
import SectionGridPosts from "./SectionGridPosts";
import BgGlassmorphism from "components/BgGlassmorphism/BgGlassmorphism";
import SectionHero from "components/SectionHero/SectionHero";
import rightImg from "images/hero-right.png";
import Vector1 from "images/Vector1.png";
import SectionGridCategoryBox from "components/SectionGridCategoryBox/SectionGridCategoryBox";
import BrandSlider from "components/BrandSlider/BrandSlider";
import ContactForm from "components/ContactForm/ContactForm";

//
const POSTS: PostDataType[] = DEMO_POSTS;
//
const MAGAZINE1_TABS = ["all", "Garden", "Fitness", "Design"];
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
              Far from face <br /> but not from {` `}
              <span className="relative pr-3">
                <img
                  className="w-full absolute top-1/2 -left-1 transform -translate-y-1/2"
                  src={Vector1}
                  alt=""
                />
                <span className="relative">heart</span>
              </span>
            </span>
          }
          btnText="Getting started"
          subHeading="Let stay at home and share with everyone the most beautiful stories in your hometown 🎈"
        />

        <SectionGridCategoryBox
          headingCenter={false}
          categoryCardType="card2"
          className="pb-16 lg:pb-28"
          categories={DEMO_CATEGORIES.filter((_, i) => i < 5)}
        />
        
        <BrandSlider />

          {/* === SECTION  === */}

        <SectionMagazine4
            className="py-16 lg:py-28"
            heading="Life styles 🎨 "
            posts={MAGAZINE2_POSTS}
            tabs={MAGAZINE1_TABS}
          />

          {/* === SECTION 3 === */}
          <SectionAds />

           {/* === SECTION 6 === */}
           <div className="relative py-16 my-32">
            <BackgroundSection />
            <SectionSliderPosts
              postCardName="card9"
              heading="Explore latest audio articles"
              subHeading="Click on the icon to enjoy the music or podcast 🎧"
              sliderStype="style2"
              posts={DEMO_POSTS_AUDIO.filter((_, i) => i > 3 && i < 10)}
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
