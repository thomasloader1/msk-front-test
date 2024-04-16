import { TABS_BLOG } from "@/data/MSK/blog";
import SectionSliderPosts from "@/components/Sections/SectionSliderPosts";
import BlogSummary from "@/components/MSK/BlogSummary";
import BackgroundSection from "@/components/BackgroundSection/BackgroundSection";
import HomeExtraInfo from "@/components/MSK/HomeExtraInfo";
import { cookies } from "next/headers";
import ssr from "../../../../Services/ssr";
import { FetchPostType } from "@/data/types";
import WelcomeBlog from "@/components/MSK/Blog/WelcomeBlog";
import NewsletterBlog from "@/components/MSK/Blog/NewsletterBlog";
import { Metadata } from "next";

interface PageProps {
  params: any;
}
export const runtime = 'edge';
export const metadata: Metadata = {
  title: "Blog",
  alternates:{
    canonical: `${process.env.NEXT_PUBLIC_URL}/blog`
  }
};

const PageBlog: React.FC<PageProps> = async ({ params }) => {
  const currentCountry = params.lang || cookies().get("country")?.value;
  const allBestSellers = await ssr.getBestSellers(currentCountry);
  const allPosts = await ssr.getPosts(currentCountry);
  const welcomePosts = allPosts.filter((p: FetchPostType, i: number) => i < 4);

  return (
    <div className="nc-PageBlog relative animate-fade-down">
      <div className="relative overflow-hidden">
        <div className="container relative">
          <WelcomeBlog tabs={[]} heading="" posts={welcomePosts} />
          <BlogSummary
            posts={allPosts}
            tabs={TABS_BLOG}
            className="py-16 "
            heading=""
            desc="Recursos para informarte y aprender de distintas maneras"
            showTitle
            forSingleNote={false}
          />
          <HomeExtraInfo country={currentCountry} className="mb-16" />
          <div className="relative py-16">
            <BackgroundSection />
            <SectionSliderPosts
              posts={allBestSellers}
              postCardName="card9"
              heading="Nuestros cursos más elegidos"
              subHeading="Profesionales como tú ya se capacitaron con ellos. ¡Ahora te toca a ti!"
              sliderStype="style2"
              uniqueSliderClass="PageBlog-section6"
            />
          </div>
          <NewsletterBlog />
        </div>
      </div>
    </div>
  );
};

export default PageBlog;
