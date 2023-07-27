import { Popover, Transition } from "@headlessui/react";
import api from "Services/api";
import Avatar from "components/Avatar/Avatar";
import ButtonPrimary from "components/Button/ButtonPrimary";
import ButtonSecondary from "components/Button/ButtonSecondary";
import ErrorBoundary from "components/ErrorBoundary";
import Input from "components/Input/Input";
import Logo from "components/Logo/Logo";
import MenuBar from "components/MenuBar/MenuBar";
import Navigation from "components/Navigation/Navigation";
import NavigationUser from "components/Navigation/NavigationUser";
import DarkModeContainer from "containers/DarkModeContainer/DarkModeContainer";
import { AuthContext } from "context/user/AuthContext";
import { NAVIGATION_MSK, NAVIGATION_BLOG_MSK } from "data/navigation";
import { FetchCourseType } from "data/types";
import React, { FC, Fragment, useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import SearchProducts from "./SearchProducts";
import ModalSignOut from "components/Modal/SignOut";

export interface MainNav2Props {}

const MainNav2: FC<MainNav2Props> = () => {
  const { state } = useContext(AuthContext);
  const [isOnBlog, setIsOnBlog] = useState(false);
  const { dispatch } = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const history = useHistory();
  const handleModalLogout = () => {
    setIsModalOpen(!isModalOpen);
  };
  useEffect(() => {
    setIsOnBlog(history.location.pathname.includes("blog"));
  });
  return (
    <div className={`nc-MainNav nc-MainNav2 relative z-10`}>
      <div className="container py-5 relative flex justify-between items-center space-x-4 xl:space-x-8">
        <div className="flex justify-start flex-grow items-center space-x-3 sm:space-x-8 lg:space-x-10">
          <Logo />
          <div className="hidden sm:block flex-grow max-w-xs">
            <SearchProducts />
            {/* <form action="" method="POST" className="relative">
              <span className="absolute top-1/2 -translate-y-1/2 right-3 text-neutral-500 dark:text-neutral-400">
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M22 22L20 20"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <input type="submit" hidden value="" />
            </form> */}
          </div>
        </div>
        <div className="flex-shrink-0 flex items-center justify-end text-neutral-700 dark:text-neutral-100 space-x-1">
          <div className="hidden items-center xl:flex space-x-2">
            {isOnBlog ? (
              <>
                <Navigation navigations={NAVIGATION_BLOG_MSK} />
              </>
            ) : (
              <>
                <Navigation navigations={NAVIGATION_MSK} />
              </>
            )}
            {state.isAuthenticated ? (
              <>
                <ButtonSecondary
                  onClick={() => handleModalLogout()}
                  sizeClass="px-4 py-2 sm:px-5"
                  className="border-solid border-1 border-neutral-200"
                  bordered
                >
                  Cerrar sesión
                </ButtonSecondary>
                <NavigationUser />
              </>
            ) : (
              <>
                <div className="hidden sm:block h-10 border-l border-neutral-300 dark:border-neutral-6000 pr-5"></div>

                <ButtonSecondary
                  href={"/iniciar-sesion"}
                  sizeClass="px-4 py-2 sm:px-5"
                  className="border-solid border-1 border-neutral-200 text-neutral-500"
                  bordered
                >
                  Iniciar sesión
                </ButtonSecondary>
                <ButtonPrimary
                  href={"/crear-cuenta"}
                  sizeClass="px-4 py-2 sm:px-5"
                  className="font-semibold"
                >
                  Crear cuenta
                </ButtonPrimary>
              </>
            )}
          </div>
          <div className="flex items-center space-x-1.5 xl:hidden">
            {/* <ButtonPrimary href={"/crear-cuenta"} sizeClass="px-4 py-2 sm:px-5">
              Create account
            </ButtonPrimary> */}
            <ErrorBoundary>
              <NavigationUser />
              <MenuBar />
            </ErrorBoundary>
          </div>
        </div>
      </div>
      <ModalSignOut open={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default MainNav2;
