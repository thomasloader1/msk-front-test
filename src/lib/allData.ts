// Courses
let allCourses: any = [];
let loadingCourses: boolean = false;
export const setAllCourses = (courses: any) => {
  allCourses = courses;
};
export const getAllCourses = () => allCourses;
export const setLoadingCourses = (value: boolean) => (loadingCourses = value);
export const isLoadingCourses = () => loadingCourses;

// Best Sellers
let allBestSellers: any = [];
let loadingBestSellers: boolean = false;
export const setAllBestSellers = (bestSellers: any) => {
  allBestSellers = bestSellers;
};
export const getAllBestSellers = () => allBestSellers;
export const setLoadingBestSellers = (value: boolean) =>
  (loadingBestSellers = value);
export const isLoadingBestSellers = () => loadingBestSellers;

// Posts
let allPosts: any = [];
let loadingPosts: boolean = false;
export const setAllPosts = (posts: any) => {
  allPosts = posts;
};
export const getAllPosts = () => allPosts;
export const setLoadingPosts = (value: boolean) => (loadingPosts = value);
export const isLoadingPosts = () => loadingPosts;

// Store
let allStoreSpecialties: any = [];
let loadingAllStoreSpecialties: boolean = false;
export const setAllStoreSpecialties = (value: any) => {
  allStoreSpecialties = value;
};

export const getAllStoreSpecialties = () => allStoreSpecialties;
export const isLoadingStoreSpecialties = () => loadingAllStoreSpecialties;
