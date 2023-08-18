import { useState, useEffect } from 'react';
import api from '../Services/api'; // Asegúrate de importar tu módulo 'api' correctamente

const usePosts = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchPosts = async () => {
        try {
            const postsData = await api.getPosts();
            setPosts(postsData);
            setLoading(false);
        } catch (error) {
            // Manejar errores aquí si es necesario
            console.error({ error })
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    return { posts, loading, fetchPosts };
};

export default usePosts;
