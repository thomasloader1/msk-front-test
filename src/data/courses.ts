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
}

// TABS LIST
const TABS_HOME = ["Todo", "Novedades", "Recomendados", "Especialidades"];
const TABS_BLOG = ["Todo", "Actualidad", "Entrevistas", "Opinión"];

// COURSES LIST

const HOME_COURSES = [
  {
    index: 1,
    id: "9e3e3994-a3ed-47ca-a014-d4483884cfe2",
    featuredImage: "src/images/home/opp1.png",
    title: "ACCSAP. Programa de actualización en cardiología clínica",
    desc: "American College of Cardiology",
    date: "May 20, 2021",
    href: "/single/this-is-single-slug",
    commentCount: 11,
    viewdCount: 2504,
    readingTime: 2,
    bookmark: { count: 3007, isBookmarked: false },
    like: { count: 3366, isLiked: true },
    authorId: 3,
    author: "",
    categories: [{ name: "Cardiología" }],
    postType: "standard",
  },
  {
    index: 2,
    id: "af92a665-4a4d-4cff-9e17-89456df21fb5",
    featuredImage: "src/images/home/opp2.png",
    title: "Curso de preparación oposiciones de anestesia y reanimación",
    desc: "Tropos",
    date: "May 20, 2021",
    href: "/single/this-is-single-slug",
    commentCount: 13,
    viewdCount: 9999,
    readingTime: 5,
    bookmark: { count: 3751, isBookmarked: false },
    like: { count: 3024, isLiked: false },
    authorId: 4,

    author: "",
    categories: [{ name: "Anestesiología" }],
    postType: "video",
    videoUrl: "https://www.youtube.com/watch?v=U5afsxvz75c",
  },
  {
    index: 3,
    id: "dffe0224-ebff-4803-bb66-e8d128656284",
    featuredImage: "src/images/home/opp3.png",
    title: "Curso de Endocrinología y Nutrición",
    desc: "Tropos",
    date: "May 20, 2021",
    href: "/single/this-is-single-slug",
    commentCount: 33,
    viewdCount: 8888,
    readingTime: 2,
    bookmark: { count: 76, isBookmarked: false },
    like: { count: 222, isLiked: false },
    authorId: 4,

    author: "",
    categories: [{ name: "Nutrición" }],
    postType: "standard",
  },
  {
    index: 4,
    id: "5ac7cb90-4694-42e8-8883-16372711eaa8",
    featuredImage: "src/images/home/opp4.png",
    title: "Curso online de preparación oposiciones de medicina interna",
    desc: "Tropos",
    date: "May 20, 2021",
    href: "/single/this-is-single-slug",
    commentCount: 49,
    viewdCount: 10000,
    readingTime: 6,
    bookmark: { count: 264, isBookmarked: true },
    like: { count: 3735, isLiked: true },
    authorId: 5,

    author: "",
    categories: [{ name: "Medicina Interna" }],
    postType: "standard",
  },
  {
    index: 5,
    id: "f82a8455-3a14-4af9-b6d2-ac6cd74e007c",
    featuredImage: "src/images/home/opp5.png",
    title: "Curso de Cardiología",
    desc: "Tropos",
    date: "May 20, 2021",
    href: "/single/this-is-single-slug",
    commentCount: 9,
    viewdCount: 7777,
    readingTime: 5,
    bookmark: { count: 733, isBookmarked: false },
    like: { count: 3569, isLiked: true },
    authorId: 10,
    author: "",
    categories: [{ name: "Cardiología" }],
    postType: "video",
    videoUrl: "https://www.youtube.com/watch?v=dBsicD0ItD0&t=32s",
  },
  {
    index: 6,
    id: "54c11c92-049f-4353-8cdb-f7ec70d3ae75",
    featuredImage: "src/images/home/opp6.png",
    title: "Curso superior en médicina interna. MKSAP 18",
    desc: "American College of Cardiology",
    date: "May 20, 2021",
    href: "/single/this-is-single-slug",
    commentCount: 13,
    viewdCount: 4475,
    readingTime: 2,
    bookmark: { count: 199, isBookmarked: false },
    like: { count: 3052, isLiked: true },
    authorId: 9,

    author: "",
    categories: [{ name: "Medicina Interna" }],
    postType: "standard",
  },
];

