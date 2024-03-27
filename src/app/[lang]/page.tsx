import { TABS_HOME } from "@/data/MSK/courses";
import { TABS_BLOG } from "@/data/MSK/blog";
import { HOME_SPECIALTIES } from "@/data/MSK/specialties";
import SectionSliderPosts from "@/components/Sections/SectionSliderPosts";
import BlogSummary from "@/components/MSK/BlogSummary";
import BackgroundSection from "@/components/BackgroundSection/BackgroundSection";
import CoursesForYou from "@/components/MSK/CoursesForYou";
import HomeExtraInfo from "@/components/MSK/HomeExtraInfo";
import SectionHero from "@/components/SectionHero/SectionHero";
import SectionGridCategoryBox from "@/components/SectionGridCategoryBox/SectionGridCategoryBox";
import BrandSlider from "@/components/MSK/BrandSlider";
import PageHead from "@/components/MSK/PageHead";
import { cookies } from "next/headers";
import ssr from "../../../Services/ssr";
import {
  getAllBestSellers,
  getAllCourses,
  getAllPosts,
  isLoadingBestSellers,
  isLoadingCourses,
  setAllBestSellers,
  setAllCourses,
  setAllPosts,
} from "@/lib/allData";
import ContactForm from "@/components/MSK/ContactForm";

interface PageProps {
  params: any;
}

const PageHome: React.FC<PageProps> = async ({ params }) => {
  const currentCountry = params.lang || cookies().get("country")?.value;
  if (!getAllCourses().length) {
    const fetchedCourses = await ssr.getAllCourses(currentCountry);
    setAllCourses(fetchedCourses);
  }
  if (!getAllBestSellers().length) {
    const fetchedBestSellers = await ssr.getBestSellers(currentCountry);
    setAllBestSellers(fetchedBestSellers);
  }
  if (!getAllPosts() || !getAllPosts().length) {
    const fetchedPosts = await ssr.getPosts(currentCountry);
    setAllPosts(fetchedPosts);
  }

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
            courses={getAllCourses()}
            bestSeller={getAllBestSellers()}
            tabs={TABS_HOME}
            className="py-16"
            heading="Oportunidades para ti"
            desc="Cursos destacados para realizar a distancia"
            loading={isLoadingCourses() || isLoadingBestSellers()}
          />
          <HomeExtraInfo country={currentCountry} />
          <BlogSummary
            posts={getAllPosts()}
            tabs={TABS_BLOG}
            className="py-16 "
            heading=""
            desc=""
            showTitle
          />
          <div className="relative py-16">
            <BackgroundSection />
            <SectionSliderPosts
              posts={getAllBestSellers()}
              postCardName="card9"
              heading="Nuestros cursos más elegidos"
              subHeading="Profesionales como tú ya se capacitaron con ellos. ¡Ahora te toca a ti!"
              sliderStype="style2"
              uniqueSliderClass="pageHome-section6"
            />
          </div>
        </div>
        <div className="container grid grid-cols-1 md:grid-cols-3 gap-4 my-16">
          <ContactForm />
        </div>
      </div>
    </div>
  );
};

export default PageHome;
