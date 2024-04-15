import { WpContentData } from "@/data/types";
import ssr from "@Services/ssr";

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

let allProfessions: any = [];
let loadingAllProfessions: boolean = false;
export const setAllProfessions = (value: any) => {
  console.log("Seteando profesiones:",{value})
  allProfessions = value;
};

export const getAllProfessions = () => allProfessions;
export const isLoadingProfessions = () => loadingAllProfessions;

//PageHome
export let pageHomeWpContent: WpContentData | undefined = undefined;
let loadingPageHomeWpContent: boolean = false;

export const setPageHomeWpContent = (value: any) => {
  pageHomeWpContent = value;
};
export const getPageHomeWpContent = () => pageHomeWpContent;
export const getPageHomeWpData = async (currentCountry:string) => {
  const pageData = getPageHomeWpContent()
  
  if (typeof pageData === 'undefined') {
    const fetchedContent = await ssr.getWpContent("/home-msk",currentCountry);
    setPageHomeWpContent(fetchedContent);
  }
}
export const isLoadingPageHomeWpContent = () => loadingPageHomeWpContent;