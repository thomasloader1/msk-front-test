import { TABS_HOME } from "@/data/MSK/courses";
import { TABS_BLOG } from "@/data/MSK/blog";
import { HOME_SPECIALTIES } from "@/data/MSK/specialties";
import { DataContext } from "@/context/data/DataContext";
import SectionSliderPosts from "@/components/Sections/SectionSliderPosts";
import BlogSummary from "@/components/MSK/BlogSummary";
import BackgroundSection from "@/components/BackgroundSection/BackgroundSection";
import CoursesForYou from "@/components/MSK/CoursesForYou";
import HomeExtraInfo from "@/components/MSK/HomeExtraInfo";
import SectionHero from "@/components/SectionHero/SectionHero";
import SectionGridCategoryBox from "@/components/SectionGridCategoryBox/SectionGridCategoryBox";
import BrandSlider from "@/components/MSK/BrandSlider";
import ContactForm from "@/components/MSK/ContactForm";
import PageHead from "@/components/MSK/PageHead";
import api from "../../../Services/api";
import { getCoursesMiddleware } from "@/middleware";
import { cookies } from "next/headers";
import ssr from "../../../Services/ssr";

interface PageProps {
  params: any;
}

const PageHome: React.FC<PageProps> = async ({ params }) => {
  const currentCountry = params.lang || cookies().get("country")?.value;
  const allCourses = await ssr.getAllCourses(currentCountry);
  const allBestSellers = await ssr.getBestSellers(currentCountry);
  const allPosts = await ssr.getPosts(currentCountry);

  const scrollToContactForm = () => {
    // const contactForm = document.getElementById("contactanos");
    // if (contactForm) {
    //   window.scrollTo({
    //     top: document.getElementById("contactanos")!.offsetTop,
    //     behavior: "smooth",
    //   });
    // }
  };
  return (
    <div className="nc-PageHome relative animate-fade-down">
      <PageHead
        title="Inicio"
        description="Una propuesta moderna para expandir tus metas profesionales"
      />
      <div className="relative overflow-hidden">
        <div className="container relative">
          <SectionHero
            rightImg={"/images/hero-msk.png"}
            className="pt-10 pb-16 md:py-16 lg:pb-28 lg:pt-20"
            btnText="Comienza tu experiencia"
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
            courses={allCourses}
            bestSeller={allBestSellers}
            tabs={TABS_HOME}
            className="py-16"
            heading="Oportunidades para ti"
            desc="Cursos destacados para realizar a distancia"
          />
          <HomeExtraInfo country={currentCountry} />
          <BlogSummary
            posts={allPosts}
            tabs={TABS_BLOG}
            className="py-16 "
            heading=""
            desc=""
            showTitle
          />
          <div className="relative py-16">
            <BackgroundSection />
            <SectionSliderPosts
              posts={allBestSellers}
              postCardName="card9"
              heading="Nuestros cursos más elegidos"
              subHeading="Profesionales como tú ya se capacitaron con ellos. ¡Ahora te toca a ti!"
              sliderStype="style2"
              uniqueSliderClass="pageHome-section6"
            />
          </div>
        </div>
        <div className="container grid grid-cols-1 md:grid-cols-3 gap-4 my-16">
          {/* <ContactForm /> */}
        </div>
      </div>
    </div>
  );
};

export default PageHome;
