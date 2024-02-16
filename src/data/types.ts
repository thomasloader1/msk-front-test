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
  entity_id_crm?: string;
  name: string;
  last_name: string;
  profession: string;
  speciality: string | null;
  user_id: number;
  rfc: string;
  dni: string;
  rut: string;
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
  other_profession?: string;
  other_speciality?: string;
  career?: string;
  year?: string;
  courses_progress: CourseProgress[];
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

export interface CourseProgress {
  Avance: string;
  C_digo_de_Curso_Cedente: string;
  Created_Time: "2023-05-24T11:10:41-03:00";
  Enrollamiento: "2023-05-24T11:10:00-03:00";
  Estado_cursada: string;
  Estado_de_OV: string | null;
  Fecha_de_compra: "2023-05-24T11:10:00-03:00";
  Fecha_de_expiraci_n: "2026-03-01T12:37:57-03:00";
  Fecha_limite_de_Enrolamiento: "2026-03-01T12:37:57-03:00";
  Fecha_de_ltima_sesi_n: string | null;
  Fecha_finalizaci_n: string | null;
  Nombre_de_curso: string;
  Nota: number | null;
  Plataforma_enrolamiento: string;
  Product_Code: number;
  contact_id: number;
  entity_id_crm: string;
}
export interface UserCourseProgress {
  avance: string;
  ov: string;
  expiration: string;
  limit_enroll: string;
  product_code: number;
  product_code_cedente: string;
  status: string;
  status_payment: string;
  title: string;
  slug?: string;
  id?: string | number;
  categories?: any;
  featured_image: string;
  thumbnail: {
    high: string;
  };
  image?: string;
  father_post_type: string;
  lista_de_cedentes?: Array<{ post_title: string }>;
  duration?: string;
  excerpt?: string;
  date?: string;
  author: any;
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
  slug?: string;
  id?: string | number;
  categories?: any;
  image?: string;
  father_post_type?: string;
  excerpt?: string;
  date?: string;
  author?: any;
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
  speciality?: string;
}

export interface UserProfile {
  courses_progress: CourseProgress[];
}

export interface CustomUser {
  id: number;
  firstName: string;
  lastName: string;
  displayName: string;
  gender: string;
  avatar: string;
  bgImage: string;
  count: number;
  href: string;
  desc: string;
  jobName: string;
  email: string;
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
  author: any;
  content: string;
  father_post_type?: string;
}

export interface PostDataType {
  id: string | number;
  author: any;
  date?: string;
  href: string;
  categories: TaxonomyType[];
  title: string;
  featuredImage?: string;
  featured_image?: string;
  desc?: string;
  specialty?: string;
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
  image?: string;
  audioUrl?: string;
  galleryImgs?: string[];
  cursos_recomendados?: any;
  the_most_read?: any;
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
  temario_link_pdf?: string;
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
  post_title: any;
  id: number;
  name: string;
  description: string;
  image: string;
  specialties: string[];
  centres: string[];
}

export interface Cedente {
  ID: number;
  post_title: string;
  post_type: string;
  imagen: string;
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
  lista_de_cedentes?: Cedente[];
  modalidad: string;
  curso_disponible: string;
  asesoramiento_academico: string;
  certificacion: string;
  idioma: string[];
  temario_link_pdf?: string;
  params: {
    slug: string;
  };
  featured_product_text: string;
  total_price: string;
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
  thumbnail: {
    high: string;
  };
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
  lista_de_cedentes: any[];
  excerpt?: string;
  date?: string;
  author?: any;
}

export interface Category {
  term_id: number;
  name: string;
  slug: string;
}

export interface CategoryWP {
  id: number;
  name: string;
  slug: string;
  link: string;
  description: string;
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

export interface PageFilter {
  id: number;
  name: string;
  total: number;
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
  name: string;
  email: string;
  first_name: string;
  last_name: string;
  phone: string;
  country: string;
  profession: string;
  speciality: string;
  Otra_profesion: string;
  Otra_especialidad: string;
  Year: string;
  Career: string;
  recaptcha_token: string | null;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
};
export type Login = {
  email: string;
  password: string;
  recaptcha_token: string | null;
};

export type ContactCRM = {
  First_Name: string;
  Last_Name: string;
  Email: string;
  Phone: string;
  Date_of_Birth: string;
  Identificacion: string;
  Tipo_de_Documento: string;
  Mailing_Street: string;
  Mailing_City: string;
  Mailing_State: string;
  Mailing_Zip: string;
  Pais: string;
  Full_Name: string;
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
  year?: string;
  career?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  recaptcha_token: string | null;
};

export type Newsletter = {
  Email: string;
  First_Name: string;
  Last_Name: string;
  Profesion: string;
  Especialidad: string;
  Otra_especialidad?: string;
  Otra_profesion?: string;
  Temas_de_interes?: string[];
};

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  profile: UserProfile | null;
  email: string | null;
  entity_id_crm: string | null;
  token: string | null;
  expires_at: number | null;
  bypassRedirect: boolean | number | null;
  onRequest: boolean | null;
}

export interface CountryState {
  country: string;
  error?: string;
}

export interface AuthAction {
  type: string;
  payload?: any;
}

export interface CustomStaticContext {
  status?: number;
}

export type SpecialtiesMapping = {
  cardiologia: string;
  emergentologia: string;
  "medicina-general": string;
  infectologia: string;
  "medicina-familiar": string;
  nutricion: string;
  pediatria: string;
  oncologia: string;
  gastroenterologia: string;
  obstetricia: string;
  "anestesiologia-y-dolor": string;
  hematologia: string;
  diabetes: string;
  ginecologia: string;
  traumatologia: string;
  cirugia: string;
  geriatria: string;
  "medicina-intensiva": string;
  dermatologia: string;
  psiquiatria: string;
  oftalmologia: string;
};
export interface JsonMapping {
  [key: string]: string;
}
export interface JsonInstallmentsMapping {
  [key: string]: {
    quotes: number;
    gateway: string;
  };
}
export interface RebillTransaction{
  id: string,
  cartId: string;
  organizationId: string;
  paidBags: [
      {
          payment: {
              amount: string;
              id: string;
              currency: string;
              status: string;
              gateway: {
                  id: string;
                  type: string;
                  country: string;
                  description:string;
                  status: string;
              },
              errorMessage: string;
              createdAt: string;
              source: string;
          },
          prices: [
              {
                  id: string;
                  quantity: number
              }
          ],
          schedules: string[]
      }
  ],
  buyer: {
      customer: {
          id: string;
          firstName: string;
          lastName:string;
          cellPhone: string;
          birthday: string;
          taxIdType:string;
          taxIdNumber: string;
          personalIdType:string;
          personalIdNumber: string;
          userEmail: string;
          address: {
              street: string;
              city: string;
              state: string;
              country: string;
              zipCode: string;
              number: string;
              floor: string;
              apt: string;
              description: string;
          }
      },
      card: {
          id: string;
          bin: number;
          last4: string;
          cardHolder: string;
          cardNumber: string;
          expiration: {
              month: number;
              year: string;
          }
      }
  },
  type: string;
  createdAt: string;
}
