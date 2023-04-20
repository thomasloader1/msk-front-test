import { Specialty } from "../types";

const SPECIALTIES: Specialty[] = [
  {
    id: 1,
    name: "Cardiología",
    href: "/archive/the-demo-archive-slug",
    thumbnail: "/src/images/courses/cardiology.png",
    count: 13,
    color: "green",
  },
  {
    id: 2,
    name: "Enfermería",
    href: "/archive/the-demo-archive-slug",
    thumbnail: "/src/images/courses/nursing.png",
    count: 16,
    color: "red",
  },
  {
    id: 3,
    name: "Medicina General",
    href: "/archive/the-demo-archive-slug",
    thumbnail: "/src/images/courses/medical.png",
    count: 15,
    color: "yellow",
  },
  {
    id: 4,
    name: "Infectología",
    href: "/archive/the-demo-archive-slug",
    thumbnail: "/src/images/courses/infectology.png",
    count: 21,
    color: "pink",
  },
  {
    id: 5,
    name: "Anestesiología",
    href: "/archive/the-demo-archive-slug",
    thumbnail: "/src/images/courses/infectology.png",
    count: 21,
    color: "yellow",
  },
  {
    id: 6,
    name: "Nutrición",
    href: "/archive/the-demo-archive-slug",
    thumbnail: "/src/images/courses/infectology.png",
    count: 21,
    color: "yellow",
  },
  {
    id: 7,
    name: "Medicina Interna",
    href: "/archive/the-demo-archive-slug",
    thumbnail: "/src/images/courses/infectology.png",
    count: 21,
    color: "yellow",
  },
];

const CATEGORIES: Specialty[] = [
  { name: "Anestesiología y dolor", id: "an_dol" },
  { name: "Cardiología", id: "car" },
  { name: "Cirugía", id: "cir" },
  { name: "Dermatología", id: "der" },
  { name: "Diabetes", id: "dia" },
  { name: "Emergentología", id: "eme" },
  { name: "Gastroenterología", id: "gas" },
  { name: "Geriatría", id: "ger" },
  { name: "Ginecología", id: "gin" },
  { name: "Infectología", id: "inf" },
  { name: "Inglés técnico", id: "ing" },
  { name: "Kinesiología", id: "kin" },
  { name: "Medicina familiar", id: "med_fam" },
  { name: "Medicina general", id: "med_gen" },
  { name: "Medicina intensiva", id: "med_int" },
  { name: "Nutrición", id: "nut" },
  { name: "Obstetricia", id: "obs" },
  { name: "Odontología", id: "odo" },
  { name: "Oftalmología", id: "oft" },
  { name: "Oncología", id: "onc" },
  { name: "Psicología", id: "psi" },
  { name: "Psiquiatría", id: "psi" },
  { name: "Pediatría", id: "ped" },
  { name: "Hematología", id: "hem" },
  { name: "Traumatología", id: "tra" },
];

export { SPECIALTIES, CATEGORIES };
