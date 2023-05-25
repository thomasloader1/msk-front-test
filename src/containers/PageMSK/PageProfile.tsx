import { FC, useEffect, useState } from "react";
import Nav from "components/Nav/Nav";
import NavItem from "components/NavItem/NavItem";
import Avatar from "components/Avatar/Avatar";
import ArchiveFilterListBox from "components/ArchiveFilterListBox/ArchiveFilterListBox";
import BackgroundSection from "components/BackgroundSection/BackgroundSection";
import Card2 from "components/Card2/Card2";
import StorePagination from "components/Store/StorePagination";
import SectionSliderPosts from "./home/SectionSliderPosts";
import axios from "axios";
import CardCategory6 from "components/CardCategory6/CardCategory6";
import { USERS } from "data/users";
import { API_URL } from "data/api";
import { Helmet } from "react-helmet";
import { FetchPostType, PostAuthorType, User } from "data/types";

export interface PageAuthorProps {
  className?: string;
}

const FILTERS = [{ name: "Más recientes" }, { name: "Más vistos" }];
const TABS = ["Todo", "Mis cursos", "Favoritos"];

const PageAuthor: FC<PageAuthorProps> = ({ className = "" }) => {
  const [posts, setPosts] = useState<FetchPostType[]>([]);
  const [tabActive, setTabActive] = useState<string>(TABS[0]);
  const [user, setUser] = useState<User>({} as User);
  const [bestSeller, setBestSeller] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchCourses = async () => {
    const res = await axios.get(`${API_URL}/products?limit=-1&country=mx`);
    setPosts(res.data.products);
  };
  const fetchBestSeller = async () => {
    const res = await axios.get(`${API_URL}/home/best-sellers?country=mx`);
    setBestSeller(res.data.products);
  };

  const fetchUser = async (email: string) => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const headers = {
          Authorization: `Bearer ${token}`,
        };

        const res = await axios.get(
          `https://dev.msklatam.com/msk-laravel/public/api/profile/${email}`,
          { headers }
        );

        setUser(res.data.user);
      }
    } catch (error) {
      // Manejo de errores
    }
  };

  useEffect(() => {
    const email = localStorage.getItem("email");
    if (email) {
      fetchUser(email);
    }
    fetchBestSeller();
    fetchCourses();
  }, []);

  const handleClickTab = (item: string) => {
    if (item === "Todo") {
      setPosts(posts.filter((_, i: number) => i < 5 && i >= 1));
    } else {
      const filteredPosts = posts
        .filter((post) =>
          post.categories?.some((category: any) => category.name === item)
        )
        .filter((_, i: number) => i < 5 && i >= 1);
      setPosts(filteredPosts);
    }
    if (item === tabActive) {
      return;
    }
    setTabActive(item);
  };

  const itemsPerPage = 8;
  const totalPages = Math.ceil(posts.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = posts.slice(indexOfFirstItem, indexOfLastItem);

  // Función para cambiar la página
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  let CardComponentName = CardCategory6;
  const categories = [
    {
      name: "Mis Cursos",
      description: "Controla todo lo relacionado\n" + "con tus capacitaciones",
      image: "",
      href: "",
    },
    {
      name: "Centro de ayuda",
      description:
        "Escribe tu consulta o descubre las categorías de información útil",
      image: "",
      href: "",
    },
    {
      name: "Configurar mi cuenta",
      description: "Controlar todo lo referido\n" + "a tu perfil personal",
      image: "",
      href: "",
    },
  ];

  return (
    <div className={`nc-PageAuthor  ${className}`} data-nc-id="PageAuthor">
      <Helmet>
        <title>Mi Perfil</title>
      </Helmet>

      {/* HEADER */}
      <div className="">
        <div className="bg-neutral-200 dark:bg-neutral-900 dark:border dark:border-neutral-700 p-5 lg:p-16 flex flex-col sm:items-center">
          <Avatar
            containerClassName="dark:ring-0 shadow-2xl"
            userName={user.name}
            sizeClass="w-20 h-20 text-xl lg:text-3xl lg:w-36 lg:h-36"
            radius="rounded-full"
          />
          <div className="mt-8 sm:mt-6 space-y-4 max-w-lg text-center">
            <h2 className="inline-block text-2xl sm:text-3xl md:text-4xl font-semibold">
              {user.name}
            </h2>
            <span className="block text-sm text-neutral-6000 dark:text-neutral-300 md:text-base">
              {user.contact?.profession}
            </span>
          </div>
        </div>
      </div>
      {/* ====================== END HEADER ====================== */}

      <div className="container py-16 lg:pb-28 lg:pt-20 space-y-16 lg:space-y-28">
        <main>
          {/* TABS FILTER */}
          <div className="flex flex-col sm:items-center sm:justify-between sm:flex-row">
            <Nav className="sm:space-x-2">
              {TABS.map((item, index) => (
                <NavItem
                  key={index}
                  isActive={tabActive === item}
                  onClick={() => handleClickTab(item)}
                >
                  {item}
                </NavItem>
              ))}
            </Nav>
            <div className="block my-4 border-b w-full border-neutral-100 sm:hidden"></div>
            <div className="flex justify-end">
              <ArchiveFilterListBox lists={FILTERS} />
            </div>
          </div>

          {/* LOOP ITEMS */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 mt-8 lg:mt-10">
            {currentItems.map((post) => (
              <Card2 key={post.id} post={post} hideDesc hideAuthor />
            ))}
          </div>

          {/* PAGINATION */}
          <div className="flex justify-center">
            <StorePagination
              totalPages={totalPages}
              onPageChange={handlePageChange}
              currentPage={currentPage}
            />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5 sm:gap-6 md:gap-8 ">
            {categories.map((item, i) => (
              <CardComponentName
                index={i < 1 ? `#${i + 1}` : undefined}
                key={item.name}
                taxonomy={item}
                className="rounded-lg"
              />
            ))}
          </div>
        </main>
        <div className="relative py-16 my-32">
          <BackgroundSection />
          <SectionSliderPosts
            postCardName="card9"
            heading="Nuestros cursos mas elegidos"
            subHeading="Profesionales como tú ya se capacitaron con ellos. ¡Ahora te toca a ti!"
            sliderStype="style2"
            posts={bestSeller}
            uniqueSliderClass="pageHome-section6"
          />
        </div>
      </div>
    </div>
  );
};

export default PageAuthor;
