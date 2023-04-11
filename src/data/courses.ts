import __posts from "./jsons/__posts.json";
import __posts_news from "./jsons/__posts_news.json";
import __postsGallery from "./jsons/__postsGallery.json";
import __postsVideo from "./jsons/__postsVideo.json";
import __postsAudio from "./jsons/__postsAudio.json";
import { DEMO_CATEGORIES } from "./taxonomies";
import { PostDataType } from "./types";
import { DEMO_AUTHORS } from "./authors";

// FOR MAIN DEMO
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

export { TOP_COURSES };
