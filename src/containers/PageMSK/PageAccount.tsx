import LayoutPage from "components/LayoutPage/LayoutPage";
import React, {
  ComponentType,
  FC,
  useContext,
  useEffect,
  useState,
} from "react";
import { Redirect, Route, Switch, useRouteMatch } from "react-router";
import { NavLink } from "react-router-dom";
import AccountPayment from "./account/AccountPayment";
import AccountPersonalData from "./account/AccountPersonalData";
import AccountCourses from "./account/AccountCourses";
import AccountHome from "./account/AccountHome";
import { Helmet } from "react-helmet";
import { Contract, Profession, Specialty, User, UserCourse } from "data/types";
import api from "Services/api";
import { AuthContext } from "context/user/AuthContext";
import { useHistory } from "react-router-dom";
import LoadingText from "components/Loader/Text";
import axios from "axios";
import { ALL_PRODUCTS_MX } from "../../data/api";
import ModalSignOut from "components/Modal/SignOut";
import { getUserProducts } from "Services/user";

export interface PageDashboardProps {
  className?: string;
}

interface DashboardLocationState {
  "/inicio"?: {};
  "/cursos"?: {};
  "/perfil"?: {};
  "/metodo-pego"?: {};
  "/cerrar-sesion"?: {};
}

interface DashboardPage {
  sPath: keyof DashboardLocationState;
  exact?: boolean;
  component: ComponentType<Object>;
  icon: string;
  pageName: string;
}

const PageDashboard: FC<PageDashboardProps> = ({ className = "" }) => {
  let { path, url } = useRouteMatch();
  const [user, setUser] = useState<User>({} as User);
  const [courses, setCourses] = useState<UserCourse[]>([] as UserCourse[]);
  const [specialties, setSpecialties] = useState<Specialty[]>([]);
  const [professions, setProfessions] = useState<Profession[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleModalLogout = () => {
    setIsModalOpen(!isModalOpen);
  };
  const subPages: DashboardPage[] = [
    {
      sPath: "/inicio",
      exact: true,
      component: () => <AccountHome name={user?.contact?.name!} />,
      icon: "home",
      pageName: "Inicio",
    },
    {
      sPath: "/cursos",
      component: () => <AccountCourses courses={courses} />,
      icon: "file",
      pageName: "Mis cursos",
    },
    {
      sPath: "/perfil",
      component: () => (
        <AccountPersonalData
          user={user}
          specialties={specialties}
          professions={professions}
        />
      ),
      icon: "personal-data",
      pageName: "Datos personales",
    },
  ];

  const fetchProfessions = async () => {
    const professionList = await api.getProfessions();
    setProfessions(professionList);
  };
  const fetchSpecialties = async () => {
    const specialtyList = await api.getSpecialties();
    setSpecialties(specialtyList);
  };

  const fetchUser = async () => {
    const allCourses = await axios.get(`${ALL_PRODUCTS_MX}`);
    const res = await api.getUserData();
    if (!res.message) {
      setUser(res);
      let coursesList = getUserProducts(res, allCourses.data.products);
      setCourses(coursesList);
      setLoading(false);
    } else {
      console.log(res.response.status);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchUser();
    fetchProfessions();
    fetchSpecialties();
  }, []);

  return (
    <div className={`nc-PageDashboard ${className}`} data-nc-id="PageDashboard">
      <Helmet>
        <title>Mi cuenta</title>
      </Helmet>
      <LayoutPage
        heading="Mi cuenta"
        subHeading="Aquí podrás controlar todo lo referido a tus capacitaciones y tu perfil personal"
      >
        <div className="flex flex-col space-y-8 xl:space-y-0 xl:flex-row">
          {/* SIDEBAR */}

          <div className="flex-shrink-0 w-100 xl:w-80 xl:pr-8">
            <ul className="text-base space-y-1 text-neutral-6000 dark:text-neutral-400">
              {subPages.map(({ sPath, pageName, icon }, index) => {
                return (
                  <li key={index}>
                    <NavLink
                      className="flex px-6 py-2.5 font-medium rounded-lg hover:text-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800 dark:hover:text-neutral-100"
                      to={`${url}${sPath}`}
                      activeClassName="bg-red-400 dark:bg-neutral-800 text-neutral-100 dark:text-neutral-100 invert-image active-account-menu-item"
                    >
                      <img
                        src={`/src/images/icons/${icon}.svg`}
                        width="16"
                        className="mr-2"
                      />
                      {pageName}
                    </NavLink>
                  </li>
                );
              })}
              <li className="cursor-pointer" onClick={handleModalLogout}>
                <span className="flex px-6 py-2.5 font-medium rounded-lg hover:text-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800 dark:hover:text-neutral-100">
                  <img
                    src={`/src/images/icons/session.svg`}
                    width="16"
                    className="mr-2"
                  />
                  Cerrar Sesión
                </span>
              </li>
            </ul>
          </div>
          <div className="border border-neutral-100 dark:border-neutral-800 md:hidden"></div>
          <div className="flex-grow">
            {isLoading ? (
              <div className="border-2 border-grey-300 p-6 rounded-md">
                <LoadingText />
              </div>
            ) : (
              <Switch>
                {subPages.map(({ component, sPath, exact }, index) => {
                  return (
                    <Route
                      key={index}
                      exact={exact}
                      component={component}
                      path={!!sPath ? `${path}${sPath}` : path}
                    />
                  );
                })}
                <Redirect to={path + "/inicio"} />
              </Switch>
            )}
          </div>
        </div>
      </LayoutPage>
      <ModalSignOut open={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default PageDashboard;