const TOP_COURSES = [
  {
    index: 91991123123,
    id: "DEMO_POSTS_AUDIO_1",
    featuredImage:
      "https://images.pexels.com/photos/6843304/pexels-photo-6843304.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
    title: "Lenovo’s smarter devices ",
    desc: "Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.",
    date: "May 20, 2021",
    href: "/single-audio/this-is-single-slug",
    commentCount: 11,
    viewdCount: 2504,
    readingTime: 2,
    bookmark: {
      count: 3007,
      isBookmarked: false,
    },
    like: {
      count: 3366,
      isLiked: true,
    },
    authorId: 3,
    categoriesId: [3, 12],
    postType: "audio",
    audioUrl:
      "https://chisnghiax.com/ncmaz_mp3/Alan_Walker_-_AloneMP3_128K.mp3",
    author: {
      id: 3,
      firstName: "Nathanil",
      lastName: "Foulcher",
      displayName: "Foulcher Nathanil",
      email: "nfoulcher2@google.com.br",
      gender: "Bigender",
      avatar: "/src/data/avatars/3.jpg",
      count: 43,
      href: "/author/the-demo-author-slug",
      desc: "There’s no stopping the tech giant. Apple now opens its 100th store in China.There’s no stopping the tech giant.",
      jobName: "Author Job",
      bgImage:
        "https://images.pexels.com/photos/3651577/pexels-photo-3651577.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    },
    categories: [
      {
        id: 3,
        name: "Medicina General",
        href: "/archive/the-demo-archive-slug",
        thumbnail: "src/images/courses/medical.png",
        count: 15,
        color: "yellow",
        taxonomy: "category",
      },
    ],
  },
  {
    index: 9199112312323333,
    id: "DEMO_POSTS_AUDIO_1",
    featuredImage:
      "https://images.pexels.com/photos/6843304/pexels-photo-6843304.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
    title: "Lenovo’s smarter devices ",
    desc: "Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.",
    date: "May 20, 2021",
    href: "/single-audio/this-is-single-slug",
    commentCount: 11,
    viewdCount: 2504,
    readingTime: 2,
    bookmark: {
      count: 3007,
      isBookmarked: false,
    },
    like: {
      count: 3366,
      isLiked: true,
    },
    authorId: 3,
    categoriesId: [3, 12],
    postType: "audio",
    audioUrl:
      "https://chisnghiax.com/ncmaz_mp3/Alan_Walker_-_AloneMP3_128K.mp3",
    author: {
      id: 3,
      firstName: "Nathanil",
      lastName: "Foulcher",
      displayName: "Foulcher Nathanil",
      email: "nfoulcher2@google.com.br",
      gender: "Bigender",
      avatar: "/src/data/avatars/3.jpg",
      count: 43,
      href: "/author/the-demo-author-slug",
      desc: "There’s no stopping the tech giant. Apple now opens its 100th store in China.There’s no stopping the tech giant.",
      jobName: "Author Job",
      bgImage:
        "https://images.pexels.com/photos/3651577/pexels-photo-3651577.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    },
    categories: [
      {
        id: 3,
        name: "Medicina General",
        href: "/archive/the-demo-archive-slug",
        thumbnail: "src/images/courses/medical.png",
        count: 15,
        color: "yellow",
        taxonomy: "category",
      },
    ],
  },
  {
    index: 91991,
    id: "DEMO_POSTS_AUDIO_1",
    featuredImage:
      "https://images.pexels.com/photos/6843304/pexels-photo-6843304.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
    title: "Lenovo’s smarter devices ",
    desc: "Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.",
    date: "May 20, 2021",
    href: "/single-audio/this-is-single-slug",
    commentCount: 11,
    viewdCount: 2504,
    readingTime: 2,
    bookmark: {
      count: 3007,
      isBookmarked: false,
    },
    like: {
      count: 3366,
      isLiked: true,
    },
    authorId: 3,
    categoriesId: [3, 12],
    postType: "audio",
    audioUrl:
      "https://chisnghiax.com/ncmaz_mp3/Alan_Walker_-_AloneMP3_128K.mp3",
    author: {
      id: 3,
      firstName: "Nathanil",
      lastName: "Foulcher",
      displayName: "Foulcher Nathanil",
      email: "nfoulcher2@google.com.br",
      gender: "Bigender",
      avatar: "/src/data/avatars/3.jpg",
      count: 43,
      href: "/author/the-demo-author-slug",
      desc: "There’s no stopping the tech giant. Apple now opens its 100th store in China.There’s no stopping the tech giant.",
      jobName: "Author Job",
      bgImage:
        "https://images.pexels.com/photos/3651577/pexels-photo-3651577.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    },
    categories: [
      {
        id: 3,
        name: "Medicina General",
        href: "/archive/the-demo-archive-slug",
        thumbnail: "src/images/courses/medical.png",
        count: 15,
        color: "yellow",
        taxonomy: "category",
      },
    ],
  },
  {
    index: 91991,
    id: "DEMO_POSTS_AUDIO_1",
    featuredImage:
      "https://images.pexels.com/photos/6843304/pexels-photo-6843304.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
    title: "Lenovo’s smarter devices ",
    desc: "Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.",
    date: "May 20, 2021",
    href: "/single-audio/this-is-single-slug",
    commentCount: 11,
    viewdCount: 2504,
    readingTime: 2,
    bookmark: {
      count: 3007,
      isBookmarked: false,
    },
    like: {
      count: 3366,
      isLiked: true,
    },
    authorId: 3,
    categoriesId: [3, 12],
    postType: "audio",
    audioUrl:
      "https://chisnghiax.com/ncmaz_mp3/Alan_Walker_-_AloneMP3_128K.mp3",
    author: {
      id: 3,
      firstName: "Nathanil",
      lastName: "Foulcher",
      displayName: "Foulcher Nathanil",
      email: "nfoulcher2@google.com.br",
      gender: "Bigender",
      avatar: "/src/data/avatars/3.jpg",
      count: 43,
      href: "/author/the-demo-author-slug",
      desc: "There’s no stopping the tech giant. Apple now opens its 100th store in China.There’s no stopping the tech giant.",
      jobName: "Author Job",
      bgImage:
        "https://images.pexels.com/photos/3651577/pexels-photo-3651577.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    },
    categories: [
      {
        id: 3,
        name: "Medicina General",
        href: "/archive/the-demo-archive-slug",
        thumbnail: "src/images/courses/medical.png",
        count: 15,
        color: "yellow",
        taxonomy: "category",
      },
    ],
  },
  {
    index: 91991,
    id: "DEMO_POSTS_AUDIO_1",
    featuredImage:
      "https://images.pexels.com/photos/6843304/pexels-photo-6843304.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
    title: "Lenovo’s smarter devices ",
    desc: "Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.",
    date: "May 20, 2021",
    href: "/single-audio/this-is-single-slug",
    commentCount: 11,
    viewdCount: 2504,
    readingTime: 2,
    bookmark: {
      count: 3007,
      isBookmarked: false,
    },
    like: {
      count: 3366,
      isLiked: true,
    },
    authorId: 3,
    categoriesId: [3, 12],
    postType: "audio",
    audioUrl:
      "https://chisnghiax.com/ncmaz_mp3/Alan_Walker_-_AloneMP3_128K.mp3",
    author: {
      id: 3,
      firstName: "Nathanil",
      lastName: "Foulcher",
      displayName: "Foulcher Nathanil",
      email: "nfoulcher2@google.com.br",
      gender: "Bigender",
      avatar: "/src/data/avatars/3.jpg",
      count: 43,
      href: "/author/the-demo-author-slug",
      desc: "There’s no stopping the tech giant. Apple now opens its 100th store in China.There’s no stopping the tech giant.",
      jobName: "Author Job",
      bgImage:
        "https://images.pexels.com/photos/3651577/pexels-photo-3651577.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    },
    categories: [
      {
        id: 3,
        name: "Medicina General",
        href: "/archive/the-demo-archive-slug",
        thumbnail: "src/images/courses/medical.png",
        count: 15,
        color: "yellow",
        taxonomy: "category",
      },
    ],
  },
  {
    index: 91991,
    id: "DEMO_POSTS_AUDIO_1",
    featuredImage:
      "https://images.pexels.com/photos/6843304/pexels-photo-6843304.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
    title: "Lenovo’s smarter devices ",
    desc: "Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.",
    date: "May 20, 2021",
    href: "/single-audio/this-is-single-slug",
    commentCount: 11,
    viewdCount: 2504,
    readingTime: 2,
    bookmark: {
      count: 3007,
      isBookmarked: false,
    },
    like: {
      count: 3366,
      isLiked: true,
    },
    authorId: 3,
    categoriesId: [3, 12],
    postType: "audio",
    audioUrl:
      "https://chisnghiax.com/ncmaz_mp3/Alan_Walker_-_AloneMP3_128K.mp3",
    author: {
      id: 3,
      firstName: "Nathanil",
      lastName: "Foulcher",
      displayName: "Foulcher Nathanil",
      email: "nfoulcher2@google.com.br",
      gender: "Bigender",
      avatar: "/src/data/avatars/3.jpg",
      count: 43,
      href: "/author/the-demo-author-slug",
      desc: "There’s no stopping the tech giant. Apple now opens its 100th store in China.There’s no stopping the tech giant.",
      jobName: "Author Job",
      bgImage:
        "https://images.pexels.com/photos/3651577/pexels-photo-3651577.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    },
    categories: [
      {
        id: 3,
        name: "Medicina General",
        href: "/archive/the-demo-archive-slug",
        thumbnail: "src/images/courses/medical.png",
        count: 15,
        color: "yellow",
        taxonomy: "category",
      },
    ],
  },
  {
    index: 91991,
    id: "DEMO_POSTS_AUDIO_1",
    featuredImage:
      "https://images.pexels.com/photos/6843304/pexels-photo-6843304.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
    title: "Lenovo’s smarter devices ",
    desc: "Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.",
    date: "May 20, 2021",
    href: "/single-audio/this-is-single-slug",
    commentCount: 11,
    viewdCount: 2504,
    readingTime: 2,
    bookmark: {
      count: 3007,
      isBookmarked: false,
    },
    like: {
      count: 3366,
      isLiked: true,
    },
    authorId: 3,
    categoriesId: [3, 12],
    postType: "audio",
    audioUrl:
      "https://chisnghiax.com/ncmaz_mp3/Alan_Walker_-_AloneMP3_128K.mp3",
    author: {
      id: 3,
      firstName: "Nathanil",
      lastName: "Foulcher",
      displayName: "Foulcher Nathanil",
      email: "nfoulcher2@google.com.br",
      gender: "Bigender",
      avatar: "/src/data/avatars/3.jpg",
      count: 43,
      href: "/author/the-demo-author-slug",
      desc: "There’s no stopping the tech giant. Apple now opens its 100th store in China.There’s no stopping the tech giant.",
      jobName: "Author Job",
      bgImage:
        "https://images.pexels.com/photos/3651577/pexels-photo-3651577.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    },
    categories: [
      {
        id: 3,
        name: "Medicina General",
        href: "/archive/the-demo-archive-slug",
        thumbnail: "src/images/courses/medical.png",
        count: 15,
        color: "yellow",
        taxonomy: "category",
      },
    ],
  },
];

export { TABS_HOME, TABS_BLOG, HOME_COURSES, TOP_COURSES };
