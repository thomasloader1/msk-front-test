import { FC, useEffect, useState } from "react";
import Avatar from "components/Avatar/Avatar";
import BackgroundSection from "components/BackgroundSection/BackgroundSection";
import StorePagination from "components/Store/StorePagination";
import SectionSliderPosts from "./home/SectionSliderPosts";
import CardCategory6 from "components/CardCategory6/CardCategory6";
import { Helmet } from "react-helmet";
import { User, UserCourseProgress } from "data/types";
import api from "Services/api";
import ButtonPrimary from "components/Button/ButtonPrimary";
import { useHistory } from "react-router-dom";
import { getUserCourses } from "Services/user";
import axios from "axios";
import { ALL_PRODUCTS_MX } from "data/api";
import Heading from "components/Heading/Heading";
import ProductAccount from "./profile/ProductAccount";
import ItemSkeleton from "components/Skeleton/ItemSkeleton";
import ImageSkeleton from "components/Skeleton/ImageSkeleton";
import AvatarSkeleton from "components/Skeleton/AvatarSkeleton";
import TextSkeleton from "components/Skeleton/TextSkeleton";

export interface PageAuthorProps {
  className?: string;
}

const FILTERS = [{ name: "Más recientes" }, { name: "Más vistos" }];
const TABS = ["Mis cursos", "Todo", "Favoritos"];

const PageAuthor: FC<PageAuthorProps> = ({ className = "" }) => {
  const [posts, setPosts] = useState<UserCourseProgress[]>([]);
  const [tabActive, setTabActive] = useState<string>(TABS[0]);
  const [user, setUser] = useState<User>({} as User);
  const [loadingUser, setLoadingUser] = useState<boolean>(true);
  const [loadingBestSellers, setLoadingBestSellers] = useState<boolean>(true);
  const [bestSeller, setBestSeller] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const history = useHistory();

  const fetchBestSeller = async () => {
    const res = await api.getBestSellers();
    setBestSeller(res);
    setLoadingBestSellers(false);
  };

  const fetchUser = async () => {
    try {
      const productList = await api.getAllProductsMX();
      const res = await api.getUserData();
      if (!res.message) {
        setUser(res);
        let coursesList = getUserCourses(res, productList);
        setPosts(coursesList);
        setLoadingUser(false);
      } else {
        console.log(res.response.status);
        history.push("/iniciar-sesion");
      }
    } catch (error) {
      console.log(error);
      history.push("/iniciar-sesion");
    }
  };

  useEffect(() => {
    fetchUser();
    fetchBestSeller();
  }, []);

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
      href: "/mi-cuenta/cursos",
    },
    {
      name: "Centro de ayuda",
      description:
        "Escribe tu consulta o descubre las categorías de información útil",
      image: "",
      href: "/faq",
    },
    {
      name: "Configurar mi cuenta",
      description: "Controlar todo lo referido\n" + "a tu perfil personal",
      image: "",
      href: "/mi-cuenta/perfil",
    },
  ];

  const goToStore = () => {
    tabActive == "Favoritos" ? history.push("/") : history.push("/tienda");
  };

  return (
    <div className={`nc-PageAuthor  ${className}`} data-nc-id="PageAuthor">
      <Helmet>
        <title>Mi Perfil</title>
      </Helmet>

      {/* HEADER */}
      <div className="">
        <div className="bg-neutral-200 dark:bg-neutral-900 dark:border dark:border-neutral-700 p-5 lg:p-16 flex flex-col sm:items-center">
          {loadingUser ? (
            <>
              <AvatarSkeleton className="rounded-full w-24 h-24" />
              <TextSkeleton lines="2" />
            </>
          ) : (
            <>
              <Avatar
                containerClassName="dark:ring-0 shadow-2xl"
                userName={user.name}
                sizeClass="w-20 h-20 text-xl lg:text-3xl lg:w-36 lg:h-36"
                radius="rounded-full"
              />
              <div className="mt-8 sm:mt-6 space-y-4 max-w-lg text-center">
                <h2 className="inline-block text-2xl sm:text-3xl md:text-4xl font-medium">
                  {user.name}
                </h2>
                <span className="block text-sm text-neutral-6000 dark:text-neutral-300 md:text-base">
                  {user.contact?.profession}
                </span>
              </div>
            </>
          )}
        </div>
      </div>
      {/* ====================== END HEADER ====================== */}

      <div className="container py-16 lg:pb-28 lg:pt-20 space-y-16 lg:space-y-28">
        <main>
          <Heading desc="">Mis Cursos </Heading>

          {loadingUser ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 mt-8 lg:mt-10 mb-8">
              <ItemSkeleton />
              <ItemSkeleton />
              <ItemSkeleton />
              <ItemSkeleton />
            </div>
          ) : (
            <>
              {currentItems.length ? (
                <>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 mt-8 lg:mt-10 mb-8">
                    {currentItems
                      ? currentItems.map((post, index) => (
                          <ProductAccount
                            key={`${post.id}_${index}`}
                            product={post}
                            user={user}
                          />
                        ))
                      : null}
                  </div>

                  {totalPages > 1 ? (
                    <div className="flex justify-center">
                      <StorePagination
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                        currentPage={currentPage}
                      />
                    </div>
                  ) : null}
                </>
              ) : (
                <div className="flex flex-col justify-center items-center gap-6 my-24 lg:mt-10">
                  <p className="raleway text-3xl w-full md:w-1/2 text-center">
                    Aún puedes descubrir mucho más en Medical & Scientific
                    Knowledge
                  </p>
                  <ButtonPrimary
                    onClick={goToStore}
                    sizeClass="py-3 "
                    className="font-semibold px-6"
                  >
                    {tabActive == "Favoritos"
                      ? "Comienza tu experiencia"
                      : "Comienza un curso"}
                  </ButtonPrimary>
                </div>
              )}
            </>
          )}

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5 sm:gap-6 md:gap-8 ">
            {categories
              ? categories.map((item, i) => (
                  <CardComponentName
                    index={i < 1 ? `#${i + 1}` : undefined}
                    key={item.name}
                    taxonomy={item}
                    className="rounded-lg"
                  />
                ))
              : null}
          </div>
        </main>
        <div className="relative py-16 my-32">
          <BackgroundSection />
          <SectionSliderPosts
            postCardName="card9"
            heading="Nuestros cursos más elegidos"
            subHeading="Profesionales como tú ya se capacitaron con ellos. ¡Ahora te toca a ti!"
            sliderStype="style2"
            posts={bestSeller}
            loading={loadingBestSellers}
            uniqueSliderClass="pageHome-section6"
          />
        </div>
      </div>
    </div>
  );
};

export default PageAuthor;
