import { useState, useEffect, useContext } from "react";
import api from "../Services/api";
import { CountryContext } from "context/country/CountryContext";

const usePosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { state } = useContext(CountryContext);

  const fetchPosts = async () => {
    try {
      const postsData = await api.getPosts(state?.country);
      setPosts(postsData);
      setLoading(false);
    } catch (error) {
      console.error({ error });
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return { posts, loading, fetchPosts };
};

export default usePosts;
