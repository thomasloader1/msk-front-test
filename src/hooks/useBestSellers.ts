import api from 'Services/api';
import { useEffect, useState } from 'react';


const useBestSellers = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  const fetchCourses = async () => {
    try {
      const res = await api.getBestSellers(); // Asegúrate de que esta función sea proporcionada por tu módulo de API
      setCourses(res);
    } catch (err) {
        console.log({err})
      setError(err as string);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return { courses, loading, error };
};

export default useBestSellers;
