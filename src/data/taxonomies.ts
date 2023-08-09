import __taxonomies from "./jsons/__taxonomies.json";
import { TaxonomyType } from "./types";

const cat_list_home = [
  {
    id: 1,
    name: "Cardiología",
    href: "/tienda",
    thumbnail: "/src/images/courses/cardiology.png",
    count: 13,
    color: "green",
  },
  {
    id: 2,
    name: "Urgencia",
    href: "/tienda",
    thumbnail: "/src/images/courses/urgencias.png",
    count: 16,
    color: "red",
  },
  {
    id: 3,
    name: "Medicina general",
    href: "/tienda",
    thumbnail: "/src/images/courses/medical.png",
    count: 15,
    color: "yellow",
  },
  {
    id: 4,
    name: "Infectología",
    href: "/tienda",
    thumbnail: "/src/images/courses/infectology.png",
    count: 21,
    color: "pink",
  },
];

const HOME_CATEGORIES: TaxonomyType[] = cat_list_home.map((item) => ({
  ...item,
  taxonomy: "category",
}));

const DEMO_CATEGORIES: TaxonomyType[] = __taxonomies.map((item) => ({
  ...item,
  taxonomy: "category",
}));

const DEMO_TAGS: TaxonomyType[] = __taxonomies.map((item) => ({
  ...item,
  taxonomy: "tag",
}));

export { DEMO_CATEGORIES, DEMO_TAGS, HOME_CATEGORIES };
