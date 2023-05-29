//  ######  CustomLink  ######## //
export interface CustomLink {
  label: string;
  href: string;
  targetBlank?: boolean;
}

//  ##########  PostDataType ######## //
export interface TaxonomyType {
  id: string | number;
  name: string;
  href: string;
  count?: number;
  thumbnail?: string;
  desc?: string;
  color?: TwMainColor | string;
  taxonomy?: "category" | "tag";
}

export interface PostAuthorType {
  id: string | number;
  firstName: string;
  lastName: string;
  displayName: string;
  avatar: string;
  bgImage?: string;
  email?: string;
  count: number;
  desc: string;
  jobName: string;
  href: string;
}
export interface Contact {
  id: number;
  entity_id_crm: string;
  name: string;
  last_name: string;
  profession: string;
  speciality: string | null;
  user_id: number;
  rfc: string;
  dni: string | null;
  fiscal_regime: string;
  phone: string;
  email: string;
  sex: string;
  date_of_birth: string | null;
  country: string;
  state?: string;
  postal_code: string;
  address: string | null;
  created_at: string;
  updated_at: string;
  validate: string;
  contracts: Contract[];
}

export interface Contract {
  id: number;
  contact_id: number;
  installments: number | null;
  entity_id_crm: string;
  so_crm: string;
  status: string;
  status_payment: string;
  country: string;
  currency: string;
  products: UserCourse[];
}

export interface UserCourse {
  contract_id: number;
  contract_entity_id: string;
  entity_id_crm: string;
  quantity: number;
  product_code: string;
  price: string;
  discount: string;
  status?: string;
  status_payment?: string;
  title?: string;

  featured_image?: string;
}

export interface User {
  id: number;
  name: string;

  firstName: string;
  lastName: string;
  displayName: string;
  gender: string;
  avatar: string;
  bgImage: string;
  desc: string;
  jobName: string;
  email: string;
  email_verified_at: string | null;
  created_at: string;
  updated_at: string;
  contact?: Contact;
  profession?: string;
}

export interface PostAuthor {
  id: number;
  name: string;
  email: string;
  avatar: string;
  categories: PostCategory[];
}

export interface PostCategory {
  id: number;
  name: string;
  slug: string;
  description: string;
}

export interface FetchPostType {
  id: number;
  slug: string;
  date: string;
  link: string;
  title: string;
  excerpt: string;
  thumbnail: string;
  image?: string;
  categories: PostCategory[];
  tags: string[];
  author: PostAuthor;
  content: string;
}

export interface PostDataType {
  id: string | number;
  author: PostAuthorType;
  date: string;
  href: string;
  categories: TaxonomyType[];
  title: string;
  featuredImage: string;
  desc?: string;
  like: {
    count: number;
    isLiked: boolean;
  };
  bookmark: {
    count: number;
    isBookmarked: boolean;
  };
  commentCount: number;
  viewdCount: number;
  readingTime: number;
  postType: "standard" | "video" | "gallery" | "audio";
  videoUrl?: string;
  audioUrl?: string;
  galleryImgs?: string[];
}

export interface BlogDataType {
  index: number;
  id: string;
  featuredImage: string;
  title: string;
  desc: string;
  date: string;
  href: string;
  commentCount: number;
  viewdCount: number;
  readingTime: number;
  bookmark: {
    count: number;
    isBookmarked: boolean;
  };
  like: {
    count: number;
    isLiked: boolean;
  };
  author: any;
  categoriesId?: number[];
  categories: any;
  postType: string;
}

export type TwMainColor =
  | "pink"
  | "green"
  | "yellow"
  | "yellow-strong"
  | "red"
  | "red-strong"
  | "indigo"
  | "blue"
  | "blue-light"
  | "purple"
  | "gray";

export interface VideoType {
  id: string;
  title: string;
  thumbnail: string;
}

export interface FichaDataHidden {
  profession: string;
  category: string;
  price: string;
  certificate: string;
  hours: string;
  product_id: number;
  product_permalink: string;
}

export interface FichaCategory {
  term_id: number;
  name: string;
  slug: string;
}

export interface Ficha {
  data_hidden: FichaDataHidden;
  novedad: string;
  categorias: FichaCategory[];
  title: string;
  image: string;
  code: string;
  isbn: string;
  description: string;
}

export interface DetailsItem {
  value: string;
  icon: string;
  title: string;
}
export interface Details {
  duration: DetailsItem;
  modality: DetailsItem;
  flexibility: DetailsItem;
  content: DetailsItem;
}

export interface Aval {
  index: number;
  id: number;
  title: string;
  description: string;
  image: string;
}

export interface Requirement {
  description: string;
}

export interface TopicData {
  row_count: number;
  estimated_time: string;
  rows_per_page: number;
  temario_link: string;
}
export interface Topic {
  data?: TopicData;
  [index: number]: {
    card_title: string;
    card_body: string;
  };
}

export interface Evaluation {
  data?: {
    row_count: number;
    rows_per_page: number;
  };
  [index: number]: {
    methodology: string;
  };
}

export interface ProductAuthor {
  id: number;
  name: string;
  description: string;
  image: string;
  specialties: string[];
  centres: string[];
}
export interface FetchSingleProduct {
  ficha: Ficha;
  description: string;
  details: Details;
  avales: Aval[];
  requirements: Requirement[];
  goals: string;
  temario: Topic;
  evaluacion: Evaluation;
  authors: ProductAuthor[];
  related_products: FetchCourseType[];
}
export interface FetchCourseType {
  id: number;
  slug: string;
  father_id: number;
  father_post_type: string;
  language_code: string;
  language_name: string;
  title: string;
  image: string;
  categories: Category[];
  professions: Profession[];
  duration: string;
  permalink: string;
  temario_link: string;
  why_course: string;
  is_new: boolean;
  nac_schools: null;
  int_schools: null;
  isbn: string;
  purchase_option: string;
  diploma: null;
  is_free: boolean;
  total_price: string;
  price_installments: string;
}

export interface Category {
  term_id: number;
  name: string;
  slug: string;
}

export interface Profession {
  id: number;
  name: string;
  slug: string;
}

export interface Specialty {
  id: number;
  name: string;
  href?: string;
}

export interface DurationFilter {
  id: number;
  name: string;
  value?: string;
}

export interface ResourceFilter {
  id: number;
  name: string;
}

export interface CourseDataType {
  index: number;
  id: string;
  featuredImage: string;
  title: string;
  desc: string;
  date: string;
  href: string;
  commentCount: number;
  viewdCount: number;
  readingTime: number;
  bookmark: {
    count: number;
    isBookmarked: boolean;
  };
  like: {
    count: number;
    isLiked: boolean;
  };
  authorId: number;
  author: any;
  categoriesId?: number[];
  categories: any;
  postType: string;
  level?: string;
  list?: any[];
  price?: string;
  discount_price?: string;
  length?: string;
  content?: string;
  summary?: string;
  modality?: string;
}

export type SignUp = {
  email: string;
  first_name: string;
  last_name: string;
  phone: string;
  password: string;
};
export type Login = {
  email: string;
  password: string;
};
export type ContactUs = {
  First_Name: string;
  Last_Name: string;
  Email: string;
  Profesion: string;
  Description: string;
  Especialidad: string;
  Phone: string;
  Preferencia_de_contactaci_n: string;
  Pais: string | {};
  Otra_especialidad?: string;
  Otra_profesion?: string;
  Cursos_consultados?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
};

export type Newsletter = {
  Email: string;
};

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  email: string | null;
  token: string | null;
}

export interface AuthAction {
  type: string;
  payload?: any;
}
