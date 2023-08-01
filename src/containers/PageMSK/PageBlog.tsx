import React, { useEffect, useState } from "react";
import SectionSliderPosts from "./home/SectionSliderPosts";
import { Helmet } from "react-helmet";
import BackgroundSection from "components/BackgroundSection/BackgroundSection";
import HomeExtraInfo from "containers/PageMSK/home/HomeExtraInfo";
import BlogSummary from "./home/BlogSummary";
import { TABS_BLOG } from "data/MSK/blog";
import WelcomeBlog from "./blog/WelcomeBlog";
import Newsletter from "./blog/Newsletter";
import axios from "axios";
import { API_URL } from "data/api";
import api from "Services/api";
const PageBlog: React.FC = () => {
  const [posts, setPosts] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchPosts = async () => {
    const posts = await api.getPosts();
    setPosts(posts);
    setLoading(false);
  };
  const fetchCourses = async () => {
    const res = await api.getAllCourses();
    setCourses(res);
  };
  useEffect(() => {
    fetchPosts();
    fetchCourses();
  }, []);

  return (
    <div className="nc-PageHome relative">
      <Helmet>
        <title>MSK | Blog</title>
      </Helmet>

      {/* ======== ALL SECTIONS ======== */}
      <div className="relative overflow-hidden">
        {/* ======== BG GLASS ======== */}
        {/* ======= START CONTAINER ============= */}
        <div className="container relative">
          {/* === SECTION  === */}
          <WelcomeBlog tabs={[]} heading="" posts={posts} loading={loading} />
          <BlogSummary
            posts={posts}
            tabs={TABS_BLOG}
            loading={loading}
            className="py-16 lg:py-28"
            heading=""
            desc=""
          />
          <HomeExtraInfo />
          {/* <Tendencies className="mt-24" /> */}
          <div className="relative py-16 my-32">
            <BackgroundSection />
            <SectionSliderPosts
              posts={courses}
              loading={loading}
              postCardName="card9"
              heading="¿Buscas capacitarte a distancia?"
              subHeading="Estos son los cursos más elegidos entre profesionales de la salud"
              sliderStype="style2"
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
