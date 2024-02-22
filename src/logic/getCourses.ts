import { DataContext } from "context/data/DataContext";
import { useContext } from "react";

export const filterAllCoursesBySlug = (slug: string) => {
    const { state } = useContext(DataContext);
    const allCourses = state.allCourses;
    // slug = "aferesis-terapeutica-en-enfermedades-hematologicas";

    const filteredCourses = allCourses.filter((course: any) => course.slug == slug);
    
    let objetoSEO = null;

    if (filteredCourses.length !== 0) {
        objetoSEO = generateSchemaCourse(filteredCourses[0]);
    }

    // console.log({filterAllCoursesBySlug: {
    //   slug,
    //   filteredCourses,
    //   objetoSEO
    // }});

    return objetoSEO;
};

  export const getAllCoursesWithSchema = () => {
    const { state } = useContext(DataContext);
    const allCourses = state.allCourses;
    
    // Aplicar CourseSchema a cada curso y devolver los objetos transformados
    const coursesWithSchema = allCourses.map((course: Course) => {
      const objetoSEO = generateSchemaCourse(course);
      return objetoSEO;
    });
  
    return coursesWithSchema;
  };

  const generateSchemaCourse = (course: Course) => {
    return {
      "@context": "https://schema.org",
      "@type": "Course",
      "name": course.title,
      "description": course.why_course,
      "url": course.permalink,//tiene el link del wp
      "image": course.image,
      "duration": course.duration,
      "price": course.total_price,
      "category": course.categories.map((category:any) => category.name).join(", "),
      "professions": course.professions.map((profession:any) => profession.title).join(", "),
      "location": course.language_name,
      "isbn": course.isbn
    };
  };
  
  const CourseSchema = ({ course }: { course: Course }) => {
    const generarObjetoSEO = (curso: Course) => {
      return {
        "@context": "https://schema.org",
        "@type": "Course",
        "name": course.title,
        "description": course.why_course,
        "url": course.permalink,
        "image": course.image,
        "duration": course.duration,
        "price": course.total_price,
        "category": course.categories.map((category:any) => category.name).join(", "),
        "professions": course.professions.map((profession:any) => profession.title).join(", "),
        "keywords": course.related_tag.join(", "),
        "location": course.language_name,
        "isbn": course.isbn
      };
    };
  
    const objetoSEO = generarObjetoSEO(course);
  
    return objetoSEO;
  };
  

interface Course {
  id: number;
  related_tag: number[];
  father_id: number;
  slug: string;
  father_post_type: string;
  language_code: string;
  language_name: string;
  product_code: number;
  featured_product_text: string;
  title: string;
  image: string;
  thumbnail: {
    high: string;
    medium: string;
    low: string;
  };
  categories: {
    term_id: number;
    name: string;
    slug: string;
  }[];
  professions: {
    title: string;
    name: string;
  }[];
  duration: string;
  permalink: string;
  lista_de_cedentes: {
    ID: number;
    post_author: string;
    post_date: string;
    post_date_gmt: string;
    post_content: string;
    post_title: string;
    post_excerpt: string;
    post_status: string;
    comment_status: string;
    ping_status: string;
    post_password: string;
    post_name: string;
    to_ping: string;
    pinged: string;
    post_modified: string;
    post_modified_gmt: string;
    post_content_filtered: string;
    post_parent: number;
    guid: string;
    menu_order: number;
    post_type: string;
    post_mime_type: string;
    comment_count: string;
    filter: string;
    imagen: string;
  }[];
  why_course: string;
  is_new: boolean;
  nac_schools: null;
  int_schools: null;
  isbn: string;
  purchase_option: string;
  diploma: null;
  is_free: boolean;
  total_price: string;
  max_installments: string;
  price_installments: string;
  created_at: string;
}
