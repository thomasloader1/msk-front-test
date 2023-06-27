import { Contract, CourseProgress, UserCourse, UserCourseProgress } from "data/types";

export const getUserProducts = (res: any, courses: any): UserCourse[] => {
  let coursesList = [] as UserCourse[];
  res.contact.contracts.map((contract: Contract) => {
    contract.products.map((product: UserCourse) => {
      product.status = contract.status;
      product.status_payment = contract.status_payment;
      product.title = product.product_code;
      let globalProduct = courses.find(
        (productAux: { product_code: string }) => {
          return productAux.product_code == product.product_code;
        }
      );
      if (globalProduct) {
        product.title = globalProduct.title;
        product.slug = globalProduct.slug;
        product.id = globalProduct.id;
        product.categories = globalProduct.categories;
        product.image = globalProduct.image;

        if (globalProduct.image) {
          const imageURL = globalProduct.image.replace("mx.", "");
          product.featured_image = imageURL;
        }
      }
      coursesList.push({ ...product });
    });
  });
  return coursesList;
};

export const getUserCourses = (res: any, courses: any): UserCourseProgress[] => {
  let coursesList = [] as UserCourseProgress[];
  res.contact.courses_progress.map((cp: CourseProgress) => {
    let product = {
      status: cp.Estado_cursada,
      status_payment: "Nose que usar",
      product_code: cp.Product_Code,
      product_code_cedente: cp.C_digo_de_Curso_Cedente,
      title: '',
      slug: '',
      id: '',
      categories: '',
      image: '',
      featured_image: '',
    }

    let globalProduct = courses.find(
      (productAux: { product_code: number }) => {
        return productAux.product_code == product.product_code;
      }
    );

    if (globalProduct) {
      product.title = globalProduct.title;
      product.slug = globalProduct.slug;
      product.id = globalProduct.id;
      product.categories = globalProduct.categories;
      product.image = globalProduct.image;

      if (globalProduct.image) {
        const imageURL = globalProduct.image.replace("mx.", "");
        product.featured_image = imageURL;
      }
    }
    coursesList.push({ ...product });
  });
  return coursesList;
};