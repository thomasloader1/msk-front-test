import { useState, useEffect } from 'react';
import api from '../Services/api'; // Asegúrate de importar tu módulo 'api' correctamente

const useCourses = () => {
  const [courses, setCourses] = useState([]);

  const fetchCourses = async () => {
    try {
      const coursesData = await api.getAllCourses();
      setCourses(coursesData);
    } catch (error) {
      // Manejar errores aquí si es necesario
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return { courses, fetchCourses };
};

export default useCourses;
