import React, { useEffect, useState } from "react";
import SectionSliderPosts from "./home/SectionSliderPosts";
import { Helmet } from "react-helmet";
import BackgroundSection from "components/BackgroundSection/BackgroundSection";
import HomeExtraInfo from "containers/PageMSK/home/HomeExtraInfo";
import BlogSummary from "./home/BlogSummary";
import { TABS_BLOG } from "data/MSK/blog";
import WelcomeBlog from "./blog/WelcomeBlog";
import Tendencies from "./blog/Tendencies";
import Newsletter from "./blog/Newsletter";
import axios from "axios";
import { API_URL } from "data/api";
import { useHistory } from "react-router-dom";
const PageBlog: React.FC = () => {
  const [posts, setPosts] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchPosts = async () => {
    const res = await axios.get(`${API_URL}/posts`);
    const formattedPosts = res.data.posts.map((post: any) => ({
      ...post,
      image: post.thumbnail,
    }));

    setPosts(formattedPosts);
    setLoading(false);
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
